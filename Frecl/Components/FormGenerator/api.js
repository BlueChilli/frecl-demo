import ajax from "../../../app/Helpers/AjaxSettings";

export const getSchema = (path) => {
  return ajax.request({
    baseURL: 'https://dev.bluechilli.com/systemtwo/api',
    headers: {
      apiKey: 'E4602A2C-1D2F-4957-92B0-7EEA683899F7',
      "Content-Type": 'application/json'
    },
    method: 'options',
    url: `${path}/schema`
  });
};


export const submitForm = (path, formData, mimeType) => {
  return ajax.request({
    baseURL: 'https://dev.bluechilli.com/systemtwo/api',
    headers: {
      apiKey: 'E4602A2C-1D2F-4957-92B0-7EEA683899F7',
      "Content-Type": mimeType
    },
    method: 'post',
    url: path,
    data: formData
  });
};


