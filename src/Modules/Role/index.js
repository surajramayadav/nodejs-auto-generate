module.exports = {
  name: "Role",
  baseName: "role",
  basePath: "Role",
  model: "Model/Role.model",
  controller: "Controller/Role.controller",
  routes: "Routes/Role.routes",
  baseRoute: "role",
  apiRoute: "role",
  dbName: "role",
  dbCollection: "Roles",
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
      { title: "Add Role", route: "/create" },
      { title: "View Roles", route: "/" },
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
