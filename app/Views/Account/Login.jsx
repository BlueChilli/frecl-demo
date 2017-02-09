import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Row, Col, Input, FormGenerator, InputMapper, createDispatchGetAction} from "../../../Frecl/exports";

const loginApi = window.client.getIn(["UserAccount", "UserAccount_Query", 'api']);

const Login = ({onSubmitSuccess, onForgotPassword}) => (
    <Row>
      <Col cols="desktop-4 tablet-6" offset="desktop-4 tablet-3">
        <h1><span className="icon icon-user"/> Login</h1>
        <FormGenerator stateName="SESSION" apiType="User" apiVerb="Login" onSubmitSuccess={onSubmitSuccess}>
          <InputMapper label="Email" name="email" component={<Input/>}/>
          <InputMapper label="Password" name="password" component={<Input type="password"/>}/>
        </FormGenerator>
        <div>
          <br/>
          <a href="#" onClick={onForgotPassword}>Forgot password?</a>
        </div>
      </Col>
    </Row>
);

const mapDispatchToProps = (dispatch) => ({
    onSubmitSuccess: () => {
      dispatch(push('/app'));
    },

    onForgotPassword: () => {
      dispatch(push('/account/forgotPassword'));
    }
})


export default connect(null, mapDispatchToProps)(Login);
