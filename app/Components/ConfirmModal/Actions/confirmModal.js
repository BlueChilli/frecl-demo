import {toggleModal} from "../../../../Frecl/exports";
export const SET_CONFIRM_ACTION = "SET_CONFIRM_ACTION";
export const DISPATCH_CONFIRM_ACTION = "DISPATCH_CONFIRM_ACTION";

export const confirmAction = (actionToConfirm, confirm, ...args) => {
  return {
    type: DISPATCH_CONFIRM_ACTION,
    payload: {
      func: actionToConfirm,
      confirm,
      args
    }
  }
};

const setConfirmAction = confirmPayload => {
  return {
    type: SET_CONFIRM_ACTION,
    payload: confirmPayload
  }
};

export const fireConfirmAction = (confirmModalId) => {
  return (dispatch, getState) => {
    const confirmAction = getState().getIn(['ConfirmState']);
    dispatch(toggleModal(confirmModalId));
    const args = confirmAction.get('args').toJS();
    const func = confirmAction.get('func');
    dispatch(func.apply(this, args));
  }
};

export const openConfirmModal = (confirmModalId, confirmPayload) => {
  return dispatch => {
    dispatch(toggleModal(confirmModalId));
    dispatch(setConfirmAction(confirmPayload));
  }
};
