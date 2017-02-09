export const RESET_NOTIFICATION_STATE = "RESET_NOTIFICATION_STATE";

export const startSpinner = (formName) => {
  return {
    type: 'START_BUTTON_SPINNER_STATE',
    payload: formName,
  }
};

export const endSpinner = (formName) => {
  return {
    type: 'END_BUTTON_SPINNER_STATE',
    payload: formName,
  }
};
