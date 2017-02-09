export const ADD_LIST_ITEM = "ADD_LIST_ITEM";
export const REMOVE_LIST_ITEM = "REMOVE_LIST_ITEM";
export const REMOVE_ALL_LIST_ITEMS = "REMOVE_ALL_LIST_ITEMS";

export function addListItem(component, id, template, props, userMustDelete) {
  return {
    type: ADD_LIST_ITEM,
    component,
    id,
    template,
    props,
    userMustDelete
  }
}

export function removeListItem(component, id, index) {
  return {
    type: REMOVE_LIST_ITEM,
    component,
    id,
    index
  }
}

export function removeAllListItems(component, id) {
  return {
    type: REMOVE_ALL_LIST_ITEMS,
    component,
    id
  }
}
