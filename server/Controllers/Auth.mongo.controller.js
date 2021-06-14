const db = require("../Models");
const Config = require("../Config/Config");

const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
  // Save User to Database
  const { mobile } = req.body;
  let {
    username = null,
    email = null,
    name = null,
    password = null,
  } = req.body;
  if (username == null) {
    username = mobile;
  }
  if (email == null) {
    email = username + "@chattr.com";
  }
  if (name == null) {
    name = username;
  }
  if (password == null) {
    password = "123456";
  }
  password = bcrypt.hashSync(password);
  const user = {
    name,
    username,
    email,
    password,
  };
  let userModel = new User(user);
  // Save User in the database
  userModel
    .save()
    .then((doc) => {
      // console.log(doc);
      var token = jwt.sign({ id: user.id }, Config.jsw_secret, {
        expiresIn: 86400, // 24 hours
        algorithm: "HS512",
      });

      var authorities = [];
      const dbRoles = req.body.roles;
      const dbRole = req.body.role;
      if (dbRoles || dbRole) {
        if (Config.DB === "mongo") {
          if (dbRole) {
            Role.findOne({ name: dbRole })
              .then((frole) => {
                // console.log("frole.users", frole);
                frole.users.push(doc._id);
                doc.roles.push(frole._id);
                frole.save();
                doc.save();
                authorities.push("ROLE_" + frole.name.toUpperCase());
                res.status(200).send({
                  success: true,
                  user,
                  dbRole: frole,
                  roles: authorities,
                  accessToken: token,
                  message: "User was registered successfully!",
                });
              })
              .catch((err) => {
                console.log("err", err);
                res.status(400).send({
                  message: "Failed! Role does not exist x",
                  err,
                });
              });
          } else if (dbRoles) {
            Role.find({ name: dbRoles })
              .then((froles) => {
                froles.map((fr) => {
                  doc.roles.push(fr._id);
                  fr.users.push(doc._id);
                  fr.save();
                  console.log(doc);
                  authorities.push("ROLE_" + fr.name.toUpperCase());
                });
                doc.save();
                res.status(200).send({
                  success: true,
                  user,
                  dbRole: froles,
                  roles: authorities,
                  accessToken: token,
                  message: "User was registered successfully!",
                });
              })
              .catch((err) => {
                console.log("err", err);
                res.status(400).send({
                  message: "Failed! Role does not exist",
                  err,
                });
              });
          } else {
            res.status(400).send({
              message: "Failed! Role does not exist",
            });
          }
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating the User.",
      });
    });

  // Save User to Database
  /* 
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            var token = jwt.sign({ id: user.id }, Config.jsw_secret, {
              expiresIn: 86400, // 24 hours
              algorithm: "HS512",
            });

            var authorities = [];
            user.getRoles().then((roles) => {
              for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
              }
              res.status(200).send({
                success: true,
                user,
                roles,
                roles: authorities,
                accessToken: token,
                message: "User was registered successfully!",
              });
            });
          });
        });
      } else if (req.body.role) {
        Role.findOne({
          where: {
            name: req.body.role,
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            var token = jwt.sign({ id: user.id }, Config.jsw_secret, {
              expiresIn: 86400, // 24 hours
              algorithm: "HS512",
            });

            var authorities = [];
            user.getRoles().then((roles) => {
              for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
              }
              res.status(200).send({
                success: true,
                user,
                roles,
                roles: authorities,
                accessToken: token,
                message: "User was registered successfully!",
              });
            });
          });
        });
      } else {
        // user role = 1
        res.send({
          success: false,
          message: "User was not registered !",
        });
        // user.setRoles([1]).then(() => {
        //   res.send({
        //     success: false,
        //     message: 'User was not registered !',
        //   });
        // });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
     */
};

exports.signin = (req, res) => {
  // console.log({ signin: req.body });
  User.findOne({ username: req.body.username })
    .then((user) => {
      console.log("user", user);
      if (user == null) {
        return res
          .status(404)
          .send({ success: false, message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          success: false,
          accessToken: null,
          message: "Invalid Credentials!",
        });
      }
      var token = jwt.sign({ id: user.id }, Config.jsw_secret, {
        expiresIn: 86400, // 24 hours
        algorithm: "HS512",
      });
      var authorities = [];
      Role.find({ _id: { $in: user.roles } }).then((dbRoles) => {
        dbRoles.map((eDbRole) => {
          authorities.push("ROLE_" + eDbRole.name.toUpperCase());
        });
        res.status(200).send({
          user,
          success: true,
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while signing in.",
      });
    });
};
