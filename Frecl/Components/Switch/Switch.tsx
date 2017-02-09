import React, {PropTypes} from "react";
import classnames from "classnames";
import SwitchBase from "./Base";
import DisplayValidation from "../Validation/DisplayValidation";
import ErrorWrapper from "../Form/ErrorWrapper";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import {SwitchProps, SwitchInputPerformanceWrapperProps} from "../Form/Types/types";

import {snakeCase, toLower} from "lodash"
import "./Switch.scss";

const Switch = ({className, label, ...props} : SwitchInputPerformanceWrapperProps) => {
  const classes:string = classnames("switch", className);
  const labelFor:string = `${toLower(props.name)}_${snakeCase(props.id)}`;
  return (
    <ErrorWrapper className={classes} type={props.type}>
      <SwitchBase {...props} id={labelFor}/>
      <label htmlFor={labelFor}>
        <span className="box"/>
        {label}
      </label>
      <DisplayValidation {...props} />
    </ErrorWrapper>
  );
};

export default performanceWrapper<SwitchInputPerformanceWrapperProps, SwitchProps>(Switch);
