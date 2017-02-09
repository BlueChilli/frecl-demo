import {createReducer} from "redux-immutablejs";
import {Map} from "immutable";

const initialState = Map({
    error: null
});

export default createReducer(initialState, {
    SET_ERROR : (state, action) => {
        return state.set('error', action.payload);
    }
});