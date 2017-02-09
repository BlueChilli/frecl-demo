import React, {PropTypes} from "react";
import classnames from "classnames";
import InputWrapper from "../Form/InputWrapper.jsx";
import InputGroup from "../Form/InputGroup.jsx";
import TextAreaBase from "./Base.jsx";
import DisplayValidation from "../Validation/DisplayValidation.jsx";
import performanceWrapper from "../Form/Helpers/performanceWrapper";

const TextArea = function ({className, label, labelPostfix, ...props}) {
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

export default performanceWrapper(TextArea);
