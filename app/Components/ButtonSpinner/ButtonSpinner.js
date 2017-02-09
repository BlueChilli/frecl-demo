import React from "react";
import {connect} from "react-redux";
import classnames from "classnames";
import {Spinner} from "../../../Frecl/exports";
import "./button-spinner.scss";
import {isArray} from "lodash";

const ButtonSpinner = ({children, className, isRequesting, color, backgroundColor}) => {
  const classes = classnames(className, isRequesting ? "button-spinner" : "");
  
  const buttonStyle = {
    backgroundColor : backgroundColor,
    color           : color
  };

  return (
    <button disabled={isRequesting} className={classes} style={buttonStyle}>
      {isRequesting && <Spinner fast color={color} />}
      {<span>{children}</span>}
    </button>
  );
};

const mapStateToProps = (state, {stateName}) => {
  const stateNameArray = isArray(stateName) ? stateName : [stateName];
  const isRequesting = stateNameArray.some(value => {
    return state.getIn(["ButtonSpinnerState", stateName], true) === 'spinning'
  });
  return {
    isRequesting
  }
};

export default connect(mapStateToProps)(ButtonSpinner);