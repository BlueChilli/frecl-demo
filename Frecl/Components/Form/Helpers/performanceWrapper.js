import {PropTypes} from "react";
import {getContext, compose, mapProps, shouldUpdate, withHandlers} from "recompose";
import {Map} from "immutable";
import {isUndefined} from "lodash";
import {isMultipleValueInput} from "./inputHelpers";
import createSpecificShallowEqual from "../../../Helpers/createSpecificShallowEqual"

const specificShallowEqual = createSpecificShallowEqual("inputInfo", "inputGroupInfo", "name", "nameSpace", "type", "id",
  "disabled", "required", "className", "defaultValue", "defaultChecked", "defaultSelected", "options", "FormState");


export default compose(
  getContext({
    nameSpace: PropTypes.string,
    FormState: PropTypes.object,
    fieldSetNameSpace: PropTypes.string
  }),
  withHandlers({
    getInputPath: ({nameSpace, name, id, fieldSetNameSpace, type}) => () => {
      if (fieldSetNameSpace !== undefined) {
        return `${fieldSetNameSpace}/${name}`.split('/');
      } else if (isMultipleValueInput(name)) {
        return `${name}/${id}`.split('/');
      } else {
        return `${name}`.split('/');
      }
    },
  }),
  mapProps(ownerProps => {
    const inputPath = ownerProps.getInputPath();
    const inputInfoPath = inputPath.slice(0, inputPath.length - 1);
    return {
      ...ownerProps,
      inputInfo: ownerProps.FormState.getIn([ownerProps.nameSpace, ...inputPath], Map({})),
      inputGroupInfo: inputInfoPath.length > 0 ? ownerProps.FormState.getIn([ownerProps.nameSpace, ...inputInfoPath], Map({})) : Map(),
    };
  }),
  shouldUpdate((props, nextProps) => {
    return !specificShallowEqual(props, nextProps);
  })
);
