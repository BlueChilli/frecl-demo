export const SET_TOGGLE_VIEW = "SET_TOGGLE_VIEW";

export function setToggleView(component, id, visible) {
  return {
    type: SET_TOGGLE_VIEW,
    component,
    id,
    visible
  }
}

export function toggleToggleView(component, id) {
  return (dispatch, getState) => {
    const visible = getState().getIn(['ToggleViewState', component, id], false);
    dispatch(setToggleView(component, id, !visible));
  }
}