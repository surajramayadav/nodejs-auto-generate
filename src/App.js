import React, { Fragment, lazy } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Frame from "./Components/Frame/Frame";
import Home from "./Views/Home/Home";
import Config from "./Config";

import "./App.css";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { loginUser, getAddresses, userLogout } from "./Redux/Actions";
import clsx from "clsx";
import createBrowserHistory from "history/createBrowserHistory";
// BEGIN GENERATED & IMPORTED MODULE

import User from "./Modules/User/Views/User/User";
import Users from "./Modules/User/Views/User/Users";
// GENERATED & IMPORTED MODULE ------ PLACEHOLDER
// END GENERATED & IMPORTED MODULE

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
};

function App(props) {
  const { classes } = props;
  console.log("props", props);
  let routerRoutes = [];
  return (
    <Router
      basename={Config.PRODUCTION ? Config.REACT_BASE_PATH : "."}
      onUpdate={() => window.scrollTo(0, 0)}
      history={createBrowserHistory()}
    >
      <Fragment>
        <React.Suspense fallback={<div>Loading dialog box...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            {/* BEGIN GENERATED & IMPORTED ROUTE */}
            <Route exact path="/user/create" component={User} />
            <Route exact path="/user/view" component={Users} />
            {/* GENERATED & IMPORTED ROUTE ------ PLACEHOLDER */}
            {/* END GENERATED & IMPORTED ROUTE */}
            {/* <Route
                path="/home"
                component={() => {
                  props.userLogout();
                  return <logo />;
                }}
              /> */}
            {/* <Route path="/cuisines/:cid?" component={logo} /> */}
            {/* <Route path="/menu" component={logo} /> */}
          </Switch>
        </React.Suspense>
      </Fragment>
    </Router>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    userLogout: (user) => dispatch(userLogout(user)),
    loginUser: (user) => dispatch(loginUser(user)),
    getAddresses: (address) => dispatch(getAddresses(address)),
  };
}

export default compose(
  withStyles(styles, {
    name: "App",
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
