import {createDispatchGetAction} from "../Helpers/actionHelpers";
import {api, apiPathArgs} from "../../../types";

export const getData = (stateName:string, api:api, params:Object, pathArgs:apiPathArgs) => {
  return dispatch => {
    createDispatchGetAction(dispatch, api, null, params, pathArgs)(stateName);
  }
};
