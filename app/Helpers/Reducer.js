import {isError} from "lodash";
import {Iterable} from "immutable";

const normaliseErrorMessage = (payload) => {
  if (Iterable.isIterable(payload)) {
    if (payload.has('errors')) {
      return payload.get('errors');
    } else {
      return payload.get('message');
    }
  } else if (payload) {
    if (payload.errors) {
      return payload.errors;
    } else {
      return payload.message;
    }
  }
};


export const getErrorMessage = ({payload}) => {
  return isError(payload) ? normaliseErrorMessage(payload) : Iterable.isIterable(payload) ?
    normaliseErrorMessage(payload) : normaliseErrorMessage(payload.data);
};