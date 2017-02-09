import React, {PropTypes} from "react";
import {connect} from "react-redux";
import classnames from "classnames";
import "./Spinner.scss";

import {BaseReactProps} from "../../types";

interface SpinnerProps extends BaseReactProps{
  /** Speed of indicator rotation **/
  fast?: boolean,
  /** Size of the indicator **/
  large?: boolean,
  /** Color of the indicator **/
  color?: string
}


const Spinner = ({fast, large, color}:SpinnerProps) => {
  const classes = classnames('spinner', (fast? ' fast':'') + (large? ' large':''));

  let spinnerStyle = {
    borderTopColor: '#000'
  };
  color && (spinnerStyle.borderTopColor = color);
  
  return <div id="spinner" className={classes} style={spinnerStyle} />;
};

export default Spinner;