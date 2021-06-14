const {authJWT} = require('../Middleware');
const controller = require('../Controllers/user.controller');
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Authorization, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/test/all', controller.allAccess);

  app.get('/api/test/user', [authJWT.verifyToken], controller.userBoard);

  app.get(
    '/api/test/mod',
    [authJWT.verifyToken, authJWT.isModerator],
    controller.moderatorBoard,
  );

  app.get(
    '/api/test/admin',
    [authJWT.verifyToken, authJWT.isAdmin],
    controller.adminBoard,
  );
};
