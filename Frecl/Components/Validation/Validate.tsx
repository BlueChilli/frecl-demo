import React, {PropTypes} from "react";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import DisplayValidation from "./DisplayValidation";
import {PerformanceWrapperProps, InputValidationProps} from "../Form/Types/types"

interface ValidateProps extends InputValidationProps {
  /** The name of the input to validate */
  name: string
}

/** A component to allow validation anywhere inside of a form component for input elements in that same component */
const Validate = (props: PerformanceWrapperProps) => {
    return <DisplayValidation {...props}/>;
};


export default performanceWrapper<PerformanceWrapperProps, ValidateProps>(Validate);

