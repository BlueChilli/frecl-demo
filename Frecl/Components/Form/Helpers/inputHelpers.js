import React, {PropTypes} from "react";
import {isUndefined} from "lodash";

export function isMultipleValueInput(inputName) {
  return inputName.search(/\[\]$/) !== -1;
}

export const returnDefinedValue = (...args) => {
  const innerReturnDefinedValue = (index = 0) => {
    if (index === args.length) {
      return undefined;
    } else if (!isUndefined(args[index])) {
      return args[index];
    }
    return innerReturnDefinedValue(index + 1);
  };
  return innerReturnDefinedValue();
};
