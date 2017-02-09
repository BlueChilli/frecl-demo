import {Map, List} from "immutable";
import {createReducer} from "redux-immutablejs";

const initialState = Map({});

export default createReducer(initialState, {
  REGISTER_PROGRESS_BUTTON: (state, action) => {
    return state.updateIn([action.payload.name, 'buttons'], List(), progressName => progressName.push(action.payload.buttonTitle));
  },
  SET_CHOSEN_PROGRESS_ITEM: (state, action) => {
    return state.setIn([action.payload.name, 'state'], action.payload.index);
  }
});