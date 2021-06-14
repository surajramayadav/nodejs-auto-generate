const db = require("../Models");
const Config = require("../Config/Config");

const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
  // console.log('REQ AuthController',req.body);
  // Save User to Database

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        let reqRoles = req.body.roles;
        console.log("typeof reqRoles", typeof reqRoles);
        if (typeof reqRoles == "string") {
          reqRoles = [req.body.roles];
        }
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          console.log("roles", roles);
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
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
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
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, Config.jsw_secret, {
        expiresIn: 86400, // 24 hours
        algorithm: "HS512",
      });

      var authorities = [];

      user.getRoles().then((roles) => {
        console.log(
          "------------------------------------------------------------------------------"
        );
        console.log(" user.getRoles()", roles);
        // res.send( user.getRoles());
        console.log(
          "------------------------------------------------------------------------------"
        );
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err.message });
    });
};
