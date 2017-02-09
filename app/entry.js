import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import "babel-polyfill";
import "./Styles/main.scss";
import "../Frecl/Helpers/Raygun";
import ajax from "./Helpers/AjaxSettings";
import {Map} from "immutable";

// declare function require(string);
// declare module module{};

const rootEl = document.getElementById("app");


const render = () => {
  const App = require('./app.jsx').default;
  const {store, history} = require("./Setup/storeHistory");
  const ConfirmModal = require("./Components/ConfirmModal/ConfirmModal").default;

  ReactDOM.render((
    <Provider store={store}>
      <div>
        <ConfirmModal id="confirmModal">
          Are you sure
        </ConfirmModal>
        <App history={history}/>
      </div>
    </Provider>
  ), rootEl);
};

const renderError = (error) => {
  const RedBox = require('redbox-react').default;
  ReactDOM.render(
    <RedBox error={error}/>,
    rootEl
  )
};

const renderHandleError = () => {
  try {
    render()
  } catch (error) {
    renderError(error);
    throw error;
  }
};

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    setTimeout(renderHandleError)
  });
}

const insertPathArguments = (pathArgs, path, index) => {
  const pathArgsKeys = pathArgs.keySeq();
  if (pathArgsKeys.get(index) !== undefined) {
    return insertPathArguments(pathArgs, path.replace(`{${pathArgsKeys.get(index)}}`, pathArgs.get(pathArgsKeys.get(index))), index + 1);
  }
  return path;
};


ajax.get(`${BASE_URL}/swagger/docs/v1?flatten=true`).then(res => {
  const paths = res.data.get('paths');
  // window.client = paths.filter((methods, path) => path.match('/api/v1/'))
  window.client = paths.mapEntries(entries => {
      const methods = entries[1];
      const path = entries[0];
      return [path.replace('/api/v1/', ''), methods.mapEntries(entries => {
        const method = entries[0];
        const info = entries[1];
        return [
          info.get('operationId'),
          info.set('api', (data, params = {}, pathArgs = Map({})) => {
            const pathWithArgs = insertPathArguments(pathArgs, path, 0);
            return ajax.request({
              withCredentials: true,
              method,
              url: BASE_URL + pathWithArgs,
              data,
              params
            });
          })
        ]
      })];
    }
  ).flatten(1).groupBy(value => value.getIn(['tags', 0]));
  renderHandleError();
});


