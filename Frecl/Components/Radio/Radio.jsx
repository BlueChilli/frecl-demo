import React from "react";
import classnames from "classnames";
import Switch from "../Switch/Switch.jsx";

/** Creates a radio button connected to FrECL forms state management all HTML5 attributes apply */
export default ({className, ...other}) => {
    var classes = classnames(className, 'radio');
    return (
      <Switch type="radio" className={classes} {...other} />
    );
}