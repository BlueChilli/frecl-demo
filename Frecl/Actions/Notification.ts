import {Map} from "immutable";
export const RESET_NOTIFICATION_STATE = "RESET_NOTIFICATION_STATE";

export const createNotification = (status:string, forActionType:string, actionPayload, timeout:number = 5000) => {
  return {
    type: 'NOTIFICATION_STATE',
    payload: {
      status,
      forActionType,
      actionPayload
    },
    meta: {
      timeout
    }
  }
};

export const createEasyNotification = (status, message, timeout = 5000) => {
  const forActionType = Math.random().toString(36).substring(7) + "_ACTION";
  return {
    type: 'NOTIFICATION_STATE',
    payload: {
      status,
      forActionType,
      actionPayload: Map({
        message
      })
    },
    meta: {
      timeout
    }
  }
};


export const resetNotificationState = (stateName) => {
  return {
    type: RESET_NOTIFICATION_STATE,
    payload: true,
    meta: {
      stateName
    }
  }
};