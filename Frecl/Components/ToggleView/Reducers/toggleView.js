import {Map, List} from "immutable";
import {createReducer} from "redux-immutablejs";
import {SET_TOGGLE_VIEW} from "../Actions/toggleView";

const initialState = Map({});

export default createReducer(initialState, {
  [SET_TOGGLE_VIEW]: (state, action) => {
    return state.setIn([action.component, action.id], action.visible);
  }
});

