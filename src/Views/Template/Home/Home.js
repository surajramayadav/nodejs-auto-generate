import React, { Component } from "react";

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Route, Link, withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { loginUser, getAddresses, userLogout } from "../..//Redux/Actions";
import Frame from "../../Components/Frame/Frame";
import "./Home.css";
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
class Home extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <>
        <Frame>
          <Grid xs={4} sm={4} md={4} lg={4} style={{ height: "inherit" }}>
            <Paper
              className={classes.root}
              elevation={3}
              style={{
                padding: "20px 0",
                position: "relative",
                height: `calc(100% - 80px)`,
                margin: "40px 0"
              }}
            >
              <p>lorem ipsum</p>
            </Paper>
          </Grid>
        </Frame>
      </>
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
    name: "Home"
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Home);
