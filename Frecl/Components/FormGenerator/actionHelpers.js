import {getFirstPath} from "../CrudHelpers/Helpers/stateHelpers";
import {createNotification} from "../../../app/Actions/Notification";

const getPostActionType = (data, stateName) => {
  if (data.has('id')) {
    return `POST_SINGLE_${stateName}`;
  } else {
    return `POST_${stateName}`;
  }
};

const getPostAction = (actionType, stateName, promise) => {
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

export const dispatchPostAction = (dispatch, api, ...apiArgs) => (stateName) => {
  return api(...apiArgs).then(({data}) => {
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