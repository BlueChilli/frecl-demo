import React, {PropTypes} from "react";
import {compose} from 'redux';
import {mapProps, shouldUpdate} from "recompose";
import classnames from "classnames";
import {testValidation} from "../../Helpers/validate";
import "./Validation.scss";
import {isMultipleValueInput} from "../Form/Helpers/inputHelpers";
import createSpecificShallowEqual from "../../Helpers/createSpecificShallowEqual"

const specificShallowEqual = createSpecificShallowEqual('value', 'changed', 'type');
const specificShallowEqualDisplayed = createSpecificShallowEqual('displayed');

const Validation = ({displayed, className, children}) => {
  const classes = classnames('validation', className, {
    'invalid': displayed
  });
  return <div className={classes}>{children}</div>;
};

const testElement = (value, test, typeOfValidation, type) => {
  if (test === false || test === 'false') {
    return true;
  } else if (typeOfValidation !== 'customValidation') {
    return testValidation(value, test, typeOfValidation, type);
  } else {
    if (typeof test === "function") {
      const customValidation = test(value);
      if (typeof customValidation === "boolean") {
        return customValidation;
      } else if (typeof customValidation === "undefined") {
        return false;
      } else {
        return console.error("Custom validation must return a bool");
      }
    }
    return false;
  }
};

export default compose(
  mapProps(ownerProps => {
    const {name, inputInfo, inputGroupInfo, type} = ownerProps;
    const changed = isMultipleValueInput(name) ? inputGroupInfo.some(value => value.get('changed')) : inputInfo.get('changed');
    const value = isMultipleValueInput(name) ? inputGroupInfo : inputInfo.get('value');
    return {
      ...ownerProps,
      changed,
      value
    }
  }), shouldUpdate((currentProps, nextProps) => {
    return !specificShallowEqual(currentProps, nextProps);
  }), mapProps(ownerProps => {
    const {value, test, typeOfValidation, type, className, changed, children} = ownerProps;
    const valid = testElement(value, test, typeOfValidation, type);
    return {
      displayed: !valid && changed,
      className,
      children
    }
  }), shouldUpdate((currentProps, nextProps) => {
    return !specificShallowEqualDisplayed(currentProps, nextProps);
  })
)(Validation);
