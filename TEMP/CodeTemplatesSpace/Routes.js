const routes = `const { authJWT } = require("../../../../server/Middleware");
const Config = require("../../../../server/Config/Config");
const ${moduleName} = require(\`../Controller/${moduleName}.controller.\${Config.DB}\`);
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

  // Create a new ${moduleName}
  adminRouter.post("/", ${moduleName}.create);

  // Retrieve a single ${moduleName} with id
  adminRouter.get("/:id", ${moduleName}.findOne);

  // Retrieve all ${moduleName}s
  adminRouter.get("/", ${moduleName}.findAll);

  // Update a ${moduleName} with id
  adminRouter.put("/:id", [authJWT.verifyToken, authJWT.isAdmin], ${moduleName}.update);

  // Delete a ${moduleName} with id
  adminRouter.delete(
    "/:id",
    [authJWT.verifyToken, authJWT.isAdmin],
    ${moduleName}.delete
  );

  // Delete all ${moduleName}s
  //   adminRouter.delete(
  //     "/",
  //     [authJWT.verifyToken, authJWT.isAdmin],
  //     ${moduleName}.deleteAll
  //   );

  app.use(
    "/api/admin/" + Modules.apiRoute,
    // [authJWT.verifyToken],
    adminRouter
  );
  var userRouter = require("express").Router();

  // ******************************************************************************************************************************
  // ************************************************** USER ROUTES ***************************************************************
  // ******************************************************************************************************************************

  userRouter.get("/getProfile", [authJWT.verifyToken], ${moduleName}.getProfile);

  // Create a new ${moduleName}
  userRouter.post("/", [authJWT.verifyToken], ${moduleName}.user_create);

  // Retrieve a single ${moduleName} with id
  userRouter.get("/:id", [authJWT.verifyToken], ${moduleName}.user_findOne);

  // Retrieve all ${moduleName}s
  userRouter.get("/", [authJWT.verifyToken], ${moduleName}.user_findAll);

  // Update a ${moduleName} with id
  userRouter.put("/:id", [authJWT.verifyToken], ${moduleName}.user_update);

  // Delete a ${moduleName} with id
  userRouter.delete("/:id", [authJWT.verifyToken], ${moduleName}.user_delete);

  // Delete all ${moduleName}s
  //userRouter.delete("/", [authJWT.verifyToken], ${moduleName}.user_deleteAll);

  app.use("/api/user/" + Modules.apiRoute, userRouter);

  return app;
};
`;
