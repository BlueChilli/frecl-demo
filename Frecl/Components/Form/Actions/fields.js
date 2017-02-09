// Constants
export const SET_INPUT = "SET_INPUT";
export const SET_INPUT_INTERACTION = "SET_INPUT_INTERACTION";
export const SET_ALL_INPUT_INTERACTIONS = "SET_ALL_INPUT_INTERACTIONS";
export const CLEAR_ALL_INPUTS = "CLEAR_ALL_INPUTS";

export function setInput(nameSpace, inputName, value) {
  return {
    type: SET_INPUT,
    nameSpace,
    inputName,
    value
  };
}

export function setInputInteraction(nameSpace, inputName, interaction, value) {
  return {
    type: SET_INPUT_INTERACTION,
    nameSpace,
    inputName,
    interaction,
    value,
  };
}

export function setAllInputInteractions(nameSpace, interaction, value) {
  return {
    type: SET_ALL_INPUT_INTERACTIONS,
    nameSpace,
    interaction,
    value
  };
}

export function clearAllInputs(nameSpace) {
  return {
    type: CLEAR_ALL_INPUTS,
    nameSpace
  }
}

export function inputValueChanged(nameSpace, inputName, value, changed) {
  return function (dispatch) {
    dispatch(setInput(nameSpace, inputName, value));
    dispatch(setInputInteraction(nameSpace, inputName, 'changed', changed));
  }
}

export function setDefaultValue(nameSpace, inputName, value) {
  return function (dispatch, getState) {
    const currentValue = getState().getIn(['FormState', nameSpace, inputName, 'value'], false);
    if (!currentValue) {
      dispatch(setInput(nameSpace, inputName, value));
    }
  }
}



