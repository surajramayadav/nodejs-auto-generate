const { authJWT } = require("../../../../server/Middleware");
const Config = require("../../../../server/Config/Config");
const ChatRoom = require(`../Controller/ChatRoom.controller.${Config.DB}`);
const Modules = require("../index");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Create a new Tutorial
  // router.post("/", ChatRoom.create);
  router.post("/", [authJWT.verifyToken, authJWT.isAdmin], ChatRoom.create);

  // Retrieve a single Tutorial with id
  router.get("/:id", ChatRoom.findOne);

  // Retrieve all Tutorials
  router.get("/", ChatRoom.findAll);

  // Update a Tutorial with id
  // router.put("/:id", ChatRoom.update);
  router.put("/:id", [authJWT.verifyToken, authJWT.isAdmin], ChatRoom.update);

  // Delete a Tutorial with id
  // router.delete("/:id", ChatRoom.delete);
  router.delete("/:id", [authJWT.verifyToken, authJWT.isAdmin], ChatRoom.delete);

  // Create a new Tutorial
  // router.delete("/", ChatRoom.deleteAll);
  router.delete("/", [authJWT.verifyToken, authJWT.isAdmin], ChatRoom.deleteAll);

  // Retrieve all published Tutorials
  // router.get('/published', ChatRoom.findAllPublished);

  app.use(
    "/api/" + Modules.apiRoute,
    // [authJWT.verifyToken],
    router
  );
  return app;
};
