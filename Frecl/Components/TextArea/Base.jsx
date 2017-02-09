import React from "react";
import inputHOC from "../Form/Helpers/inputHOC";

const TextareaBase = React.createClass({
  displayName: 'TextareaBase',
  handleChange(e) {
    this.props.inputChanged(e.target.value);
  },
  render() {
    var attributes = this.props.getAttributes();
    return <textarea onBlur={this.props.inputInteraction} onChange={this.handleChange} {...attributes} />
  }
});

export default inputHOC(TextareaBase);
