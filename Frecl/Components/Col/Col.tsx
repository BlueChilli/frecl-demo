import React, {PropTypes} from "react";
import classnames from "classnames";
import {BaseReactProps} from "../../types";


export interface ColProps extends BaseReactProps{
  /** Accepts a space separated string with at most three arguments eg: mobile-12 tablet-8 desktop-9 specifies the
   * size of columns on devices with different screen sizes */
  cols: string,
  /** Works exactly like the cols prop but controls the cols offset */
  offset?: string,
  /** Works exactly like the cols prop but controls the cols pull */
  pull?: string,
  /** Works exactly like the cols prop but controls the cols push */
  push?: string,
}

/* Internal: Injects the appropriate className into a passed in prop */
function insertModifier(string:string, modifier:string):string {
  if (typeof string === 'string') {
    const itemsArr = string.split(' ');
    return itemsArr.map(function (value) {
      return value.replace(/-/, modifier);
    }).join(' ');
  }
}


/** Generates a a responsive column requires Row as a parent */
const Col = ({cols, offset, pull, push, className, children} : ColProps) => {
  const colClasses = insertModifier(cols, '-col-');
  const offsetClasses = insertModifier(offset, '-offset-');
  const pullClasses = insertModifier(pull, '-pull-');
  const pushClasses = insertModifier(push, '-push-');

  const classes = classnames(colClasses, offsetClasses, pullClasses, pushClasses, className);

  return <div className={classes}>{children}</div>;
};



export default Col;


