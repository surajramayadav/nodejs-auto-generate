const bcrypt = require("bcryptjs");
const db = require("../../../../server/Models");

const User = db.user;
const Op = db.Sequelize.Op;

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

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { [Op.like]: `%${username}%` } }
    : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error retrieving User with id = " + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const users = User.findAll({
    where: { id: id },
  });
  User.update(req.body, {
    where: { id: id },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          data: users,
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          success: false,
          message: `Cannot update User with id = ${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error updating User with id = " + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const user = User.findOne({
    where: { id: id },
  });
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          data: user,
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          success: false,
          message: `Cannot delete User with id = ${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Could not delete User with id = " + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  const users = User.findAll({
    where: { id: id },
  });
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        success: true,
        data: users,
        message: `${nums} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};
