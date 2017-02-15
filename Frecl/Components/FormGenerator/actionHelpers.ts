import {Map} from "immutable"
import {Dispatch} from "react-redux"
import {getFirstPath} from "../CrudHelpers/Helpers/stateHelpers";
import {createNotification} from "../../Actions/Notification";
import {apiResponseDataMap, BaseAction, PostAction, api, apiRequestDataMap, apiPathArgs} from "../../types"

const getPostActionType = (data, stateName:string):string => {
  if (data.has('id')) {
    return `POST_SINGLE_${stateName}`;
  } else {
    return `POST_${stateName}`;
  }
};

const getPostAction = (actionType:string, stateName:string, promise:Promise<apiResponseDataMap>):PostAction => {
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

export const dispatchPostAction = (dispatch:Dispatch<BaseAction>, api:api, data:apiRequestDataMap, params:Object, pathArgs:apiPathArgs) => (stateName:string):Promise<apiResponseDataMap> => {
  return api(data, params, pathArgs).then(({data}) => {
    const actionType = getPostActionType(data, stateName);
    dispatch(getPostAction(actionType, stateName, Promise.resolve(data)));
    return data;
  }).catch(err => {
    const actionType = getPostActionType(err.data, stateName);
    dispatch(createNotification('failure', actionType, err.data));
    dispatch(getPostAction(actionType, stateName, Promise.reject(err.data)));
    return Promise.reject(err);
  })
};