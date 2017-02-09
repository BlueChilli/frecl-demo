import {createDispatchGetAction} from "../Helpers/actionHelpers";

export const getData = (stateName, api, params, pathArgs) => {
  return dispatch => {
    createDispatchGetAction(dispatch, api, null, params, pathArgs)(stateName);
  }
};
