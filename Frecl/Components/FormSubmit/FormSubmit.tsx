import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Form, {FormOwnProps} from "../Form/Form";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

export interface FormSubmitProps extends FormOwnProps {
  buttonText?:string,
  stateName:string
}

export default ({buttonText ="Submit", children, stateName, ...props}:FormSubmitProps) => (
  <Form {...props}>
    {children}
    <ButtonSpinner className="button-primary" stateName={stateName} color="#FFF">{buttonText}</ButtonSpinner>
  </Form>
)

