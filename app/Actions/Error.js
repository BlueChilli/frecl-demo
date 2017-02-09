import {fromJS} from "immutable";
export const SET_ERROR = "ERRORS";

export const setErrors = (args) => {
    return {
        type: SET_ERROR,
        payload: fromJS(args)
    }
}
