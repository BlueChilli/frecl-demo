import {getFirstPath} from "../CrudHelpers/Helpers/stateHelpers";
import {createNotification} from "../../../app/Actions/Notification";
import {startSpinner, endSpinner} from "../../../app/Actions/ButtonSpinner";

import {apiRequestDataMap, apiResponseDataMap, api} from "../../types"

export type OnSubmitSuccess = (apiResponseDataMap, apiRequestDataMap) => undefined;

const getActionType = (data, stateName:string) => {
  if (data.has('id')) {
    return `POST_SINGLE_${stateName}`;
  } else {
    return `POST_${stateName}`;
  }
};

const getAction = (actionType:string, stateName:string, promise) => {
  return {
    type: actionType,
    payload: {
      promise,
    },
    meta: {
      stateName: getFirstPath(stateName)
    }
  };
};

export const submitGeneratedForm = (formName:string, formData:apiRequestDataMap, api:api, apiType, stateName:string, onSubmitSuccess:OnSubmitSuccess, onSubmitError:OnSubmitSuccess) => {
  return dispatch => {
    dispatch(startSpinner(formName));
    api(formData).then(({data}) => {
      const actionType = getActionType(data, stateName);
      dispatch(getAction(actionType, stateName, Promise.resolve(data)));
      dispatch(endSpinner(formName));
      return data;
    }).catch(err => {
      const actionType = getActionType(err.data, stateName);
      dispatch(getAction(actionType, stateName, Promise.reject(err.data)));
      dispatch(createNotification('failure', actionType, err.data));
      dispatch(endSpinner(formName));
      return Promise.reject(err);
    }).then((data) => {
      if (onSubmitSuccess) {
        onSubmitSuccess(data, formData);
      }
      return data;
    }).catch((err) => {
      if (onSubmitError) {
        onSubmitError(err, formData);
      }
      return Promise.reject(err);
    });
  }
};
