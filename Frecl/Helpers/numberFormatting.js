import {toMoney} from "vanilla-masker";

export const insertCommas = (value) => {
  return toMoney(value, {
    precision: 0,
    delimiter: ',',
    unit: '',
    suffixUnit: ''
  })
};
