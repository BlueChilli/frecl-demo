import {getFirstPath} from "../Helpers/stateHelpers"
import {Iterable} from "immutable";

const getActionType = (data, stateName) => {
  if(Iterable.isIterable(data)){
    if (data.has('data')) {
      return `GET_PAGINATED_${stateName}`
    } else if (data.has('id')) {
      return `GET_SINGLE_${stateName}`;
    } 
  }
  return `GET_${stateName}`;
};


const createAction = (data, stateName, promise) => {
  return {
    type: getActionType(data, stateName),
    payload: {
      promise
    },
    meta: {
      stateName: getFirstPath(stateName)
    }
  };
};

export const createDispatchGetAction = (dispatch, api, ...apiArgs) => (stateName) => {
  return api(...apiArgs).then(({data}) => {
    dispatch(createAction(data, stateName, Promise.resolve(data)));
    return data;
  }).catch(({data}) => {
    dispatch(createAction(data, stateName, Promise.reject(data)));
    return Promise.reject(data);
  })
};
