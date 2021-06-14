import React, {Component} from 'react';
import clsx from 'clsx';
import NavBar from '../NavBar/NavBar';
import {withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import {
  // Route,
  Link,
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {loginUser, getAddresses, userLogout} from '../../Redux/Actions';
import SideBar from '../SideBar/SideBar';
let drawerWidth = 240;
const styles = (theme) => ({
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -160,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class Frame extends Component {
  state = {sideBarOpen: true, sideBarWidth: 240};
  handleSideBarClose = () => {
    this.setState((state) => {
      return {
        ...state,
        sideBarOpen: false,
      };
    });
  };
  handleSideBarOpen = () => {
    this.setState((state) => {
      return {
        ...state,
        sideBarOpen: true,
      };
    });
  };
  render() {
    const {classes} = this.props;
    drawerWidth = this.state.sideBarWidth;
    return (
      <>
        <CssBaseline />
        <div
          className={classes.root}
          style={{marginLeft: this.state.sideBarWidth}}>
          <SideBar
            sideBarClose={this.handleSideBarClose}
            sideBarOpen={this.handleSideBarOpen}
          />
          {/* <NavBar /> */}
          <div
            style={{
              color: '#000',
              textAlign: 'center',
              // width: "100%",
              width: `calc(100vw - 300px)`,
            }}
            className={clsx(classes.content, {
              [classes.contentShift]: this.state.sideBarOpen,
            })}>
            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
              direction="row"
              style={{
                width: '100%',
                height: '100%',
              }}>
              {this.props.children}
            </Grid>
          </div>
        </div>
      </>
    );
  }
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
  };
}
export default compose(
  withStyles(styles, {
    name: 'Frame',
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Frame);
