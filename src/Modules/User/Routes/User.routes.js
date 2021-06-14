const { authJWT } = require("../../../../server/Middleware");
const Config = require("../../../../server/Config/Config");
const User = require(`../Controller/User.controller.${Config.DB}`);
const Modules = require("../index");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  // ******************************************************************************************************************************
  // ************************************************** Admin ROUTES ***************************************************************
  // ******************************************************************************************************************************

  var adminRouter = require("express").Router();

  // Create a new User
  // adminRouter.post("/", User.create);
  adminRouter.post("/",  User.create);

  // Retrieve a single User with id
  adminRouter.get("/:id", User.findOne);

  // Retrieve all Users
  adminRouter.get("/", User.findAll);

  // Update a User with id
  // adminRouter.put("/:id", User.update);
  adminRouter.put("/:id", [authJWT.verifyToken, authJWT.isAdmin], User.update);

  // Delete a User with id
  // adminRouter.delete("/:id", User.delete);
  adminRouter.delete(
    "/:id",
    [authJWT.verifyToken, authJWT.isAdmin],
    User.delete
  );

  // Create a new User
  // adminRouter.delete("/", User.deleteAll);
  adminRouter.delete(
    "/",
    [authJWT.verifyToken, authJWT.isAdmin],
    User.deleteAll
  );

  // Retrieve all published Users
  // adminRouter.get('/published', User.findAllPublished);

  app.use(
    "/api/admin/" + Modules.apiRoute,
    // [authJWT.verifyToken],
    adminRouter
  );
  var userRouter = require("express").Router();

  // ******************************************************************************************************************************
  // ************************************************** USER ROUTES ***************************************************************
  // ******************************************************************************************************************************

  userRouter.get("/getProfile", [authJWT.verifyToken], User.getProfile);

  // Create a new User
  // adminRouter.post("/", User.create);
  userRouter.post("/", [authJWT.verifyToken], User.user_create);

  // Retrieve a single User with id
  userRouter.get("/:id", [authJWT.verifyToken], User.user_findOne);

  // Retrieve all Users
  userRouter.get("/", [authJWT.verifyToken], User.user_findAll);

  // Update a User with id
  // userRouter.put("/:id", User.user_update);
  userRouter.put("/:id", [authJWT.verifyToken], User.user_update);

  // Delete a User with id
  // userRouter.delete("/:id", User.user_delete);
  userRouter.delete("/:id", [authJWT.verifyToken], User.user_delete);

  // Create a new User
  // userRouter.delete("/", User.user_deleteAll);
  userRouter.delete("/", [authJWT.verifyToken], User.user_deleteAll);

  app.use("/api/user/" + Modules.apiRoute, userRouter);

  return app;
};
