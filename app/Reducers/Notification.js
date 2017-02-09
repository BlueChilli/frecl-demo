import {Map} from "immutable";
import {createReducer} from "redux-immutablejs";
import {RESET_NOTIFICATION_STATE} from "../Actions/Notification";

const initialState = Map({});

const defaultNotificationState = Map({
  status: "default",
  messages: ""
});


export default createReducer(initialState, {
  NOTIFICATION_STATE: (state, action) => {
    const {payload: {forActionType, ...rest}} = action;
    return state.set(forActionType, Map(rest));
  },

  [RESET_NOTIFICATION_STATE]: (state, action) => {
    const {stateName} = action.meta;
    return state.set(stateName, defaultNotificationState);
  }
});