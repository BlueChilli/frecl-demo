import {DISPATCH_CONFIRM_ACTION, openConfirmModal} from "../Components/ConfirmModal/Actions/confirmModal";

export default store => next => action => {
  if (action.type === DISPATCH_CONFIRM_ACTION) {
    store.dispatch(openConfirmModal('confirmModal', action.payload));
  } else {
    next(action);
  }
};
