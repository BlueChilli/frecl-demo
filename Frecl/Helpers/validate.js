import {Iterable} from "immutable";
import regExpList from "./regExp";
import {insertCommas} from "./numberFormatting";

export const validations = {
  required: (value, test, type) => {
    if (Iterable.isIterable(value)) {
      if (type === 'checkbox') {
        return value.some(innerVal => {
          return innerVal.get('value', false);
        });
      } else {
        return value.size > 0;
      }
    } else if (type === "checkbox") {
      return value === true;
    }
    return value.toString().length > 0
  },
  pattern: (value, test) => {
    let patternRegExp = new RegExp(test);
    return patternRegExp.test(value);
  },
  type: (value, test) => {
    let typeRegExp = new RegExp(regExpList[test]);
    return typeRegExp.test(value);
  },
  minLength: (value, test) => {
    return value.toString().length >= parseInt(test);
  },
  maxLength: (value, test) => {
    return value.toString().length <= parseInt(test);
  },
  min: (value, test) => {
    return parseInt(value) >= parseInt(test)
  },
  max: (value, test) => {
    return parseInt(value) <= parseInt(test)
  },
  'default': () => {
    return false;
  }
};

export const validationsMessages = (type, test) => {
  switch (type) {
    case "required":
      return `This is a required field.`;
    case "minLength":
      return `This is too short, it must have at least ${insertCommas(test)} characters.`;
    case "maxLength":
      return `This is too long, it cannot have more then ${insertCommas(test)} characters.`;
    case "min":
      return `This must be at least ${insertCommas(test)}.`;
    case "max":
      return `This must not be greater than ${insertCommas(test)}.`;
    case "type":
      return `That's not a valid ${test}.`;
    default:
      return `It looks like something went wrong. Try again?`;
  }
};

export function testValidation(value, test, typeOfTest, typeOfInput) {
  if (value !== undefined && value !== null) {
    if (validations[typeOfTest] !== undefined) {
      return validations[typeOfTest](value, test, typeOfInput);
    } else {
      return validations['default']();
    }
  }
  return validations['default']();
}

export function validationsAvailable(inputAttributes) {
  const validationsAvail = Object.keys(validations);
  return validationsAvail.filter(validation => inputAttributes.hasOwnProperty(validation));
}