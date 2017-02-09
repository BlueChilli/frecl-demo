import React, {PropTypes} from "react";
import InputWrapper from "../Form/InputWrapper";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import DisplayValidation from "../Validation/DisplayValidation";
import SelectBase from "./Base";
import "./Select.scss";
import {SelectInputProps, SelectPerformanceWrapperProps} from "../Form/Types/types";


const Select = ({label, labelPostfix, arrow, ...props} : SelectPerformanceWrapperProps) => {
  const {children, ...validationProps} = props;
  return (
    <InputWrapper className="select" name={props.name} labelPostfix={labelPostfix} label={label}>
      <div className="styled-select">
        <SelectBase {...props}/>
        <div className="arrow">{arrow}</div>
      </div>
      <DisplayValidation {...validationProps}/>
    </InputWrapper>
  );
};

export default performanceWrapper<SelectPerformanceWrapperProps, SelectInputProps>(Select);
