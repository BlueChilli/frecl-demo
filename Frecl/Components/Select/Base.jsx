import React, {PropTypes, Children} from "react";
import {mapProps} from "recompose";
import inputHOC from "../Form/Helpers/inputHOC";

const getDefaultSelected = ({children, defaultValue}) => {
  if (Children.count(children) < 1) {
    return '';
  } else if (defaultValue) {
    return defaultValue;
  } else {
    return Children.toArray(children)[0].props.value;
  }
};

const SelectBase = React.createClass({
  displayName: 'SelectBase',
  handleChange(e) {
    this.props.inputChanged(e.target.value);
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  },
  render: function () {
    const attributes = this.props.getAttributes();
    return (
      <select {...attributes} onBlur={this.handleBlur} onChange={this.handleChange}>
        {this.props.children}
      </select>
    );
  }
});

export default mapProps(props => {
  return {
    defaultSelected: getDefaultSelected(props),
    ...props
  }
})(inputHOC(SelectBase));
