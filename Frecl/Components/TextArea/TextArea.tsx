import React, {PropTypes} from "react";
import classnames from "classnames";
import InputWrapper from "../Form/InputWrapper";
import InputGroup from "../Form/InputGroup";
import TextAreaBase from "./Base";
import DisplayValidation from "../Validation/DisplayValidation";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import {TextAreaProps, TextAreaPerformanceWrapperProps} from "../Form/Types/types";


const TextArea = function ({className, label, labelPostfix, ...props} : TextAreaPerformanceWrapperProps) {
  const classes = classnames(className, 'textarea', 'input');
  return (
    <InputWrapper className={classes} name={props.name} labelPostfix={labelPostfix} label={label}>
      <InputGroup>
        <TextAreaBase {...props} />
      </InputGroup>
      <DisplayValidation {...props} />
    </InputWrapper>
  );
};

export default performanceWrapper<TextAreaPerformanceWrapperProps, TextAreaProps>(TextArea);
