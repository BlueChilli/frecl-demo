import {BASE_URL} from "../Constants/APP.js";
export function getUrlPath(relative) {
	return BASE_URL + relative;
}