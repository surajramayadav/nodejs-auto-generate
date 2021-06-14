const Sequelize = require("sequelize");
const mongoose = require("mongoose");
const { Modules } = require("../../src/Modules");
const Config = require("../Config/Config");
let db = {};

if (Config.DB === "mongo") {
  mongoose.connect(Config.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const connection = mongoose.connection;
  Modules.map((m) => {
    db[m.baseName] = require("../../src/Modules/" +
      m.basePath +
      "/" +
      m.model +
      ".mongo");
  });
  connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });
}

if (Config.DB === "mysql") {
  const sequelize = new Sequelize(
    Config.MYSQL_DB,
    Config.MYSQL_USER,
    Config.MYSQL_PASSWORD,
    {
      host: Config.MYSQL_HOST,
      dialect: Config.MYSQL_dialect,
      //   operatorsAliases: false,

      pool: {
        max: Config.MYSQL_pool.max,
        min: Config.MYSQL_pool.min,
        acquire: Config.MYSQL_pool.acquire,
        idle: Config.MYSQL_pool.idle,
      },
    }
  );

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  //Load Models
  Modules.map((m) => {
    db[m.baseName] = require("../../src/Modules/" +
      m.basePath +
      "/" +
      m.model +
      ".mysql")(sequelize, Sequelize);
  });
  // console.log('Modules',Modules);
  // db.user = require('../../src/Modules/User/Model/User.model.js')(sequelize, Sequelize);
  // db.role = require('../Models/Role.model.js')(sequelize, Sequelize);

  db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "role_id",
    otherKey: "user_id",
  });
  db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "user_id",
    otherKey: "role_id",
  });

  db.ROLES = ["user", "admin", "moderator", "vendor", "agent"];
}

module.exports = db;
