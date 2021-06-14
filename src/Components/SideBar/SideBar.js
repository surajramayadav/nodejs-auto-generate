import React, {Component} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import {Route, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {Dashboard} from '@material-ui/icons';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {loginUser, getAddresses, userLogout} from '../../Redux/Actions';
import Modules from '../../Modules/Modules';
import Collapse from '@material-ui/core/Collapse';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
// import {Modules} from '../../Modules';

import './SideBar.css';

const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    elevation: 10,
  },
  drawerOpen: {
    elevation: 10,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: 1,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'none',
    // backgroundImage: 'url(https://i.pinimg.com/originals/8f/df/57/8fdf571adc94693d62bbb5d2b7032a14.jpg)',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    // background: 1,
    // backgroundSize: "100% 100vh",
    // backgroundRepeat: "none",
    // backgroundImage:
    //   "url(https://i.pinimg.com/originals/8f/df/57/8fdf571adc94693d62bbb5d2b7032a14.jpg)",
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class SideBar extends Component {
  state = {open: true};

  handleDrawerClose = () => {
    this.setState((state) => {
      return {
        ...state,
        open: false,
      };
    });
    this.props.sideBarClose();
  };
  handleDrawerOpen = () => {
    this.setState((state) => {
      return {
        ...state,
        open: true,
      };
    });
    this.props.sideBarOpen();
  };
  toggleDrawerItem = (item) => {
    const value =
      typeof this.state[item] === 'undefined' ? true : !this.state[item];
    this.setState((state) => {
      return {
        ...state,
        [item]: value,
      };
    });
  };
  render() {
    const open = this.state.open;
    const {classes} = this.props;
    return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.toolbar}>
          <IconButton
            onClick={
              this.state.open ? this.handleDrawerClose : this.handleDrawerOpen
            }>
            {this.state.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" style={{textDecoration: 'none', color: '#000'}}>
            <ListItem
              button
              style={{backgroundColor: 'transparent'}}
              key={'Dashboard'}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>
          </Link>
        </List>
        <List>
          {Modules.map((modl, i) => {
            let m = modl[Object.keys(modl)[0]];
            console.log(m);
            return (
              <>
                <ListItem button onClick={() => this.toggleDrawerItem(m.name)}>
                  <ListItemIcon>
                    {i % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={m.name} />
                  {this.state[m.name] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state[m.name]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {m.menuRoutes.user.map((menuRoute) => (
                      <Link
                        to={'/' + menuRoute.route}
                        style={{textDecoration: 'none', color: '#000'}}>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary={menuRoute.title} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </>
            );
          })}
        </List>
        {/*
        
                  <Link
                to={'/' + m.baseRoute}
                style={{textDecoration: 'none', color: '#000'}}>
                <ListItem
                  button
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  key={m.baseRoute}>
                  <ListItemIcon>
                    {i % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={m.name} />
                </ListItem>
              </Link>
        
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem
              button
              style={{backgroundColor: 'transparent'}}
              key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        <Divider />
      </Drawer>
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
    name: 'SideBar',
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SideBar);
