import {Map, fromJS} from "immutable";
import {useRouterHistory} from "react-router";
import {createHistory} from 'history'
import {syncHistoryWithStore} from "react-router-redux";
import configureStore from "./configureStore.js";

const appHistory = useRouterHistory(createHistory)({
  basename: BASE_NAME
});


const initialState = window.__INITIAL_STATE__ ? fromJS(window.__INITIAL_STATE__) : Map();

export const store = configureStore(initialState, appHistory);

export const history = syncHistoryWithStore(appHistory, store, {
  selectLocationState: state => {
    return state.get('routing').toJS()
  }
});

