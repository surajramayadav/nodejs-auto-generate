const bcrypt = require("bcryptjs");
const db = require("../../../../server/Models");

const Role = db.role;
const Op = db.Sequelize.Op;
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

  // Save Role in the database
  Role.create(role)
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the Role.",
      });
    });
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.eq]: `%${id}%` } } : null;

  Role.findAll({ where: condition })
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};

// Find a single Role with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Role.findByPk(id)
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error retrieving Role with id=" + id,
      });
    });
};

// Update a Role by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const roles = Role.findAll({
    where: { id: id },
  });
  Role.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          data: roles,
          message: "Role was updated successfully.",
        });
      } else {
        res.send({
          success: false,
          message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error updating Role with id=" + id,
      });
    });
};

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const role = Role.findOne({
    where: { id: id },
  });
  Role.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          data: role,
          message: "Role was deleted successfully!",
        });
      } else {
        res.send({
          success: false,
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Could not delete Role with id=" + id,
      });
    });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
  const roles = Role.findAll({
    where: { id: id },
  });
  Role.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        success: true,
        data: roles,
        message: `${nums} Roles were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while removing all roles.",
      });
    });
};
