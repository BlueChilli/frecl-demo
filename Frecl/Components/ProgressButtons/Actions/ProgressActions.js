export const registerProgressButton = (name, buttonTitle) => {
  return {
    type: "REGISTER_PROGRESS_BUTTON",
    payload: {
      name,
      buttonTitle
    }
  }
}

export const setChosenProgressItem = (name, index) => {
  return {
    type: "SET_CHOSEN_PROGRESS_ITEM",
    payload: {
      name, 
      index
    }
  }
}

// this type of reducer receives the whole state of the application as a parameter
// call setChosenProgressItem to update the state --> include in rapid reports
export const proceedToNextStep = () => {
  return (dispatch, getState) => {
  
  }
}