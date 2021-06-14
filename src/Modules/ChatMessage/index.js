module.exports = {
  name: "ChatMessage",
  baseName: "role",
  basePath: "ChatMessage",
  model: "Model/ChatMessage.model",
  controller: "Controller/ChatMessage.controller",
  routes: "Routes/ChatMessage.routes",
  baseRoute: "role",
  apiRoute: "role",
  dbName: "role",
  dbCollection: "ChatMessages",
  dbColumns: {
    name: {
      type: "string",
    },
    users: {
      type: "fk",
      ref: "user",
    },
  },
  menuRoutes: {
    common: [
      { title: "Add ChatMessage", route: "/create" },
      { title: "View ChatMessages", route: "/" },
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
