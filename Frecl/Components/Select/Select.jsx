import React, {PropTypes} from "react";
import InputWrapper from "../Form/InputWrapper.jsx";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import DisplayValidation from "../Validation/DisplayValidation.jsx";
import SelectBase from "./Base.jsx";
import "./Select.scss";

const Select = ({label, labelPostfix, arrow, ...props}) => {
  const {options, children, ...validationProps} = props;
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

export default performanceWrapper(Select);
