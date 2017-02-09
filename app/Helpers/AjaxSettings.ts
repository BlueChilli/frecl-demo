import axios from "axios";
import {fromJS, Map} from "immutable";
import {canUseDOM} from "../../Frecl/Helpers/canUseDOM";
import {apiResponseDataMap} from "../../Frecl/types";

declare var API_KEY:string

const instance = axios.create<JSON>({
  withCredentials: true,
  headers: {
    apiKey: API_KEY
  },
  transformResponse: (data) => {
    const parsedData:apiResponseDataMap = JSON.parse(data);
    return fromJS(parsedData);
  }
});

instance.interceptors.request.use(config => {
  if (!canUseDOM) {
    throw new Error("You can't use ajax on the server");
  }
  return config;
});

instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function ({response}) {
  // Do something with response error
  response.data = response.data.set('status', response.status);

  return Promise.reject(response);
});

export default instance;