import React from 'react';
import classnames from "classnames";
import InputGroup from "../Form/InputGroup";
import InputWrapper from "../Form/InputWrapper";
import {TextInputProps, TextInputPerformanceWrapperProps} from "../Form/Types/types";
import InputBase from "./Base";
import DisplayValidation from "../Validation/DisplayValidation";
import performanceWrapper from "../Form/Helpers/performanceWrapper";


const Input = ({className, label, labelPostfix, prepend, append, ...props} : TextInputPerformanceWrapperProps) => {
  const classes:string = classnames(className, 'input');
  if (props.type !== 'hidden') {
    return (
      <InputWrapper className={classes} type={props.type} name={props.name} labelPostfix={labelPostfix} label={label}>
        <InputGroup prepend={prepend} append={append}>
          <InputBase {...props} />
        </InputGroup>
        <DisplayValidation {...props} />
      </InputWrapper>
    );
  }
  return <InputBase {...props} />
};


export default performanceWrapper<TextInputPerformanceWrapperProps, TextInputProps>(Input);