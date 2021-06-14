const mongoose = require("mongoose");
const { dbColumns } = require("../index");

const Schema = mongoose.Schema;

let columns = {};
// Object.keys(dbColumns).map((c, i) => {
//   let colType = String;
//   columns = { ...columns, [c]: { type: colType } };
// });

Object.keys(dbColumns).map((c, i) => {
  let colType = Schema.Types.String;

  switch (dbColumns[c].type) {
    case "fk":
    case "foreignkey":
    case "foreignKey":
    case "foreign":
    case "ref":
    case "references":
      colType = Schema.Types.ObjectId; // TEXT
      break;

    case "varchar":
    case "string":
    case "text":
    case "bigtext":
    case "mediumtext":
      colType = Schema.Types.String; // TEXT
      break;

    case "integer":
    case "number":
    case "num":
    case "int":
    case "bigint":
      colType = Schema.Types.Number; // INTEGER
      break;

    case "float":
    case "real":
    case "double":
    case "decimal_pure":
    case "decimal":
      colType = Schema.Types.Decimal128; // INTEGER
      break;

    case "date":
    case "time":
    case "dateonly":
      colType = Schema.Types.Date; // DATETIME
      break;

    case "boolean":
      colType = Schema.Types.Boolean; // TINYINT(1)
      break;

    case "json":
      colType = Schema.Types.Object; // JSON column. .
      break;

    default:
      colType = Schema.Types.String; // VARCHAR(255)
      break;
  }
  let required = dbColumns[c].notnull ? true : false;

  let unique = dbColumns[c].unique ? dbColumns[c].unique : false;

  let defaultValue = dbColumns[c].defaultValue
    ? dbColumns[c].defaultValue
    : null;

  let ref = dbColumns[c].ref ? dbColumns[c].ref : null;
  if (dbColumns[c].ref) {
    console.log("dbColumns[c].ref", dbColumns[c].ref);
    columns = {
      ...columns,
      [c]: [
        {
          type: colType,
          ref,
        },
      ],
    };
  } else {
    columns = {
      ...columns,
      [c]: {
        type: colType,
        required,
        unique,
        default: defaultValue,
      },
    };
  }
});

// columns = {
//   ...columns,
//   roles2: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "role",
//     },
//   ],
// };
// console.log("columns,User", columns);
let User = new Schema(columns, { collection: "Users", timestamps: true });

User.methods.getRoles = function () {
  this.populate("roles")
    .execPopulate()
    .then((data) => {
      // console.log("data", this._id);
      return data.roles;
    });
  // console.log('this.populate("roles")', );
  //  this.populate("roles").execPopulate();
  // return this.populate("roles").execPopulate();
  // return this._id;
};
// User.statics.getX = function () {
//   return "Hi";
// };
module.exports = mongoose.model("user", User, "Users");
