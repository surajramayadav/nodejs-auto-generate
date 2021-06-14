const _ = require("lodash");
const db = require("../Models");
const Config = require("../Config/Config");

let ROLES = db.ROLES;
const User = db.user;
const Role = db.role;

const checkDuplicates = (req, res, next) => {
  let error = null;
  if (Config.DB === "mongo") {
    const username = req.body.username;

    // Username
    User.find({
      username,
    }).then((user) => {
      if (user.length > 0) {
        console.log("user.length username", user);
        error = "Failed! Username is already in use!";
        res.status(400).send({
          errUser: user,
          username,
          message: error,
        });
        res.end();
        next(error);
        return;
      }

      // Email
      User.find({
        email: req.body.email,
      }).then((user) => {
        console.log("user.length email", user.length);
        if (user.length > 0) {
          error = "Failed! email is already in use!";
          res.status(400).send({
            errUser: user,
            email: user.email,
            message: error,
          });
          res.end();
          next(error);
          return;
        }
      });
    });
  }

  if (Config.DB === "mysql") {
    const username = req.body.username;
    // Username
    let error = null;
    User.findOne({
      where: {
        username,
      },
    }).then((user) => {
      if (user) {
        error = "Failed! Username is already in use!";
        res.status(400).send({
          errUser: user,
          username,
          message: error,
        });
        res.end();
        next(error);
      }

      // Email
      User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        if (user) {
          error = "Failed! email is already in use!";
          res.status(400).send({
            errUser: user,
            email: user.email,
            message: error,
          });
          res.end();
          next(error);
          return;
        }
      });
    });
  }
  if (error !== null) {
    next(error);
  } else {
    next();
  }
};

const checkRolesExist = (req, res, next) => {
  const dbRoles = req.body.roles;
  const dbRole = req.body.role;
  console.log("dbRoles || dbRole", dbRoles, dbRole);
  if (dbRoles || dbRole) {
    if (Config.DB === "mongo") {
      if (dbRole) {
        Role.find({ name: dbRole })
          .then((data) => {
            if (data.length > 0) {
              next();
            } else {
              res.status(400).send({
                message: "Failed! Role does not exist1",
              });
            }
          })
          .catch((err) => {
            console.log("err", err);
            res.status(400).send({
              message: "Failed! Role does not exist2",
              err,
            });
          });
      } else if (dbRoles) {
        Role.find({ name: dbRoles })
          .then((data) => {
            if (data.length > 0) {
              next();
            } else {
              res.status(400).send({
                message: "Failed! Role does not exist3",
              });
            }
          })
          .catch((err) => {
            console.log("err", err);
            res.status(400).send({
              message: "Failed! Role does not exist4",
              err,
            });
          });
      } else {
        res.status(400).send({
          message: "Failed! Role does not exist5",
        });
      }
    }
    if (Config.DB === "mysql") {
      if (dbRole) {
        Role.findOne({ where: { name: dbRole } })
          .then((data) => {
            next();
          })
          .catch((err) => {
            console.log("err", err);
            res.status(400).send({
              message: "Failed! Role does not exist",
              err,
            });
          });
      }
      if (dbRoles) {
        Role.findAll({ where: { name: dbRoles } })
          .then((data) => {
            console.log("data", data);
            next();
          })
          .catch((err) => {
            console.log("err", err);
            res.status(400).send({
              message: "Failed! Role does not exist",
              err,
            });
          });
      }
    }
  }

  // next();
};

const verifySignUp = {
  checkDuplicates: checkDuplicates,
  checkRolesExist: checkRolesExist,
};

module.exports = verifySignUp;
