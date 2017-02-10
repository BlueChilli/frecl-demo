import React, {PropTypes} from "react";
import {compose, setPropTypes, mapProps, getContext, withHandlers, lifecycle, withProps} from "recompose";
import {inputValueChanged, setInputInteraction} from "../Actions/fields";
import {isMultipleValueInput, returnDefinedValue} from "./inputHelpers";
import {isUndefined, isEqual, pick} from "lodash";
import {Iterable} from "immutable"
import createSpecificShallowEqual from "../../../Helpers/createSpecificShallowEqual"
import {InputProps, InputInfoProps, InputHOCInitialProps, InputHOCWithHandlersProps, InputHOCContextProps, InputHOCMapProps} from "../Types/types"
import {ReactComponent, ShallowCompare} from "../../../types";

const specificShallowEqual = createSpecificShallowEqual("defaultValue");


export const InputSetup = {
  componentWillMount() {
    this.props.inputChanged(this.props.value, false);
  },

  componentWillReceiveProps(nextProps:InputHOCWithHandlersProps){
    if (!specificShallowEqual(nextProps, this.props)) {
      nextProps.inputChanged(nextProps.defaultValue, false);
    }
    if (!nextProps.FormState.hasIn([nextProps.nameSpace, ...nextProps.inputPath])) {
      nextProps.inputChanged(nextProps.value, false);
    }
  }
};

const getUnsetValue = ({type}:{type?:string}):boolean | string  => {
  if (type === 'radio' || type === 'checkbox') {
    return false;
  } else {
    return '';
  }
};


// TODO: Remove defaultChecked and defaultSelected logic. Move to components below
export default <TInner, TOutter> (reactClass:ReactComponent<TInner>) => compose<TInner, TOutter>(
  getContext({
    dispatch: PropTypes.func
  }),
  mapProps(({inputInfo, defaultValue, defaultChecked, defaultSelected, getInputPath, ...props} : InputHOCContextProps) => {
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
    inputChanged: ({dispatch, nameSpace, inputPath, name}:InputHOCMapProps) => (value, changed = true) => {
      dispatch(inputValueChanged(nameSpace, inputPath, value, changed));
    },
    setInputBlurred: ({dispatch, nameSpace, inputPath}:InputHOCMapProps) => () => {
      dispatch(setInputInteraction(nameSpace, inputPath, 'blurred', true));
    },
    getAttributes: ({children, className, defaultValue, defaultChecked, defaultSelected, value, ...props}:InputHOCMapProps) => () => {
      const reactProps = Object.assign({}, props, {
        ref: props.name,
        value
      });

      const safeProps = pick(reactProps, "id", "autoFocus", "required", "name", "type", "value");
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
)(reactClass);