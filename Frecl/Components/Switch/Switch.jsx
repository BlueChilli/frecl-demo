import React, {PropTypes} from "react";
import classnames from "classnames";
import SwitchBase from "./Base.jsx";
import DisplayValidation from "../Validation/DisplayValidation.jsx";
import ErrorWrapper from "../Form/ErrorWrapper.jsx";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import {snakeCase, toLower} from "lodash"

import "./Switch.scss";
const Switch = function ({className, label, ...props}) {
  const classes = classnames("switch", className);
  const labelFor = `${toLower(props.name)}_${snakeCase(props.id)}`;
  return (
    <ErrorWrapper className={classes} name={props.name} id={props.id}>
      <SwitchBase {...props} labelFor={labelFor}/>
      <label htmlFor={labelFor}>
        <span className="box"/>
        {label}
      </label>
      <DisplayValidation {...props} />
    </ErrorWrapper>
  );
};

export default performanceWrapper(Switch);
