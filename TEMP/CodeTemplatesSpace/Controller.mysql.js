const mysqlController = `const bcrypt = require("bcryptjs");
const db = require("../../../../server/Models");

const ${moduleName} = db.${moduleNameLC};
const Op = db.Sequelize.Op;

// ******************************************************************************************************************************
// ************************************************** ADMIN CRUD ***************************************************************
// ******************************************************************************************************************************

// Create and Save a new ${moduleName}
exports.create = (req, res) => {
  if (Object.keys(req.body).length < 1) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ${moduleName}
  const ${moduleNameLC} = {
    ...req.body
  };

  // Save ${moduleName} in the database
  ${moduleName}.create(${moduleNameLC})
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the ${moduleName}.",
      });
    });
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.eq]: \`%\${id}%\` } } : null;

  ${moduleName}.findAll({ where: condition })
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving ${moduleNameLC}s.",
      });
    });
};

// Find a single ${moduleName} with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ${moduleName}.findByPk(id)
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error retrieving ${moduleName} with id=" + id,
      });
    });
};

// Update a ${moduleName} by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  if (Object.keys(req.body).length < 1) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const ${moduleNameLC}s = ${moduleName}.findAll({
    where: { id: id },
  });
  ${moduleName}.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          data: ${moduleNameLC}s,
          message: "${moduleName} was updated successfully.",
        });
      } else {
        res.send({
          success: false,
          message: \`Cannot update ${moduleName} with id=\${id}. Maybe ${moduleName} was not found or req.body is empty!\`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error updating ${moduleName} with id=" + id,
      });
    });
};

// Delete a ${moduleName} with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const ${moduleNameLC} = ${moduleName}.findOne({
    where: { id: id },
  });
  ${moduleName}.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          data: ${moduleNameLC},
          message: "${moduleName} was deleted successfully!",
        });
      } else {
        res.send({
          success: false,
          message: \`Cannot delete ${moduleName} with id=\${id}. Maybe ${moduleName} was not found!\`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Could not delete ${moduleName} with id=" + id,
      });
    });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
  const ${moduleNameLC}s = ${moduleName}.findAll({
    where: { id: id },
  });
  ${moduleName}.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        success: true,
        data: ${moduleNameLC}s,
        message: \`\${nums} Roles were deleted successfully!\`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while removing all ${moduleNameLC}s.",
      });
    });
};

// ******************************************************************************************************************************
// ************************************************** USER CRUD ***************************************************************
// ******************************************************************************************************************************

// Create and Save a new ${moduleName}
exports.user_create = (req, res) => {
  if (Object.keys(req.body).length < 1) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ${moduleName}
  const ${moduleNameLC} = {
    ...req.body
  };

  // Save ${moduleName} in the database
  ${moduleName}.create(${moduleNameLC})
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the ${moduleName}.",
      });
    });
};

// Retrieve all Roles from the database.
exports.user_findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.eq]: \`%\${id}%\` } } : null;

  ${moduleName}.findAll({ where: condition })
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving ${moduleNameLC}s.",
      });
    });
};

// Find a single ${moduleName} with an id
exports.user_findOne = (req, res) => {
  const id = req.params.id;

  ${moduleName}.findByPk(id)
    .then((data) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error retrieving ${moduleName} with id=" + id,
      });
    });
};

// Update a ${moduleName} by the id in the request
exports.user_update = (req, res) => {
  const id = req.params.id;
  if (Object.keys(req.body).length < 1) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const ${moduleNameLC}s = ${moduleName}.findAll({
    where: { id: id },
  });
  ${moduleName}.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          data: ${moduleNameLC}s,
          message: "${moduleName} was updated successfully.",
        });
      } else {
        res.send({
          success: false,
          message: \`Cannot update ${moduleName} with id=\${id}. Maybe ${moduleName} was not found or req.body is empty!\`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error updating ${moduleName} with id=" + id,
      });
    });
};

// Delete a ${moduleName} with the specified id in the request
exports.user_delete = (req, res) => {
  const id = req.params.id;
  const ${moduleNameLC} = ${moduleName}.findOne({
    where: { id: id },
  });
  ${moduleName}.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          data: ${moduleNameLC},
          message: "${moduleName} was deleted successfully!",
        });
      } else {
        res.send({
          success: false,
          message: \`Cannot delete ${moduleName} with id=\${id}. Maybe ${moduleName} was not found!\`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Could not delete ${moduleName} with id=" + id,
      });
    });
};

// Delete all Roles from the database.
exports.user_deleteAll = (req, res) => {
  const ${moduleNameLC}s = ${moduleName}.findAll({
    where: { id: id },
  });
  ${moduleName}.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        success: true,
        data: ${moduleNameLC}s,
        message: \`\${nums} Roles were deleted successfully!\`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while removing all ${moduleNameLC}s.",
      });
    });
};`;
