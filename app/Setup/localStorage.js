import persistState from "redux-localstorage";
import {Map, fromJS} from "immutable";
import LOCAL_STORAGE from "../Constants/LOCAL_STORAGE";
import {getConstant} from "../../Frecl/Helpers/environment";

function whiteListLooper(items, index, state, whiteListState = Map()) {

  if (!items || items.size === 0) {
    return whiteListState;
  }

  const currentItem = items.get(index);
  const updatedState = whiteListState.mergeIn(currentItem, state.getIn(currentItem));
  if (index < items.count() - 1) {
    return whiteListLooper(items, index + 1, state, updatedState);
  }
  return updatedState;
}

export default function () {
  return persistState(getConstant(LOCAL_STORAGE), {
    slicer: paths => {
      return state => {
        return whiteListLooper(paths, 0, state);
      }
    },
    deserialize: serializedData => {

      if (serializedData) {
        return fromJS(JSON.parse(serializedData));
      }

      return Map();

    },
    merge: (initialState, persistedState) => {
      if (persistedState) {
        return persistedState.merge(initialState);
      }
      else {
        return initialState;
      }
    }
  })
};
