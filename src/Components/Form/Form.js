import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '../Input/Input';

import './Form.css';
const classes = {};
const styles = {};

class Form extends Component {
  state = {};
  componentDidUpdate(prevProps, prevState) {
    // console.log('FORM', this.state, this.props.value);
    // const name = this.props.name;
    // const value = this.props.value;
    // if (
    //   typeof this.props.value !== 'undefined' &&
    //   typeof this.state[name] === 'undefined' &&
    //   this.state[name] !== this.props.value
    // ) {
    // console.log('props updater called');
    // this.setState((state) => {
    //     return {
    //       ...state,
    //       [name]: value,
    //     };
    //   });
    // }
  }
  changeValueHandler = (name, event) => {
    let value = event.target.value;
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
    this.props.onChangeHandler(name, value);
    // return value;
  };
  // checkboxHandler = (name, checked) => {
  //   let value = checked;
  //   this.setState((state) => ({
  //     ...state,
  //     [name]: value,
  //   }));
  //   return value;
  // };
  // radioHandler = (name, event) => {
  //   let value = event.target.value;
  //   // console.log(name, value);
  //   this.setState((state) => ({
  //     ...state,
  //     [name]: value,
  //   }));
  //   return value;
  // };
  dateTimeHandler = (name, mmt, type = 'date') => {
    // console.log('FORM DATETIME', name, mmt, type);
    let value = mmt.format('DD-MM-Y');
    if (type === 'time') {
      value = mmt.format('hh:mm A');
    }
    if (type === 'datetime') {
      value = mmt.format('DD-MM-Y hh:mm A');
    }
    // console.log(name, value, type);
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
    this.changeStateValueHandler(name, value);
    // this.props.onChangeHandler(name, mmt, type);
    // return {name, mmt, type};
  };
  changeStateValueHandler = (name, value) => {
    console.log('SELECT FROM xx', name, value);
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
    this.props.onChangeHandler(name, value);
    // return {name, value};
  };
  render() {
    const frmFields = this.props.fields.map((fieldList, index) => {
      const len = this.props.fields.length;
      let colWidth = Math.ceil(12 / len);
      if (typeof this.props.cols === 'object') {
        colWidth = this.props.cols[index];
      }
      const rndr =
        fieldList &&
        fieldList.map((field) => {
          let onChangeHandler = (event) =>
            this.changeValueHandler(field.name, event);
          if (field.type !== 'custom' && field.type === 'checkbox') {
            onChangeHandler = (event) =>
              this.changeStateValueHandler(field.name, event.target.checked);
          }

          if (field.type !== 'custom' && field.type === 'select') {
            onChangeHandler = (event) =>
              this.changeStateValueHandler(
                event.target.name,
                event.target.value,
              );
          }
          if (
            field.type !== 'custom' &&
            (field.type === 'date' ||
              field.type === 'time' ||
              field.type === 'datetime')
          ) {
            onChangeHandler = (mmt) =>
              this.dateTimeHandler(field.name, mmt, field.type);
          }
          return (
            <Grid item>
              {field.type === 'custom' ? (
                <Input
                  type={field.type}
                  component={field.component}
                  name={field.name}
                  label={field.label}
                  value={field.value}
                  onChange={onChangeHandler}
                  {...field.props}
                />
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  value={field.value}
                  onChange={onChangeHandler}
                  {...field.props}
                />
              )}
            </Grid>
          );
        });
      return typeof this.props.cols !== 'undefined' ? (
        <Grid item xs={colWidth} sm={colWidth} md={colWidth} lg={colWidth}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            style={{
              color: '#000',
              height: '100%',
            }}
            spacing={this.props.spacing || 2}>
            {rndr}
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          style={{
            color: '#000',
            height: '100%',
          }}
          spacing={this.props.spacing || 2}>
          {rndr}
        </Grid>
      );
    });
    if (typeof this.props.cols !== 'undefined') {
      return (
        <>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{
              color: '#000',
              height: '100%',
              ...this.props.style,
            }}>
            {frmFields}
          </Grid>
        </>
      );
    } else {
      return <>{frmFields}</>;
    }
  }
}
export default Form;
