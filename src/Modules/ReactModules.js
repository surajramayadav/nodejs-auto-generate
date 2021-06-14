// import React, { lazy } from "react";
// import loadable from "@loadable/component";
import { moduleList } from "./moduleList";

import React from "react";
import User from "./User/Views/User/User";
import Users from "./User/Views/User/Users";
/* let ReactModules = {};
Object.keys(moduleList).map((m) => {
  const modelName = moduleList[m];
  console.log("mmmm", modelName);

  let mod = require("./" + moduleList[m] + "/index.js");
  // console.log(" ReactModules mod", mod.menuRoutes.user);
  mod.menuRoutes.user.map((menuItem) => {
    const menuName = menuItem.routeName;
    const ModuleName = "./" + modelName + "/" + menuItem.uses;
    // console.log("ReactModules menuItem", menuItem, ModuleName, menuName);
    console.log("const " + menuName + " = require(" + ModuleName + ");");
    // import("./User/Views/User/User.js").then((data) => {
    //   console.log("data", data);
    //   ReactModules = {
    //     ...ReactModules,
    //     [menuName]: data,
    //   };
    // });
    // const LoadableComponent = loadable((props) => import(ModuleName));
    // const LoadableComponent = loadable((props) => import(ModuleName));
    // let module = lazy(() => import("./User/Views/User/User"));
    ReactModules = {
      ...ReactModules,
      [menuName]: React.createElement(menuName),
    };
  });
  //   Modules.push({ [modelName]: mod });
});
console.log("modXX", ReactModules);
 */
// export default ReactModules;

let Components = {};
// export default ReactModules;
export default Components = {
  AddUser: User,
  ViewUsers: Users,
};

// export default (block) => {
//   if (typeof Components[block.component] !== "undefined") {
//     return React.createElement(Components[block.component], {
//       key: block._uid,
//       block: block,
//     });
//   }
//   return React.createElement(
//     () => <div>The component {block.component} has not been created yet.</div>,
//     { key: block._uid }
//   );
// };
