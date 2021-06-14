module.exports = {
    name: "${moduleName}",
    baseName: "${moduleNameLC}",
    basePath: "${moduleName}",
    model: "Model/${moduleName}.model",
    controller: "Controller/${moduleName}.controller",
    routes: "Routes/${moduleName}.routes",
    baseRoute: "${moduleNameLC}",
    apiRoute: "${moduleNameLC}",
    dbName: "${moduleNameLC}",
    dbCollection: "${moduleName}s",
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
        { title: "Add ${moduleName}", route: "/create" },
        { title: "View ${moduleName}s", route: "/" },
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
  