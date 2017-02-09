import React, {PropTypes} from "react";
import inputHOC from "../Form/Helpers/inputHOC";
import {isFunction} from "lodash";

const InputBase = React.createClass({
  displayName: 'InputBase',
  handleChange(e) {
    const value = this.props.type === 'file' ? e.target.files : e.target.value;
    this.props.inputChanged(value);
    if (isFunction(this.props.onChange)) {
      this.props.onChange(e);
    }
  },
  render() {
    var attributes = this.props.getAttributes();
    return <input onBlur={this.props.inputInteraction} {...attributes} onChange={this.handleChange}/>
  }
});

export default inputHOC(InputBase);
