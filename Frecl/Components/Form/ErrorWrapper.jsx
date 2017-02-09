import React, {PropTypes} from "react";
import classnames from "classnames";

export default React.createClass({

  render() {
    var classes = classnames(this.props.className, {
      'input-hidden': this.props.type === 'hidden'
    });
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
});
