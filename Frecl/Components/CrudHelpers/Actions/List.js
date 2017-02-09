import {Map} from "immutable";
import {flow} from "lodash"
import {splitPath, getTopStatePath, getFirstPath} from "../Helpers/stateHelpers";


export const setEditListItem = (stateName, apiType, id) => {
  return {
    type: `SET_${stateName}_EDIT_LIST_ITEM`,
    payload: id,
    meta: {
      stateName: getFirstPath(stateName)
    }
  }
};

export const resetEditListItem = (stateName) => {
  return {
    type: `RESET_${stateName}_EDIT_LIST_ITEM`
  }
};

export const deleteListItem = (stateName, apiType, id, api) => {
  return {
    type: `DELETE_${stateName}`,
    payload: {
      promise: api(null, null, Map({id})).then(res => {
        return id;
      })
    },
    meta: {
      stateName: getFirstPath(stateName)
    }
  }
};

export const getNextPage = (stateName, pathname) => {
  return (dispatch, getState) => {
    const paginationDetails = getState().getIn([getTopStatePath(stateName), ...splitPath(pathname)], Map({}));
    const currentPage = paginationDetails.get('currentPage');
    const pageCount = paginationDetails.get('pageCount');
    if (currentPage < pageCount) {
      dispatch(getList(stateName, pathname, currentPage + 1))
    }
  }
};
