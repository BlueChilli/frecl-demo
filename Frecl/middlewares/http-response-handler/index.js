import {Iterable} from "immutable";

const isHttpErrorResponse = (res) => {
  if (Iterable.isIterable(res)) {
    return res.get('status', 0) >= 400;
  }
  return false;
};

export default (httpErrorStatusHandler) => {
  if (typeof httpErrorStatusHandler === 'undefined' || typeof httpErrorStatusHandler !== 'function') {
    console.error('you must provide http status handlers for http response eg {(res,dispatch, getState) => { handle any error response }}');
    httpErrorStatusHandler = (res) => {
      console.warn("Error Response =>", res);
    };
  }
  return store => next => action => {
    const {payload} = action;
    if (action && payload && isHttpErrorResponse(payload)) {
      httpErrorStatusHandler(payload, next, store, action);
    } else {
      return next(action);
    }
  }
}
