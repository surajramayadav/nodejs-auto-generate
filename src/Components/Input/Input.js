import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import {Input as MUInput} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import capitalize from 'capitalize';
import {DatePicker, TimePicker, DateTimePicker} from '@material-ui/pickers';
import './Input.css';

const classes = {};
const styles = {};

class Input extends Component {
  state = {
    formInput: <TextField />,
  };
  componentDidMount() {
    this.getInput();
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('updater', this.state, this.props.value);
    const name = this.props.name;
    const value = this.props.value;
    if (
      typeof this.props.value !== 'undefined' &&
      this.state[name] !== this.props.value
    ) {
      // console.log('props updater called', name, value);
      this.setState((state) => {
        return {
          ...state,
          [name]: value,
        };
      });
    }
  }
  changeValueHandler = (name, event) => {
    let value = event.target.value;
    // console.log('INPUT changeValueHandler', name, value);
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
    return value;
  };
  checkboxHandler = (name, checked) => {
    let value = checked;
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
    return value;
  };
  radioHandler = (name, event) => {
    let value = event.target.value;
    // console.log(name, value);
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
    return value;
  };
  dateTimeHandler = (name, mmt, type = 'date') => {
    // console.log('INPUT DATETIME', name, mmt, type);
    let value = mmt.format('DD-MM-Y');
    if (type === 'time') {
      value = mmt.format('hh:mm A');
    }
    if (type === 'datetime') {
      value = mmt.format('DD-MM-Y hh:mm A');
    }
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
    return value;
  };
  changeStateValueHandler = (name, value) => {
    // console.log('SELECT INPUT changeStateValueHandler', name, value);
    // this.setState((state) => ({
    //   ...state,
    //   [name]: value,
    // }));
    // return {name, value};
  };
  getInput = () => {
    const state = this.state;
    const inputType = this.props.type;
    const inputName =
      typeof this.props.name !== 'undefined' ? this.props.name : 'input';
    const inputLabel =
      typeof this.props.label !== 'undefined'
        ? this.props.label
        : typeof this.props.name !== 'undefined'
        ? capitalize(this.props.name)
        : 'Input Field';

    const inputVariant =
      typeof this.props.variant !== 'undefined'
        ? this.props.variant
        : 'outlined';
    const inputSize =
      typeof this.props.size !== 'undefined' ? this.props.size : 'normal';

    const inputStyle =
      typeof this.props.style !== 'undefined'
        ? {margin: 10, ...this.props.style}
        : {margin: 10};
    const inputClasses =
      typeof this.props.className !== 'undefined' ? this.props.className : {};
    const fullWidth =
      typeof this.props.fullWidth !== 'undefined'
        ? this.props.fullWidth
        : false;
    const color =
      typeof this.props.color !== 'undefined' ? this.props.color : 'primary';

    const leftStyle =
      typeof this.props.leftStyle !== 'undefined' ? this.props.leftStyle : {};
    const leftIcon =
      typeof this.props.left !== 'undefined' ? (
        <InputAdornment position="start" style={leftStyle}>
          {this.props.left}
        </InputAdornment>
      ) : null;

    const rightStyle =
      typeof this.props.rightStyle !== 'undefined' ? this.props.rightStyle : {};
    const rightIcon =
      typeof this.props.right !== 'undefined' ? (
        <InputAdornment position="start" style={rightStyle}>
          {this.props.right}
        </InputAdornment>
      ) : null;

    const helperText =
      typeof this.props.help !== 'undefined' ? this.props.help : null;
    const placeholder =
      typeof this.props.placeholder !== 'undefined'
        ? this.props.placeholder
        : null;

    const changeHandler =
      typeof this.props.onChange !== 'undefined'
        ? this.props.onChange
        : (event) => this.changeValueHandler(inputName, event);

    const checkboxHandler =
      typeof this.props.onChange !== 'undefined'
        ? this.props.onChange
        : (event) => this.checkboxHandler(inputName, event.target.checked);

    const radioHandler =
      typeof this.props.onChange !== 'undefined'
        ? this.props.onChange
        : (event) => this.radioHandler(inputName, event);
    const selectHandler =
      typeof this.props.onChange === 'undefined'
        ? (event) => this.props.onChange(inputName, event)
        : (event) => this.changeStateValueHandler(inputName, event);

    // console.log(this.props);
    let formInput = <TextField />;
    switch (inputType) {
      case 'select':
        formInput = (
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id={inputName}>{inputLabel}</InputLabel>
            <Select
              fullWidth={true}
              id={inputName}
              name={inputName}
              value={state[inputName]}
              style={{width: 250, ...inputStyle}}
              onChange={(event) =>
                console.log('SELECT RENDER onChangeHandler', event)
              }
              label={inputLabel}
              variant="outlined"
              color={color}
              placeholder={placeholder}
              helperText={helperText}
              className={inputClasses}
              size={inputSize}
              // InputProps={}
              startAdornment={leftIcon}
              endAdornment={rightIcon}
              {...this.props}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.options &&
                this.props.options.map((o) => {
                  return (
                    <MenuItem value={Object.keys(o)[0]}>
                      {o[Object.keys(o)[0]]}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        );
        break;
      case 'checkbox':
        formInput = (
          <FormControlLabel
            control={
              <Checkbox
                id={inputName}
                name={inputName}
                checked={state[inputName]}
                color={color}
                placeholder={placeholder}
                helperText={helperText}
                style={{...inputStyle}}
                className={inputClasses}
                size={inputSize}
                onChange={checkboxHandler}
                {...this.props}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            }
            label={inputLabel}
          />
        );
        break;
      case 'radio':
        formInput = (
          <FormControl component="fieldset">
            <FormLabel component="legend">{inputLabel}</FormLabel>
            <RadioGroup
              row={this.props.column ? false : true}
              id={inputName}
              name={inputName}
              aria-label={inputName}
              onChange={radioHandler}
              value={state[inputName]}
              style={{...inputStyle}}>
              {this.props.options &&
                this.props.options.map((o) => {
                  return (
                    <FormControlLabel
                      value={Object.keys(o)[0]}
                      control={<Radio color="primary" />}
                      label={o[Object.keys(o)[0]]}
                      labelPlacement={
                        this.props.placement ? this.props.placement : 'end'
                      }
                    />
                  );
                })}
            </RadioGroup>
          </FormControl>
        );
        break;

      default:
        formInput = (
          <TextField
            id={inputName}
            name={inputName}
            label={inputLabel}
            variant={inputVariant}
            color={color}
            placeholder={placeholder}
            helperText={helperText}
            style={{...inputStyle}}
            className={inputClasses}
            size={inputSize}
            value={state[inputName]}
            InputProps={{
              startAdornment: leftIcon,
              rightIcon: leftIcon,
            }}
            onChange={changeHandler}
            {...this.props}
          />
        );
        break;
    }
    this.setState((state) => {
      return {
        ...state,
        formInput,
      };
    });
  };
  render() {
    const {classes} = this.props;
    const prps = this.props;
    const state = this.state;
    const cmpDatePicker = (
      <DatePicker
        value={
          state[prps.name] ? moment(state[prps.name], 'DD-MM-Y') : moment()
        }
        onChange={
          prps.onChange
            ? prps.onChange
            : (d) => this.dateTimeHandler(prps.name, d, prps.name)
        }
        inputVariant={prps.inputVariant}
        format={prps.format ? prps.format : 'DD-MM-Y'}
        id={prps.name}
        name={prps.name}
        label={prps.label ? prps.label : prps.name}
        variant="inline"
        color={prps.color}
        helperText={prps.helperText}
        style={{margin: 10, ...prps.inputStyle}}
        className={prps.inputClasses}
      />
    );
    const cmpTimePicker = (
      <TimePicker
        value={
          state[prps.name] ? moment(state[prps.name], 'hh:mm A') : moment()
        }
        onChange={
          prps.onChange
            ? prps.onChange
            : (d) => this.dateTimeHandler(prps.name, d, prps.name)
        }
        inputVariant={prps.inputVariant}
        format={prps.format ? prps.format : 'hh:mm A'}
        id={prps.name}
        name={prps.name}
        label={prps.label ? prps.label : prps.name}
        variant="inline"
        color={prps.color}
        helperText={prps.helperText}
        style={{margin: 10, ...prps.inputStyle}}
        className={prps.inputClasses}
      />
    );
    const cmpDateTimePicker = (
      <DateTimePicker
        value={
          state[prps.name]
            ? moment(state[prps.name], 'DD-MM-Y hh:mm A')
            : moment()
        }
        onChange={
          prps.onChange
            ? prps.onChange
            : (d) => this.dateTimeHandler(prps.name, d, prps.name)
        }
        inputVariant={prps.inputVariant}
        format={prps.format ? prps.format : 'DD-MM-Y hh:mm A'}
        id={prps.name}
        name={prps.name}
        label={prps.label ? prps.label : prps.name}
        variant="inline"
        color={prps.color}
        helperText={prps.helperText}
        style={{margin: 10, ...prps.inputStyle}}
        className={prps.inputClasses}
      />
    );
    return (
      <>
        {prps.type === 'custom'
          ? prps.component
          : prps.type !== 'date' &&
            prps.type !== 'time' &&
            prps.type !== 'datetime'
          ? state.formInput
          : prps.type === 'date'
          ? cmpDatePicker
          : prps.type === 'time'
          ? cmpTimePicker
          : prps.type === 'datetime'
          ? cmpDateTimePicker
          : null}
      </>
    );
  }
}

export default Input;
