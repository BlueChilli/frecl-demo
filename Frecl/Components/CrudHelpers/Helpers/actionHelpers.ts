import {getFirstPath} from "../Helpers/stateHelpers"
import {Iterable} from "immutable";
import {api, apiPathArgs, apiResponseDataMap, apiRequestDataMap} from "../../../types";
import {Dispatch, Action} from "redux";

interface getAction extends Action {
  type: string;
  payload: {
      promise: Promise<any>;
  };
  meta: {
      stateName: string;
  };
}

const getActionType = (data:apiResponseDataMap, stateName:string) => {
  if(Iterable.isIterable(data)){
    if (data.has('data')) {
      return `GET_PAGINATED_${stateName}`
    } else if (data.has('id')) {
      return `GET_SINGLE_${stateName}`;
    } 
  }
  return `GET_${stateName}`;
};


const createAction = (responseData:apiResponseDataMap, stateName:string, promise:Promise<any>) => {
  return {
    type: getActionType(responseData, stateName),
    payload: {
      promise
    },
    meta: {
      stateName: getFirstPath(stateName)
    }
  };
};

export const createDispatchGetAction = (dispatch:Dispatch<Action>, api:api, data:apiRequestDataMap, params:Object, pathArgs:apiPathArgs) => (stateName:string):Promise<apiResponseDataMap> => {
  return api(data, params, pathArgs).then(({data : responseData}) => {
    dispatch(createAction(responseData, stateName, Promise.resolve(responseData)));
    return responseData;
  }).catch(({data : errorData}) => {
    dispatch(createAction(errorData, stateName, Promise.reject(errorData)));
    return Promise.reject(errorData);
  })
};
