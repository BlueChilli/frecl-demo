import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {stubObject} from "lodash";
import {Input, Row, Col, FormGenerator, InputMapper} from "../../../Frecl/exports";

const ForgotPassword = ({createForgotPassword}) => (
  <Row>
    <Col cols="desktop-4 tablet-6" offset="desktop-4 tablet-3">
      <h1>Reset Password</h1>
      <p>Enter your email address and we will send you instructions on how to reset your password</p>
      
      <FormGenerator name="forgotPassword" stateName={FORGOT_PASSWORD_USER} apiType="UserAccount" apiVerb="RequestNewPassword" onSubmitSuccess={createForgotPassword}>
        <InputMapper name="email" component={<Input/>}/>
      </FormGenerator>
    </Col>
  </Row>
);

const mapDispatchToProps = (dispatch) => ({
  createForgotPassword: (e, args) => dispatch(forgotPasswordUser(args.toJS()))
});

export default connect(stubObject, mapDispatchToProps)(ForgotPassword);