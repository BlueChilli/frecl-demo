import {List} from "immutable";

export function getInputValue(nameSpace, inputName) {
  return List([nameSpace, ...inputName, 'value']);
}

export function getInputState(nameSpace, inputName, state) {
  return List([nameSpace, ...inputName, state]);
}
