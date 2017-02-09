/*******************************/
// !!!To Change Routes for React Router, Please update
// routes in Routes/getRoute.js
/*******************************/
import React from "react";
import {Router, Route} from "react-router";
import getRoutes from "../Routes/getRoutes";

import ga from "../Helpers/GoogleAnalytics";

export default React.createClass({
  propTypes: {
    history: React.PropTypes.object.isRequired
  },
  unlisten: null,
  componentWillMount(){
    this.unlisten = this.props.history.listen(location => {
      if (location.action !== 'POP') {
        ga('send', 'pageview', location.pathname);
      }
    });
  },
  reWrite(prevState, nextState, replace, callback){
    // if (prevState.location.pathname !== nextState.location.pathname) {
    //   const paramsKeys = Object.keys(nextState.params);
    //   const test = new RegExp('^[0-9]+$');
    //   const rewriteKeys = paramsKeys.filter(key => {
    //     return test.test(nextState.params[key]);
    //   });
    //   let state = {};
    //   let newParams = {
    //     ...nextState.params
    //   };
    //   let newPath = nextState.location.pathname;
    //   for (let key of rewriteKeys) {
    //     const value = parseInt(nextState.params[key]);
    //     const obfusVal = (value * 3141).toString(6)
    //     state[key] = value;
    //     newParams[key] = obfusVal;
    //     newPath = newPath.replace(value, obfusVal)
    //   }
    //   replace(newPath);
    // }
    // callback();
  },
  componentWillUnmount(){
    this.unlisten();
  },
  handleRouterUpdate(){
    window.scrollTo(0, 0)
  },
  render() {
    return (
      <Router history={this.props.history} onUpdate={this.handleRouterUpdate}>
        <Route path="/">
          {getRoutes()}
        </Route>
      </Router>
    );
  }
});
