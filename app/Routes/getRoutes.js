/*******************************/
// Configure all the Routes below
// This is to support the use of Routes for both server and client
/*******************************/
import React from "react";
import {Route, IndexRoute, Redirect} from "react-router";
import Home from "../Views/Home";
import Register from "../Views/Account/Register";
import Login from "../Views/Account/Login";
import Logout from "../Views/Account/Logout";
import Manage from "../Views/Account/Manage";
import ForgotPassword from "../Views/Account/ForgotPassword";
import ResetPassword from "../Views/Account/ResetPassword";
import Container from "../Components/Container";
import authenticatedComponentCreator from "../Components/authenticatedComponentCreator";

const AuthenticatedComponents = authenticatedComponentCreator();

export default () => {
  return (
    <Route component={Container}>
      <Route path="account/manage" component={Manage}/>
      <Route path="account/logout" component={Logout}/>
      <Route path="account">
        <Route path="register" component={Register}/>
        <Route path="login" component={Login}/>
        <Route path="forgotPassword" component={ForgotPassword}/>
        <Route path="resetPassword" component={ResetPassword}/>
      </Route>

      <Route path="app" container component={AuthenticatedComponents}>
        <IndexRoute component={Home}/>
      </Route>
      <Redirect from="*" to="/account/login"/>
    </Route>
  );
}
