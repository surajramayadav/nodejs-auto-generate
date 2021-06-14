const express = require("express");
const bodyParser = require("body-parser");
var multer = require("multer");
const cors = require("cors");
const db = require("./Models");
const { Modules } = require("../src/Modules");
const listEndpoints = require("express-list-endpoints");
// const { authJWT } = require("./Middleware");
const Config = require("./Config/Config");
var http = require("http");
var socketio = require("socket.io");
const WebSockets = require("./Utils/WebSockets");

const app = express();

var upload = multer({ dest: "Storage/" });

var corsOptions = {
  // origin: "http://localhost:8081",
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - multipart/form-data
app.use(upload.array());

if (Config.DB === "mysql") {
  // db.sequelize.sync();

  // FORCE Alter
  db.sequelize.sync({ alter: true }).then(() => {
    console.log("Alter and Resync Db");
    initial();
  });
  //FORCE RESYNC
  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and Resync Db");
  //   initial();
  // });
  const Role = db.role;
  function initial() {
    // id: 1,
    Role.findOrCreate({
      where: {
        name: "superadmin",
      },
      defaults: {},
    });
    // id: 2,
    Role.findOrCreate({
      where: {
        name: "admin",
      },
      defaults: {},
    });

    // id: 3,
    Role.findOrCreate({
      where: {
        name: "moderator",
      },
      defaults: {},
    });

    // id: 4,
    Role.findOrCreate({
      where: {
        name: "vendor",
      },
      defaults: {},
    });

    // id: 5,
    Role.findOrCreate({
      where: {
        name: "agent",
      },
      defaults: {},
    });

    // id: 6,
    Role.findOrCreate({
      where: {
        name: "user",
      },
      defaults: {},
    });
  }
}
if (Config.DB === "mongo") {
  //FORCE RESYNC AUTO
  const Role = db.role;

  Role.findOneAndUpdate(
    {
      name: "user",
    },
    {
      name: "user",
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  );
  Role.findOneAndUpdate(
    {
      name: "vendor",
    },
    {
      name: "vendor",
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  );
  Role.findOneAndUpdate(
    {
      name: "agent",
    },
    {
      name: "agent",
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  );
  Role.findOneAndUpdate(
    {
      name: "moderator",
    },
    {
      name: "moderator",
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  );
  Role.findOneAndUpdate(
    {
      name: "admin",
    },
    {
      name: "admin",
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  );
  Role.findOneAndUpdate(
    {
      name: "superadmin",
    },
    {
      name: "superadmin",
    },
    {
      new: true,
      upsert: true, // Make this update into an upsert
    },
    function (err, doc) {
      // console.log("err , doc", err, doc);
    }
  );
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AntJS application." });
});
app.get("/getRoutes", (req, res) => {
  res.json({ routes: listEndpoints(app) });
});
app.get("/api/", (req, res) => {
  res.json({ routes: listEndpoints(app) });
});

require("./Routes/Auth.routes")(app);
// require('../src/Modules/User/Routes/User.routes')(app);

//Load Routes
Modules.map((m) => {
  // console.log("../src/Modules/" + m.basePath + "/" + m.routes);
  require("../src/Modules/" + m.basePath + "/" + m.routes)(app);
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
console.clear();
var server = http.createServer(app);
global.io = socketio(server);
// global.io.engine.generateId = function (req) {
//   // generate a new custom id here
//   // console.log('req',req.socket.id);
//   return 1
// }
global.io.on("connection", WebSockets.connection);

// const socketIO = io(server);
// // socketIO.listen(server);

// socketIO.on("connection", (socket) => {
//   console.log("connected");
//   socket.on("message", (evt) => {
//     console.log(evt);
//     socket.broadcast.emit("message", evt);
//   });
// });
// socketIO.on("disconnect", (evt) => {
//   console.log("disconnected");
// });
server.listen(PORT, function () {
  console.log("Express server listening on port " + PORT);
});

module.exports = app;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
/**
 * @apiDefine RoleNotFoundError
 *
 * @apiError RoleNotFound The id of the Role was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "RoleNotFound"
 *     }
 */

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} username Users unique username.
 * @apiParam {String} password Users password.
 * @apiParam {String} role Users roles.
 * @apiParam {String} email Users email address.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
      {
          "success": true,
          "user": {
              "id": 1,
              "username": "admin",
              "email": "info@exits.in",
              "password": "$2a$08$KqzKC.hgjq3ULHGpKSrcxe8tfrR8ohgxIAIPN.J4nz1MnGru2HxGK",
              "updatedAt": "2021-02-10T07:32:43.884Z",
              "createdAt": "2021-02-10T07:32:43.884Z"
          },
          "roles": [
              "ROLE_ADMIN"
          ],
          "accessToken": "..",
          "message": "User was registered successfully!"
      }
 *
 * @apiUse RoleNotFoundError
 */
/**
 * @api {post} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} username Users unique username.
 * @apiParam {String} password Users password.
 * @apiParam {String} role Users roles.
 * @apiParam {String} email Users email address.
 *
 * @apiParamExample {json} Request-Example:
 *{
 *  "username": "admin",
 *  "email": "info@exits.in",
 *  "password": "123456",
 *  "role": "admin"
 *}
 * @apiSuccess {String} firstname Firstname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiUse RoleNotFoundError
 */
