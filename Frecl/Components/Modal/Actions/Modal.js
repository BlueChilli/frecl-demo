import {toggleToggleView} from "../../ToggleView/ToggleView.jsx";
import {COMPONENT_NAME} from "../Modal.jsx";

export function toggleModal(id) {
  return function (dispatch) {
    dispatch(toggleToggleView(COMPONENT_NAME, id))
  }
}