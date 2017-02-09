import React, {PropTypes} from "react";
import classnames from "classnames";
import Col from "../Col/Col.jsx"

/** A wrapper that injunction with Col components creates a grid layout */
const Row = ({className, children}) => {
  const classes = classnames('row', className);
  return <div className={classes}>{children}</div>;
};

Row.propTypes = {
  className: PropTypes.string,
  /** Must be a FrECL Col element */
  children: PropTypes.node
};


export default Row;


