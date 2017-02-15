import {Map, List} from "immutable";
import {createReducer} from "redux-immutablejs";

const initialState = Map({});

export default createReducer(initialState, {
  REGISTER_PROGRESS_BUTTON: (state, {payload}) => {
    return state.updateIn([payload.name, 'buttons'], List(), (progress) => progress.push(Map({
        buttonTitle: payload.buttonTitle,
        id: payload.id
      }))
    );
  },
  SET_CHOSEN_PROGRESS_ITEM: (state, {payload}) => {
    return state.setIn([payload.name, 'state'], payload.index);
  },
  CLEAR_PROGRESS_STATE: (state, {payload}) => {
    return state.set(payload.name, Map({}));
  },
  CLEAR_PROGRESS_BUTTON_STATE: (state, {payload}) => {
    return state.setIn([payload.name, 'buttons'], List());
  }
});