const mongoController = `const bcrypt = require("bcryptjs");
const db = require("../../../../server/Models");

const ${moduleName} = db.${moduleNameLC};

// ******************************************************************************************************************************
// ************************************************** ADMIN CRUD ***************************************************************
// ******************************************************************************************************************************

// Create and Save a new ${moduleName}
exports.create = (req, res) => {
  // Validate request
  if (Object.keys(req.body).length < 1) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ${moduleName}
  const ${moduleNameLC} = {
    ...req.body,
  };
  let ${moduleNameLC}Model = new ${moduleName}(${moduleNameLC});
  // Save ${moduleName} in the database
  ${moduleNameLC}Model
    .save()
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        ${moduleNameLC}: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the ${moduleName}.",
      });
    });
};

// Retrieve all ${moduleName}s from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: \`/\${name}/\` } : null;
  ${moduleName}.find(condition)
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        ${moduleNameLC}: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the ${moduleName}.",
      });
    });
};

// Find a single ${moduleName} with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ${moduleName}.findOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        ${moduleNameLC}: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving ${moduleNameLC}s.",
      });
    });
};

// Update a ${moduleName} by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  // Validate request
  if (Object.keys(req.body).length < 1) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  ${moduleName}.updateOne({ _id: id }, req.body)
    .then((doc) => {
      console.log(doc);
      ${moduleName}.findOne({ _id: id })
        .then((${moduleNameLC}) => {
          console.log(${moduleNameLC});
          res.send({
            success: true,
            result: doc,
            ${moduleNameLC},
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
          \`Cannot update ${moduleName} with id = \${id}. Maybe ${moduleName} was not found or req.body is empty!\`,
      });
    });
};

// Delete a ${moduleName} with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  ${moduleName}.deleteOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        data: doc,
        message: \`${moduleName} with id = \${id} has been deleted successfully!\`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message ||
          \`Cannot delete ${moduleName} with id = \${id}. Maybe ${moduleName} was not found !\`,
      });
    });
};

// Delete all ${moduleName}s from the database.
exports.deleteAll = (req, res) => {
  ${moduleName}.deleteMany()
    .then((nums) => {
      res.send({
        success: true,
        data: nums,
        message: \`\${nums.deletedCount} ${moduleName}s were deleted successfully!\`,
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
  // Validate request
  if (Object.keys(req.body).length < 1) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ${moduleName}
  const ${moduleNameLC} = {
    ...req.body,
  };
  let ${moduleNameLC}Model = new ${moduleName}(${moduleNameLC});
  // Save ${moduleName} in the database
  ${moduleNameLC}Model
    .save()
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        ${moduleNameLC}: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the ${moduleName}.",
      });
    });
};

// Retrieve all ${moduleName}s from the database.
exports.user_findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: \`/\${name}/\` } : null;
  ${moduleName}.find(condition)
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        ${moduleNameLC}: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the ${moduleName}.",
      });
    });
};

// Find a single ${moduleName} with an id
exports.user_findOne = (req, res) => {
  const id = req.params.id;

  ${moduleName}.findOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        ${moduleNameLC}: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving ${moduleNameLC}s.",
      });
    });
};

// Update a ${moduleName} by the id in the request
exports.user_update = (req, res) => {
  const id = req.params.id;
  // Validate request
  if (Object.keys(req.body).length < 1) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  ${moduleName}.updateOne({ _id: id }, req.body)
    .then((doc) => {
      console.log(doc);
      ${moduleName}.findOne({ _id: id })
        .then((${moduleNameLC}) => {
          console.log(${moduleNameLC});
          res.send({
            success: true,
            result: doc,
            ${moduleNameLC},
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
          \`Cannot update ${moduleName} with id = \${id}. Maybe ${moduleName} was not found or req.body is empty!\`,
      });
    });
};

// Delete a ${moduleName} with the specified id in the request
exports.user_delete = (req, res) => {
  const id = req.params.id;
  ${moduleName}.deleteOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        data: doc,
        message: \`${moduleName} with id = \${id} has been deleted successfully!\`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message ||
          \`Cannot delete ${moduleName} with id = \${id}. Maybe ${moduleName} was not found !\`,
      });
    });
};

// Delete all ${moduleName}s from the database.
exports.user_deleteAll = (req, res) => {
  ${moduleName}.deleteMany()
    .then((nums) => {
      res.send({
        success: true,
        data: nums,
        message: \`\${nums.deletedCount} ${moduleName}s were deleted successfully!\`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while removing all ${moduleNameLC}s.",
      });
    });
};`;
