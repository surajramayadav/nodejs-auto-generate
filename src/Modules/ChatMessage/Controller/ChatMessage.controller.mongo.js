const bcrypt = require("bcryptjs");
const db = require("../../../../server/Models");

const Role = db.role;

// Create and Save a new Role
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Role
  const role = {
    name: req.body.name,
  };
  let roleModel = new Role(role);
  // Save Role in the database
  roleModel
    .save()
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        role: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the Role.",
      });
    });
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: `/${name}/` } : null;
  Role.find(condition)
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        role: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the Role.",
      });
    });
};

// Find a single Role with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Role.findOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        role: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};

// Update a Role by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Role.updateOne({ _id: id }, req.body)
    .then((doc) => {
      console.log(doc);
      Role.findOne({ _id: id })
        .then((role) => {
          console.log(role);
          res.send({
            success: true,
            result: doc,
            role,
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
          `Cannot update Role with id = ${id}. Maybe Role was not found or req.body is empty!`,
      });
    });
};

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Role.deleteOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        data: doc,
        message: `Role with id = ${id} has been deleted successfully!`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Cannot delete Role with id = ${id}. Maybe Role was not found !`,
      });
    });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
  Role.deleteMany()
    .then((nums) => {
      res.send({
        success: true,
        data: nums,
        message: `${nums.deletedCount} Roles were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while removing all roles.",
      });
    });
};
