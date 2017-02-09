import {createReducer} from "redux-immutablejs";
import {fromJS} from "immutable";
import {SET_CONFIRM_ACTION} from "../Actions/confirmModal";

const initialState = fromJS({});

export default createReducer(initialState, {
  [SET_CONFIRM_ACTION]: (state, action) => {
    return state.merge(fromJS(action.payload));
  }
});