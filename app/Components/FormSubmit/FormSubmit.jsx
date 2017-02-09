import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Form} from "../../../Frecl/exports";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

const FormSubmit = React.createClass({
  render(){
    const {buttonText, children, stateName, ...props} = this.props;
    return (
      <Form {...props}>
        {children}
        <ButtonSpinner className="button-primary" stateName={stateName} color="#FFF">{buttonText}</ButtonSpinner>
      </Form>
    );
  }
});


export default connect()(FormSubmit);
