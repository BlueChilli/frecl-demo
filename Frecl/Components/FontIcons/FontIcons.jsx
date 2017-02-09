import React from 'react';
import classnames from 'classnames';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render() {
    const classes = classnames('icon', 'icon-' + this.props.name);

    return (
      <span>
        <i className={classes}/>
        &nbsp;
        {this.props.children}
      </span>
    );
  }
});
