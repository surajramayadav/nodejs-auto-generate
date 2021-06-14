const mongoose = require("mongoose");
const { dbColumns } = require("../index");
const Schema = mongoose.Schema;
export const CHAT_ROOM_TYPES = {
  USER: "USER",
  GROUP: "GROUP",
  BROADCAST: "BROADCAST",
  SUPPORT: "SUPPORT",
};
let columns = {};
// Object.keys(dbColumns).map((c, i) => {
//   let colType = String;
//   columns = { ...columns, [c]: { type: colType } };
// });
// columns = {
//   ...columns,
//   users: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "user",
//     },
//   ],
// };
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

let ChatRoom = new Schema(columns, {
  collection: "ChatRooms",
  timestamps: true,
});

/**
 * @param {String} userId - id of user
 * @return {Array} array of all chatroom that the user belongs to
 */
ChatRoom.statics.getChatRoomsByUserId = async function (userId) {
  try {
    const rooms = await this.find({ userIds: { $all: [userId] } });
    return rooms;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} roomId - id of chatroom
 * @return {Object} chatroom
 */
ChatRoom.statics.getChatRoomByRoomId = async function (roomId) {
  try {
    const room = await this.findOne({ _id: roomId });
    return room;
  } catch (error) {
    throw error;
  }
};

ChatRoom.statics.initiateChat = async function (userIds, type, chatInitiator) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: "retrieving an old chat room",
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      };
    }

    const newRoom = await this.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: "creating a new chatroom",
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
  } catch (error) {
    console.log("error on start chat method", error);
    throw error;
  }
};

module.exports = mongoose.model("chatroom", ChatRoom, "ChatRooms");
