import React, {PropTypes} from "react";
import classnames from "classnames";
import InputGroup from "../Form/InputGroup.jsx";
import InputWrapper from "../Form/InputWrapper.jsx";
import InputBase from "./Base.jsx";
import DisplayValidation from "../Validation/DisplayValidation.jsx";
import performanceWrapper from "../Form/Helpers/performanceWrapper";


/** Creates an input component with a label and validation */
const Input = function ({className, label, labelPostfix, prepend, append, ...props}) {
  const classes = classnames(className, 'input');
  if (props.type !== 'hidden') {
    return (
      <InputWrapper className={classes} name={props.name} id={props.id} labelPostfix={labelPostfix} label={label}>
        <InputGroup prepend={prepend} append={append}>
          <InputBase {...props} />
        </InputGroup>
        <DisplayValidation {...props} />
      </InputWrapper>
    );
  }
  return <InputBase {...props} />
};

Input.propTypes = {

  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelPostfix: PropTypes.any,
  prepend: PropTypes.any,
  append: PropTypes.any
};

export default performanceWrapper(Input)
