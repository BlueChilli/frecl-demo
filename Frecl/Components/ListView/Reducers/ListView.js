import {Map, List} from "immutable";
import {createReducer} from "redux-immutablejs";

function getListItemPath(action) {
  const defaultPath = List([action.component, action.id]);
  if (action.index !== undefined) {
    return defaultPath.push(action.index);
  }
  return defaultPath;
}


export default createReducer(Map({}), {
  ADD_LIST_ITEM: (state, action) => {
    const listViewsPath = getListItemPath(action);
    const listItems = state.getIn(listViewsPath, List([]));
    return state.setIn(
      listViewsPath,
      listItems.push(Map({
        template: action.template,
        userMustDelete: action.userMustDelete || false,
        props: action.props
      })));
  },
  REMOVE_LIST_ITEM: (state, action) => {
    return state.deleteIn(getListItemPath(action));
  },
  REMOVE_ALL_LIST_ITEMS: (state, action) => {
    const listViewsPath = getListItemPath(action);
    const listViews = state.getIn(listViewsPath, List([]));
    const newListViews = listViews.filter(listView => listView.get('userMustDelete'));
    return state.setIn(listViewsPath, newListViews);
  }
});

