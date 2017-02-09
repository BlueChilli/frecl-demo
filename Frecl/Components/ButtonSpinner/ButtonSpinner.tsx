import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import classnames from "classnames";
import Spinner from "../Spinner/Spinner";
import "./button-spinner.scss";
import {isArray} from "lodash";

import {BaseReactProps} from "../../types";

interface ButtonSpinnerProps extends BaseReactProps{
  color?: string,
  backgroundColor?: string,
  stateName?: Array<string> | string
}

interface StateProps {
  isRequesting: boolean
}

interface DispatchProps {
  dispatch: Dispatch<any>
}

interface ConnectedProps extends ButtonSpinnerProps, StateProps, DispatchProps {}


const ButtonSpinner = ({children, className, isRequesting, color, backgroundColor} : ConnectedProps) => {
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

const mapStateToProps = (state, {stateName}:ButtonSpinnerProps) => {
  const stateNameArray:Array<string> = isArray(stateName) ? stateName : [stateName];
  const isRequesting = stateNameArray.some(value => {
    return state.getIn(["ButtonSpinnerState", stateName], true) === 'spinning'
  });
  return {
    isRequesting
  }
};

export default connect<StateProps, DispatchProps, ButtonSpinnerProps>(mapStateToProps)(ButtonSpinner);