module.exports = {
  name: "User",
  baseName: "user",
  basePath: "User",
  model: "Model/User.model",
  controller: "Controller/User.controller",
  routes: "Routes/User.routes",
  baseRoute: "user",
  apiRoute: "user",
  dbName: "user",
  dbCollection: "Users",
  dbColumns: {
    username: {
      type: "string",
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    mobile: {
      type: "decimal",
    },
    roles: {
      type: "fk",
      ref: "role",
    },
  },
  menuRoutes: {
    common: [
      {
        title: "Add User",
        route: "USER_ROLE/create",
        uses: "Views/USER_ROLE/User",
      },
      {
        title: "View Users",
        route: "USER_ROLE/view",
        uses: "Views/USER_ROLE/Users",
      },
    ],
    user: [
      {
        title: "Add User",
        routeName: "AddUser",
        route: "user/create",
        uses: "Views/User/User",
      },
      {
        title: "View Users",
        routeName: "ViewUsers",
        route: "user/view",
        uses: "Views/User/Users",
      },
    ],
    agent: [],
    vendor: [],
    admin: [],
  },
  moduleRoutes: {
    common: {
      index: { url: "/", use: "abc.js", type: "GET" },
      show: { url: "/:id", use: "abc.js", type: "GET" },
      create: { url: "/", use: "abc.js", type: "POST" },
      update: { url: "/update/{}", use: "abc.js", type: "PUT" },
      delete: { url: "/delete/{}", use: "abc.js", type: "DELETE" },
    },
    user: [],
    agent: [],
    vendor: [],
    admin: [],
  },
};
