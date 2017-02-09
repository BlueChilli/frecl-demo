import React, {PropTypes} from "react";
import classnames from "classnames";

/* Internal: Injects the appropriate className into a passed in prop */
function insertModifier(string, modifier) {
  if (typeof string === 'string') {
    const itemsArr = string.split(' ');
    return itemsArr.map(function (value) {
      return value.replace(/-/, modifier);
    }).join(' ');
  }
}


/** Generates a a responsive column requires Row as a parent */
const Col = ({cols, offset, pull, push, className, children}) => {
  const colClasses = insertModifier(cols, '-col-');
  const offsetClasses = insertModifier(offset, '-offset-');
  const pullClasses = insertModifier(pull, '-pull-');
  const pushClasses = insertModifier(push, '-push-');

  const classes = classnames(colClasses, offsetClasses, pullClasses, pushClasses, className);

  return <div className={classes}>{children}</div>;
};

Col.propTypes = {
  /** Accepts a space separated string with at most three arguments eg: mobile-12 tablet-8 desktop-9 specifies the
   * size of columns on devices with different screen sizes */
  cols: PropTypes.string.isRequired,
  /** Works exactly like the cols prop but controls the cols offset */
  offset: PropTypes.string,
  /** Works exactly like the cols prop but controls the cols pull */
  pull: PropTypes.string,
  /** Works exactly like the cols prop but controls the cols push */
  push: PropTypes.string,
  className: PropTypes.string,
  /** The elements/components that should be displayed */
  children: PropTypes.node.isRequired
};


export default Col;


