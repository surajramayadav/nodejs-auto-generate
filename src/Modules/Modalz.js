import loadable from "@loadable/component";
import React from "react";

const Modalz = (props) => {
  let LoadedModule = null;

  let moduleLocation = './User/Views/User/User.js';

  LoadedModule = loadable(() => import(props.path), {
    fallback: <div>Loading Module...</div>,
  });
  return <LoadedModule />;
};

export default Modalz;
