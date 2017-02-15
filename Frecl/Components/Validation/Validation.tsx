import React, {PropTypes} from "react";
import {withProps, mapProps, shouldUpdate, ComponentEnhancer, InferableComponentEnhancer, compose, withState, withHandlers, lifecycle} from "recompose";
import classnames from "classnames";
import {testValidation} from "../../Helpers/validate";
import "./Validation.scss";
import {isMultipleValueInput} from "../Form/Helpers/inputHelpers";
import createSpecificShallowEqual from "../../Helpers/createSpecificShallowEqual"
import {ValidationAdditionProps, TextInputProps} from "../Form/Types/types"
import {ReactComponent, ShallowCompare} from "../../types"

const specificShallowEqual = createSpecificShallowEqual('value', 'changed', 'type');
const specificShallowEqualDisplayed = createSpecificShallowEqual('displayed');
const specificShallowEqualTestElement = createSpecificShallowEqual("value", "typeOfValidation", "type");


interface ValidationInternalProps {
  displayed: boolean,
  className: string,
  children: any
}

interface ValidationInternalAdditionProps extends ValidationAdditionProps{
  value:any,
  valid: boolean
}

interface ValidationMapProps extends ValidationAdditionProps{
  changed:boolean,
  value:ShallowCompare
}

interface ValidationWithStateProps extends ValidationMapProps{
  valid: boolean,
  setValid: (boolean) => undefined
}

interface ValidationComponentProps {
  isFor: string
}


const Validation = ({displayed, className, children}:ValidationInternalProps) => {
  const classes = classnames('validation', className, {
    'invalid': displayed
  });
  return <div className={classes}>{children}</div>;
};


export default compose<ValidationInternalProps, ValidationComponentProps>(
  withProps((ownerProps : ValidationAdditionProps) => {
    const {name, inputInfo, inputGroupInfo, type} = ownerProps;
    const changed:boolean = isMultipleValueInput(name) ? inputGroupInfo.some(item => item.get('changed', false)) : inputInfo.get('changed', false);
    const value:ShallowCompare = isMultipleValueInput(name) ? inputGroupInfo : inputInfo.get('value');
    return {
      changed,
      value
    }
  }), shouldUpdate((currentProps, nextProps) => {
    return !specificShallowEqual(currentProps, nextProps);
  }),
  withState('valid', 'setValid', false),
  withHandlers({
    testElement: () => ({value, test, typeOfValidation, type, setValid}: ValidationWithStateProps) => {
      if (test === false || test === 'false') {
        return setValid(true);
      } else if (typeOfValidation !== 'customValidation') {
        return setValid(testValidation(value, test, typeOfValidation, type));
      } else {
        if (typeof test === "function") {
          const customValidation = test(value);
          if (typeof customValidation === "boolean" || customValidation === "undefined") {
            return setValid(!!customValidation);
          } else if (customValidation instanceof Promise){
            customValidation.then(res => setValid(!!res)).catch(res => setValid(!!res));
            return setValid(true);
          } else {
            return console.error("Custom validation functions must return a bool, undefined or a promise");
          }
        } 
        return setValid(false);
      }
    }
  }),
  lifecycle({
    componentWillMount(){
      const {testElement} = this.props;
      testElement(this.props);
    }, 
    componentWillReceiveProps(nextProps){
      if(!specificShallowEqualTestElement(this.props, nextProps)){
        nextProps.testElement(nextProps);
      }
    }
  }),
  mapProps((ownerProps:ValidationWithStateProps) => {
    const {valid, value, test, typeOfValidation, type, className, changed, children} = ownerProps;
    return {
      displayed: !valid && changed,
      className,
      children
    }
  }), shouldUpdate((currentProps:ValidationInternalProps, nextProps:ValidationInternalProps) => {
    return !specificShallowEqualDisplayed(currentProps, nextProps);
  })
)(Validation);