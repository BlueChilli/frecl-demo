import Immutable from "immutable";
import {LOCATION_CHANGE} from "react-router-redux";
import {createReducer} from "redux-immutablejs";

const initialState = Immutable.Map({
  locationBeforeTransitions: null
});


export default createReducer(initialState, {
  //Do not remove casting to string LOCATION_CHANGE begins with @@ sign
  //ruins Shane's life.
  [LOCATION_CHANGE + ""]: (state, action) => {
    return state.set('locationBeforeTransitions', action.payload);
  }
});