import {is, Iterable} from "immutable";
import {isArray, isObject} from "lodash";


export default (...keysToTest) => {
  /**
   * Creates a function that checks to see if the passed in properties are equal
   * @param {string} ...keysToTest - Properties to check if equal
   */
  return (props, nextProps) => {
    /**
     * @param {object} props - first object to compare
     * @param {object} nextProps - second object to compare
     * @inner
     */
    return keysToTest.every(value => {
      const currentVal = props[value];
      const nextVal = nextProps[value];
      if (Iterable.isIterable(currentVal) || Iterable.isIterable(nextVal)) {
        return is(currentVal, nextVal);
      } else {
        if (isArray(nextVal) || isObject(nextVal)) {
          throw new Error(`Specific shallow equal does not support plain old JS objects and Arrays: prop ${value} is a ${typeof nextVal}`);
        }
        return currentVal === nextVal;
      }
    })
  }
};