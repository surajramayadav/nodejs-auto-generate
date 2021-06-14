const bcrypt = require("bcryptjs");
const db = require("../../../../server/Models");

const ChatRoom = db.chatroom;

// Create and Save a new ChatRoom
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ChatRoom
  const chatroom = {
    chatInitiator: req.body.chatInitiator,
    type: req.body.type,
    userIds: req.body.userIds,
  };
  let chatroomModel = ChatRoom.initiateChat(chatroom);
  // Save ChatRoom in the database
};

// Retrieve all ChatRooms from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: `/${name}/` } : null;
  ChatRoom.find(condition)
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        chatroom: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while creating the ChatRoom.",
      });
    });
};

// Find a single ChatRoom with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ChatRoom.findOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        chatroom: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving chatrooms.",
      });
    });
};

// Update a ChatRoom by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ChatRoom.updateOne({ _id: id }, req.body)
    .then((doc) => {
      console.log(doc);
      ChatRoom.findOne({ _id: id })
        .then((chatroom) => {
          console.log(chatroom);
          res.send({
            success: true,
            result: doc,
            chatroom,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Cannot update ChatRoom with id = ${id}. Maybe ChatRoom was not found or req.body is empty!`,
      });
    });
};

// Delete a ChatRoom with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  ChatRoom.deleteOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.send({
        success: true,
        data: doc,
        message: `ChatRoom with id = ${id} has been deleted successfully!`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Cannot delete ChatRoom with id = ${id}. Maybe ChatRoom was not found !`,
      });
    });
};

// Delete all ChatRooms from the database.
exports.deleteAll = (req, res) => {
  ChatRoom.deleteMany()
    .then((nums) => {
      res.send({
        success: true,
        data: nums,
        message: `${nums.deletedCount} ChatRooms were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while removing all chatrooms.",
      });
    });
};
