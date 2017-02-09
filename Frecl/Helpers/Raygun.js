import {isProduction} from "../Helpers/environment";
import {canUseDOM} from "./canUseDOM";
import {stubObject} from "lodash";

if (canUseDOM) {
  require("raygun4js");
}

const isRaygunApiKeyAvailable = () => {
  return typeof RAYGUN_APIKEY !== 'undefined' && RAYGUN_APIKEY !== "";
};

const getRaygunApiKey = () => {
  if (isRaygunApiKeyAvailable()) {
    return RAYGUN_APIKEY;
  }
  return "";
};

const getRaygun = () => {
  if (isProduction()) {
    if (canUseDOM && Raygun) {
      return Raygun.init(getRaygunApiKey()).attach();
    }
  }
  return {
    send: (e) => {
      console.error(e)
    }
  }
};


export default getRaygun();
