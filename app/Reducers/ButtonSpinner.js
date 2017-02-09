import {Map} from "immutable";
import {createReducer} from "redux-immutablejs";

const initialState = Map({});

export default createReducer(initialState, {
  START_BUTTON_SPINNER_STATE: (state, {payload}) => {
    return state.set(payload, 'spinning');
  },
  END_BUTTON_SPINNER_STATE: (state, {payload}) => {
    return state.set(payload, "expired");
  }
});