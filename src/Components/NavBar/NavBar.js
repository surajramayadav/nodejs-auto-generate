import React, { Component } from "react";
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

import { connect } from "react-redux";
import compose from "recompose/compose";
import { loginUser, userLogout } from "../../Redux/Actions";

import "./NavBar.css";

const classes = {};
const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 20
  },
  grow: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
};

class NavBar extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <IoMdMenu style={{ color: "#fff" }} size={20} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
function mapDispatchToProps(dispatch) {
  return {
    userLogout: user => dispatch(userLogout(user)),
    loginUser: user => dispatch(loginUser(user))
  };
}
export default compose(
  withStyles(styles, {
    name: "NavBar"
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);
