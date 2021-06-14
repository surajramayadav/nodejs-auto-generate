const { authJWT } = require("../../../../server/Middleware");
const Config = require("../../../../server/Config/Config");
const Role = require(`../Controller/Role.controller.${Config.DB}`);
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
  // router.post("/", Role.create);
  router.post("/", [authJWT.verifyToken, authJWT.isAdmin], Role.create);

  // Retrieve a single Tutorial with id
  router.get("/:id", Role.findOne);

  // Retrieve all Tutorials
  router.get("/", Role.findAll);

  // Update a Tutorial with id
  // router.put("/:id", Role.update);
  router.put("/:id", [authJWT.verifyToken, authJWT.isAdmin], Role.update);

  // Delete a Tutorial with id
  // router.delete("/:id", Role.delete);
  router.delete("/:id", [authJWT.verifyToken, authJWT.isAdmin], Role.delete);

  // Create a new Tutorial
  // router.delete("/", Role.deleteAll);
  router.delete("/", [authJWT.verifyToken, authJWT.isAdmin], Role.deleteAll);

  // Retrieve all published Tutorials
  // router.get('/published', Role.findAllPublished);

  app.use(
    "/api/" + Modules.apiRoute,
    // [authJWT.verifyToken],
    router
  );
  return app;
};
