const jwt = require("jsonwebtoken");
const _ = require("lodash");
const db = require("../Models");
const Config = require("../Config/Config");

const User = db.user;
const Role = db.role;
const verifyToken = (req, res, next) => {
  let token =
    typeof req.headers["x-access-token"] !== "undefined"
      ? req.headers["x-access-token"]
      : req.headers["authorization"];
  if (token) {
    token =
      token.includes("Bearer ") === true ? token.replace("Bearer ", "") : token;
  }
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, Config.jsw_secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        err,
        token,
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    res.locals.userId = decoded.id;
    User.findOne({ _id: res.locals.userId })
      .then((user) => {
        // console.log("user", user);
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          success: false,
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  });
};
const isAdmin = (req, res, next) => {
  if (Config.DB === "mongo") {
    User.findOne({ _id: res.locals.userId })
      .then((user) => {
        Role.find({ _id: { $in: user.roles }, name: "admin" }).then(
          (dbRoles) => {
            if (dbRoles.length > 0) {
              next();
              return;
            } else {
              res.status(403).send({
                message: "Require Admin Role!",
              });
            }
          }
        );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          success: false,
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  }

  if (Config.DB === "mysql") {
    User.findByPk(res.locals.userId).then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Admin Role!",
        });
        return;
      });
    });
  }
};

const isModerator = (req, res, next) => {
  if (Config.DB === "mongo") {
    User.findOne({ _id: res.locals.userId })
      .then((user) => {
        Role.find({ _id: { $in: user.roles }, name: "moderator" }).then(
          (dbRoles) => {
            if (dbRoles.length) {
              next();
              return;
            } else {
              res.status(403).send({
                message: "Require Admin Role!",
              });
            }
          }
        );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          success: false,
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  }

  if (Config.DB === "mysql") {
    User.findByPk(req.userId).then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Moderator Role!",
        });
      });
    });
  }
};

const isModeratorOrAdmin = (req, res, next) => {
  if (Config.DB === "mongo") {
    User.findOne({ _id: res.locals.userId })
      .then((user) => {
        Role.find({
          _id: { $in: user.roles },
          name: { $in: ["moderator", "admin"] },
        }).then((dbRoles) => {
          if (dbRoles.length) {
            next();
            return;
          } else {
            res.status(403).send({
              message: "Require Admin Role!",
            });
          }
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          success: false,
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  }

  if (Config.DB === "mysql") {
    User.findByPk(req.userId).then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }

          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Moderator or Admin Role!",
        });
      });
    });
  }
};

const authJWT = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJWT;
