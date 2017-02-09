import {camelCase, upperFirst, flow} from "lodash"


export function getFirstPath(stateName) {
  return flow(camelCase, upperFirst)(stateName);
}

export function getTopStatePath(stateName) {
  return getFirstPath(stateName) + "State";
}

export function splitPath(pathname) {
  return pathname.split('/');
}