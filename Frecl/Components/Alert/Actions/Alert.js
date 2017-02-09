import {addListItem, removeAllListItems} from "../../ListView/Actions/ListView";
import AlertItem from "../AlertItem.jsx";
import React from "react";
import {COMPONENT_NAME} from "../Alert.jsx";

export function addAlertItem(id, header, body, type, userMustDelete) {
  return function (dispatch) {
    dispatch(
      addListItem(COMPONENT_NAME, id, AlertItem, {
        header,
        body,
        type
      }, userMustDelete));
  }
}

export function removeAllAlertItems(id) {
  return function (dispatch) {
    dispatch(
      removeAllListItems(COMPONENT_NAME, id)
    );
  }
}

