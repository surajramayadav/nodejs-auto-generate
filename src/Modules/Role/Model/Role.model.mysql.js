const { dbColumns } = require("../index");
module.exports = (sequelize, Sequelize) => {
  let columns = {};

  Object.keys(dbColumns).map((c, i) => {
    let colType = Sequelize.STRING;
    switch (dbColumns[c].type) {
      case "fk":
      case "foreignkey":
      case "foreignKey":
      case "foreign":
      case "ref":
      case "references":
        colType = Sequelize.INTEGER; // TEXT
        break;
      case "text":
        colType = Sequelize.TEXT; // TEXT
        break;
      case "bigtext":
        colType = Sequelize.TEXT("big"); // TEXT
        break;
      case "mediumtext":
        colType = Sequelize.TEXT("medium"); // TEXT
        break;
      case "integer":
      case "number":
      case "num":
      case "int":
        colType = Sequelize.INTEGER; // INTEGER
        break;
      case "bigint":
        colType = Sequelize.BIGINT; // BIGINT
        break;
      case "float":
        colType = Sequelize.FLOAT; // FLOAT
        break;
      case "real":
        colType = Sequelize.REAL; // REAL        PostgreSQL only.
        break;
      case "double":
        colType = Sequelize.DOUBLE; // DOUBLE
        break;
      case "decimal_pure":
        colType = Sequelize.DECIMAL; // DECIMAL
        break;
      case "date":
        colType = Sequelize.DATE; // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
        break;
      case "time":
        colType = Sequelize.TIME; // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
        break;
      case "dateonly":
        colType = Sequelize.DATEONLY; // DATE without time.
        break;
      case "boolean":
        colType = Sequelize.BOOLEAN; // TINYINT(1)
        break;
      case "json":
        colType = Sequelize.JSON; // JSON column. PostgreSQL, SQLite and MySQL only.
        break;
      case "double":
        colType = Sequelize.DOUBLE; // DOUBLE
        break;
      case "decimal":
        colType = Sequelize.DECIMAL(10, 2); // DECIMAL(10,2)
        break;

      default:
        colType = Sequelize.STRING; // VARCHAR(255)
        break;
    }
    let allowNull = dbColumns[c].notnull ? false : true;

    let unique = dbColumns[c].unique ? dbColumns[c].unique : false;

    let defaultValue = dbColumns[c].default ? dbColumns[c].default : null;

    let comment = dbColumns[c].comment ? dbColumns[c].comment : "";

    let autoIncrement = dbColumns[c].ai ? dbColumns[c].ai : false;

    let references = null;
    if (dbColumns[c].ref) {
      const ref = dbColumns[c].ref;
      references = {
        // This is a reference to another model
        model: ref.model,
        // This is the column name of the referenced model
        key: ref.key,
      };
    }

    columns = {
      ...columns,
      [c]: {
        type: colType,
        allowNull,
        unique,
        defaultValue,
        comment,
        autoIncrement,
        references,
      },
    };
  });

  const Role = sequelize.define("role", columns);

  return Role;
};
