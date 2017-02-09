import React, {PropTypes} from "react";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import DisplayValidation from "./DisplayValidation.jsx";


/** A component to allow validation anywhere inside of a form component for input elements in that same component */
const Validate = (props) => {
  return <DisplayValidation {...props}/>;
};

Validate.propTypes = {
  /** The name of the form field to validate */
  name: PropTypes.string.isRequired,
};

export default performanceWrapper(Validate);

