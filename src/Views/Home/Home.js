import React, {Component} from 'react';

import {withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {Route, Link, withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import moment from 'moment';
import {loginUser, getAddresses, userLogout} from '../../Redux/Actions';
import Frame from '../../Components/Frame/Frame';
import Input from '../../Components/Input/Input';
import Form from '../../Components/Form/Form';
import DataTable from '../../Components/DataTable/DataTable';
import './Home.css';
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

class Home extends Component {
  state = {};
  componentDidUpdate(prevProps, prevState) {
    console.log('SELECT HOME CDU', this.state);
  }
  changeStateValueHandler = (name, value) => {
    console.log('SELECT HOME changeStateValueHandler', name, value);
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
    return value;
  };
  render() {
    const {classes} = this.props;
    return (
      <Frame>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{
            color: '#000',
            height: '100%',
          }}
          spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{height: 'inherit'}}>
            <Paper
              className={classes.root}
              elevation={3}
              style={{
                padding: '20px 0',
                position: 'relative',
                height: `calc(100% - 80px)`,
                margin: '40px 0',
              }}>
              <p>lorem ipsum</p>
              {console.log(this.state.date)}
              <Form
                cols={[8, 2]}
                spacing={3}
                onChangeHandler={(name, value) =>
                  this.changeStateValueHandler(name, value)
                }
                fields={[
                  [
                    {
                      type: 'date',
                      name: 'date',
                      label: 'DOB',
                      value: this.state.date,
                      props: {style: {backgroundColor: '#f00'}},
                    },
                    {
                      type: 'select',
                      name: 'gender',
                      label: 'Gender',
                      props: {
                        options: [
                          {male: 'Male'},
                          {female: 'Female'},
                          {other: 'Other'},
                        ],
                        left: '$',
                      },
                    },
                  ],
                  [
                    {
                      type: 'custom',
                      component: (
                        <Paper>
                          <h1>hi</h1>
                        </Paper>
                      ),
                    },
                  ],
                ]}
              />
              <br />
              <br />
              <br />
              {/* <Input type="date" name="date" label="Date" left="$" /> */}

              {/* <Input type="radio" name="gender" label='Gender' left="$" options={[
                  {male:'Male'},
                  {female:'Female'},
                  {other:'Other'},
                ]}/> */}
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{
            color: '#000',
            height: '100%',
            marginTop: 5,
          }}
          spacing={5}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{height: 'inherit'}}>
            <DataTable />
          </Grid>
        </Grid>
      </Frame>
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
    name: 'Home',
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
