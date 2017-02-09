import React, {PropTypes} from "react";
import {connect} from "react-redux";
import classnames from "classnames";
import "./Spinner.scss";

const Spinner = ({fast, large, color}) => {
  const classes = classnames('spinner', (fast? ' fast':'') + (large? ' large':''));

  let spinnerStyle = {
    borderTopColor: '#000'
  };
  color && (spinnerStyle.borderTopColor = color);
  
  return <div id="spinner" className={classes} style={spinnerStyle} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
  /** Speed of indicator rotation **/
  fast: PropTypes.bool,
  /** Size of the indicator **/
  large: PropTypes.bool,
  /** Color of the indicator **/
  color: PropTypes.string
};

export default Spinner;