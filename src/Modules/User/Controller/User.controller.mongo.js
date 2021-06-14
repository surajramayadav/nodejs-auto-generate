const bcrypt = require("bcryptjs");
const db = require("../../../../server/Models");

const User = db.user;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };
  let userModel = new User(user);
  // Save User in the database
  userModel
    .save()
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        user: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: `/${username}/` } : null;
  User.find(condition)
    .then((doc) => {
      res.send({
        success: true,
        user: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        user: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.updateOne({ _id: id }, req.body)
    .then((doc) => {
      console.log(doc);
      User.findOne({ _id: id })
        .then((user) => {
          console.log(user);
          res.send({
            success: true,
            result: doc,
            user,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Cannot update User with id = ${id}. Maybe User was not found or req.body is empty!`,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        data: doc,
        message: `User with id = ${id} has been deleted successfully!`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Cannot delete User with id = ${id}. Maybe User was not found !`,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany()
    .then((nums) => {
      res.send({
        success: true,
        data: nums,
        message: `${nums.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

exports.getProfile = (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(500).send({
      success: false,
      user,
      message: "Some error occurred while retrieving data.",
    });
    res.end();
    return;
  }
  const id = req.user.id;
  User.findOne({ _id: id })
    .then((doc) => {
      res.send({
        success: true,
        user: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
exports.user_create = (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(500).send({
      success: false,
      user,
      message: "Some error occurred while retrieving data.",
    });
    res.end();
    return;
  }
  const id = req.user.id;
  User.updateOne({ _id: id }, req.body)
    .then((doc) => {
      res.send({
        success: true,
        user: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message ||
          "Some error occurred while carrying out the operation.",
      });
    });
};
exports.user_findAll = (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(500).send({
      success: false,
      user,
      message: "Some error occurred while retrieving data.",
    });
    res.end();
    return;
  }
  const id = req.user.id;
  User.findOne({ _id: id })
    .then((doc) => {
      res.send({
        success: true,
        user: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
exports.user_findOne = (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(500).send({
      success: false,
      user,
      message: "Some error occurred while retrieving data.",
    });
    res.end();
    return;
  }
  const id = req.user.id;
  User.findOne({ _id: id })
    .then((doc) => {
      res.send({
        success: true,
        user: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
exports.user_update = (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(500).send({
      success: false,
      user,
      message: "Some error occurred while retrieving data.",
    });
    res.end();
    return;
  }
  const id = req.user.id;
  User.updateOne({ _id: id }, req.body)
    .then((doc) => {
      res.send({
        success: true,
        user: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message ||
          "Some error occurred while carrying out the operation.",
      });
    });
};
exports.user_delete = (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(500).send({
      success: false,
      user,
      message: "Some error occurred while retrieving data.",
    });
    res.end();
    return;
  }
  const id = req.user.id;
  User.deleteOne({ _id: id })
    .then((doc) => {
      res.send({
        success: true,
        user: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
exports.user_deleteAll = (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(500).send({
      success: false,
      user,
      message: "Some error occurred while retrieving data.",
    });
    res.end();
    return;
  }
  const id = req.user.id;
  User.deleteOne({ _id: id })
    .then((doc) => {
      res.send({
        success: true,
        user: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
