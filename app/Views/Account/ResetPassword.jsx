import React from "react";
import {connect} from "react-redux";
import {stubObject} from "lodash";
import FormSubmit from "../../../Frecl/Components/FormSubmit/FormSubmit";
import {Row, Col, Input, Validation} from "../../../Frecl/exports";

const ResetPassword = ({resetPassword}) => (
  <Row>
    <Col cols="desktop-4 tablet-6" offset="desktop-4 tablet-3">
      <h1>Reset Password</h1>
      <p>Please choose a new password</p>
      <FormSubmit name="reset" onSubmit={resetPassword} buttonText="Reset Password" stateName={RESET_PASSWORD_USER}>
        <Input name="newPassword" label="Password" required minLength="6" type="password">
          <Validation isFor="required">Password is required</Validation>
        </Input>
        <Input name="confirmPassword" label="Confirm Password" required minLength="6" type="password">
          <Validation isFor="required">Confirm Password is required</Validation>
        </Input>
      </FormSubmit>
    </Col>
  </Row>
);

const mapDispatchToProps = (dispatch, {location}) => {
  console.log(location)
  // FIXME: unfinished as the token is sent as part of the URL and not as a separate prop
  return {
    resetPassword: (e, formData) => dispatch(resetPassword({Email, token, ...formData.toJS()}))
  }
};

export default connect(stubObject, mapDispatchToProps)(ResetPassword);

