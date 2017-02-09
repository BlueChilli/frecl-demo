import {PropTypes} from "react";
import * as Recompose from "recompose";

import {getContext, mapProps, shouldUpdate, withHandlers, compose} from "recompose";
import {Map} from "immutable";
import {isUndefined} from "lodash";
import {isMultipleValueInput} from "./inputHelpers";
import createSpecificShallowEqual from "../../../Helpers/createSpecificShallowEqual"
import {ShallowCompareProps, ReactComponent} from "../../../types";
import {PerformanceWrapperContext, TextInputProps, PerformanceWrapperProps, InputProps, PerformanceWrapperWithHandlers} from "../Types/types"

const specificShallowEqual = createSpecificShallowEqual("inputInfo", "inputGroupInfo", "name", "nameSpace", "type", "id",
  "disabled", "required", "className", "defaultValue", "defaultChecked", "defaultSelected", "options", "FormState", "children");

export default<TInner, TOutter> (reactClass:ReactComponent<TInner>) => compose<TInner, TOutter>(getContext({
    nameSpace: PropTypes.string,
    FormState: PropTypes.object,
    fieldSetNameSpace: PropTypes.string
  }),
  withHandlers({
    getInputPath: ({nameSpace, name, id, fieldSetNameSpace, type}:PerformanceWrapperContext) => ():string[] => {
      if (fieldSetNameSpace !== undefined) {
        return `${fieldSetNameSpace}/${name}`.split('/');
      } else if (isMultipleValueInput(name)) {
        return `${name}/${id}`.split('/');
      } else {
        return `${name}`.split('/');
      }
    },
  }),
  mapProps((ownerProps:PerformanceWrapperWithHandlers)=> {
    const inputPath = ownerProps.getInputPath();
    const inputInfoPath = inputPath.slice(0, inputPath.length - 1);
    return {
      ...ownerProps,
      inputInfo: ownerProps.FormState.getIn([ownerProps.nameSpace, ...inputPath], Map({})),
      inputGroupInfo: inputInfoPath.length > 0 ? ownerProps.FormState.getIn([ownerProps.nameSpace, ...inputInfoPath], Map({})) : Map(),
    };
  }),
  shouldUpdate((props: PerformanceWrapperProps, nextProps: PerformanceWrapperProps) => {
    return !specificShallowEqual(props, nextProps);
  })
)(reactClass);
