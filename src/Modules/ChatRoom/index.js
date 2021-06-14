module.exports = {
  name: "ChatRoom",
  baseName: "chatroom",
  basePath: "ChatRoom",
  model: "Model/ChatRoom.model",
  controller: "Controller/ChatRoom.controller",
  routes: "Routes/ChatRoom.routes",
  baseRoute: "chatroom",
  apiRoute: "chatroom",
  dbName: "chatroom",
  dbCollection: "ChatRooms",
  dbColumns: {
    chatInitiator: {
      type: "string",
    },
    type: {
      type: "string",
    },
    userIds: {
      type: "fk",
      ref: "user",
    },
  },
  menuRoutes: {
    common: [
      { title: "Add ChatRoom", route: "/create" },
      { title: "View ChatRooms", route: "/" },
    ],
    user: [],
    agent: [],
    vendor: [],
    admin: [],
  },
  moduleRoutes: {
    common: {
      index: { url: "/", use: "abc.js", type: "GET" },
      create: { url: "/create", use: "abc.js", type: "GET" },
      show: { url: "/show/{}", use: "abc.js", type: "GET" },
      edit: { url: "/edit/{}", use: "abc.js", type: "POST" },
      update: { url: "/update/{}", use: "abc.js", type: "POST" },
      delete: { url: "/delete/{}", use: "abc.js", type: "POST" },
    },
    user: [],
    agent: [],
    vendor: [],
    admin: [],
  },
};
