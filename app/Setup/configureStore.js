import {createStore, compose, applyMiddleware} from "redux";
import {push} from "react-router-redux";
import {List} from "immutable";
import promiseMiddleware from "redux-promise-middleware";
import asyncActionSuffixes from "../Constants/asyncActionSuffix";
import thunk from "redux-thunk";
import rootReducer from "../Reducers/index.js";
import localStorage from "./localStorage";
import {routerMiddleware} from "react-router-redux";
import httpResponseHandler from "../../Frecl/middlewares/http-response-handler";
import notificationState from "../Middleware/notificationState";
import confirmAction from "../Middleware/confirmAction";
import {canUseDOM} from '../../Frecl/Helpers/canUseDOM';

const errorLogging = () => next => action => {
  try {
    next(action);
  } catch (err) {
    Raygun.send(err);
    throw err;
  }
};

export default (initialState, history) => {

  const promise = promiseMiddleware({
    promiseTypeSuffixes: asyncActionSuffixes
  });

  const responseHandler = httpResponseHandler((res, next, store, action) => {
    if (res.get('status') === 401) {
      store.dispatch(push(LOGIN_URL));
    } else {
      next(action)
    }
  });

  let createStoreWithMiddleware;
  const configureMiddleware = () => applyMiddleware(routerMiddleware(history), errorLogging, responseHandler, confirmAction, promise, thunk, notificationState);

  if (canUseDOM) {
    createStoreWithMiddleware = compose(
      configureMiddleware(),
      localStorage(),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);
  } else {
    createStoreWithMiddleware = compose(
      configureMiddleware()
    )(createStore);
  }

  return createStoreWithMiddleware(rootReducer, initialState);
};
