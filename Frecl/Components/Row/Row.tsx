import React, {PropTypes} from "react";
import classnames from "classnames";
import {ColProps} from "../Col/Col.jsx"
import {BaseReactProps} from "../../types"

interface RowProps extends BaseReactProps {
  children?: React.Component<ColProps, {}>
}

/** A wrapper that injunction with Col components creates a grid layout */
const Row = ({className, children}:RowProps) => {
  const classes = classnames('row', className);
  return <div className={classes}>{children}</div>;
};


export default Row;


