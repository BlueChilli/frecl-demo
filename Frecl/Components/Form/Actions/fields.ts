// Constants
export const SET_INPUT = "SET_INPUT";
export const SET_INPUT_INTERACTION = "SET_INPUT_INTERACTION";
export const SET_ALL_INPUT_INTERACTIONS = "SET_ALL_INPUT_INTERACTIONS";
export const CLEAR_ALL_INPUTS = "CLEAR_ALL_INPUTS";
import {ShallowCompare} from "../../../types"

export function setInput(nameSpace: string, inputName:string[], value:ShallowCompare) {
  return {
    type: SET_INPUT,
    nameSpace,
    inputName,
    value
  };
}

export function setInputInteraction(nameSpace:string, inputName:string[], interaction:string, value:boolean) {
  return {
    type: SET_INPUT_INTERACTION,
    nameSpace,
    inputName,
    interaction,
    value,
  };
}

export function setAllInputInteractions(nameSpace:string, interaction:string, value:boolean) {
  return {
    type: SET_ALL_INPUT_INTERACTIONS,
    nameSpace,
    interaction,
    value
  };
}

export function clearAllInputs(nameSpace:string) {
  return {
    type: CLEAR_ALL_INPUTS,
    nameSpace
  }
}

export function inputValueChanged(nameSpace:string, inputName:string[], value:ShallowCompare, changed:boolean) {
  return function (dispatch) {
    dispatch(setInput(nameSpace, inputName, value));
    dispatch(setInputInteraction(nameSpace, inputName, 'changed', changed));
  }
}

export function setDefaultValue(nameSpace:string, inputName:string[], value:ShallowCompare) {
  return function (dispatch, getState) {
    const currentValue = getState().getIn(['FormState', nameSpace, inputName, 'value'], false);
    if (!currentValue) {
      dispatch(setInput(nameSpace, inputName, value));
    }
  }
}



