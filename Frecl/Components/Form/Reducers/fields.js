import {Map} from "immutable";
import {createReducer} from "redux-immutablejs";
import {getInputValue, getInputState} from "../Helpers/path";
import {isMultipleValueInput} from "../Helpers/inputHelpers";

export default createReducer(Map(), {
  SET_INPUT: (state, action) => {
    const valuePath = getInputValue(action.nameSpace, action.inputName);
    return state.setIn(valuePath, action.value);
  },

  SET_INPUT_INTERACTION: (state, action) => {
    const interactionPath = getInputState(action.nameSpace, action.inputName, action.interaction);
    return state.setIn(interactionPath, action.value);
  },

  SET_ALL_INPUT_INTERACTIONS: (state, action) => {
    const inputs = state.get(action.nameSpace);
    if (inputs.size && inputs.size === 0) {
      return state;
    }
    const updatedFields = inputs.map((input, key) => {
      if (isMultipleValueInput(key)) {
        return input.map(innerInput => {
          return innerInput.set(action.interaction, action.value);
        });
      }
      return input.set(action.interaction, action.value);
    });
    return state.set(action.nameSpace, updatedFields);
  },

  CLEAR_ALL_INPUTS: (state, action) => {
    return state.set(action.nameSpace, Map({}))
  }
});

