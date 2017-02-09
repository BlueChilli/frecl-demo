import React, {PropTypes} from "react";
import {compose, setPropTypes, mapProps, getContext, withHandlers, lifecycle} from "recompose";
import {inputValueChanged, setInputInteraction} from "../Actions/fields";
import {isMultipleValueInput, returnDefinedValue} from "./inputHelpers";
import {isUndefined, isEqual} from "lodash";
import Iterable from "immutable"
import createSpecificShallowEqual from "../../../Helpers/createSpecificShallowEqual"

const specificShallowEqual = createSpecificShallowEqual("defaultValue");

export const InputSetup = {
  componentWillMount() {
    this.props.inputChanged(this.props.value, false);
  },

  componentWillReceiveProps(nextProps){
    if (!specificShallowEqual(nextProps, this.props)) {
      nextProps.inputChanged(nextProps.defaultValue, false)
    }
    if (!nextProps.FormState.hasIn([nextProps.nameSpace, ...nextProps.inputPath])) {
      nextProps.inputChanged(nextProps.value, false);
    }
  }
};


const getUnsetValue = ({type}) => {
  if (type === 'radio' || type === 'checkbox') {
    return false;
  } else {
    return '';
  }
};

export default compose(
  setPropTypes({
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
      PropTypes.instanceOf(Iterable)
    ]),
    id: (props, propName, componentName) => {
      if (isMultipleValueInput(props.name) && props[propName] === undefined) {
        return new Error(componentName + " components with multiple values (name[]) enabled must have an accompanying ID");
      }
    },
    value: (props, propName, componentName) => {
      if (!isUndefined(props.value)) {
        return new Error(componentName + " value is not supported use defaultValue instead");
      }
    }
  }),
  getContext({
    dispatch: PropTypes.func
  }),
  mapProps(({inputInfo, defaultValue, defaultChecked, defaultSelected, getInputPath, ...props}) => {
    const allInputsDefaultValue = returnDefinedValue(defaultValue, defaultChecked, defaultSelected);
    const value = returnDefinedValue(inputInfo.get('value'), props.value, allInputsDefaultValue, getUnsetValue(props));
    return {
      ...props,
      defaultValue: allInputsDefaultValue,
      inputPath: getInputPath(),
      value
    };
  }),
  withHandlers({
    inputChanged: ({dispatch, nameSpace, inputPath, name}) => (value, changed = true) => {
      dispatch(inputValueChanged(nameSpace, inputPath, value, changed));
    },
    inputInteraction: ({dispatch, nameSpace, inputPath}) => () => {
      dispatch(setInputInteraction(nameSpace, inputPath, 'blurred', true));
    },
    getAttributes: ({children, className, defaultValue, defaultChecked, defaultSelected, value, ...props}) => () => {
      const reactProps = Object.assign({}, props, {
        ref: props.name,
        value
      });
      const {
        customValidation, nameSpace, FormState, inputGroupInfo, dispatch, onUpdateState, labelFor,
        options, component, fieldSetNameSpace, inputPath, files, ...safeProps
      } = reactProps;
      if (props.type === 'checkbox' || props.type === 'radio') {
        if (props.type === 'radio') {
          return Object.assign({}, safeProps, {
            checked: props.id + "" === value + ""
          });
        } else {
          return Object.assign({}, safeProps, {
            checked: value
          });
        }
      }
      return safeProps;
    }
  }),
  lifecycle(InputSetup)
);