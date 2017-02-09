import {has} from "lodash";


function createTimeoutControl() {
  let timeoutObj = {};
  return {
    clearTimeout: (stateName) => {
      if (timeoutObj.hasOwnProperty(stateName) && timeoutObj[stateName] !== false) {
        clearTimeout(timeoutObj[stateName]);
        timeoutObj[stateName] = false;
      }
    },
    addTimeout: (stateName, timeoutId) => {
      timeoutObj[stateName] = timeoutId;
    }
  }
}

const timeoutControl = createTimeoutControl();

export default store => next => action => {
  next(action);

  const {type, payload, meta} = action;
  if (type === 'NOTIFICATION_STATE' && payload.status !== 'expired') {
    const timeoutID = setTimeout(store.dispatch, meta.timeout, {
      type: "NOTIFICATION_STATE",
      payload: {
        forActionType: payload.forActionType,
        status: 'expired'
      },
    });
    timeoutControl.clearTimeout(type);
    timeoutControl.addTimeout(type, timeoutID);
  }
};
