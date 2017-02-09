import React from "react";
import classnames from "classnames";
import Switch from "../Switch/Switch.jsx";

export default ({className, ...other}) => {
  var classes = classnames(className, 'radio-tab');
  return (
    <Switch type="radio" className={classes} {...other}/>
  );
}



