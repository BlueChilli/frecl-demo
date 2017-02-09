import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Row, Col, Input, Validation, CheckBox, FormGenerator, InputMapper, createDispatchGetAction} from "../../../Frecl/exports";

const loginApi = window.client.getIn(['UserSession', 'UserSession_Add', 'api'])

const Register = ({onRegisterSuccess}) => (
  <Row>
    <Col cols="desktop-4 tablet-6" offset="desktop-4 tablet-3">
      <h1>Register</h1>
        <FormGenerator debug stateName="SESSION" apiType="User" apiVerb="Register" onSubmitSuccess={onRegisterSuccess}>
          <InputMapper name="companyName" component={<Input/>}/> 
          <InputMapper name="email" component={<Input/>}/>
          <InputMapper name="password" component={<Input type='password'/>}/>
        </FormGenerator>
    </Col>
  </Row>
);

const mapDispatchToProps = (dispatch) => ({
  onRegisterSuccess: () => {
    dispatch(push('/app'));
  }
});




export default connect(null, mapDispatchToProps)(Register);
