import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import inputHOC from "../Form/Helpers/inputHOC";
import {snakeCase} from "lodash"


/** {Internal} Method used internally to display a switch component(radio or checkbox)  */
const SwitchBase = React.createClass({
  displayName: 'SwitchBase',
  propTypes: {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'radio',
      'checkbox'
    ]).isRequired
  },
  getChecked(){
    if (this.props.type === 'radio') {
      return this.props.id;
    } else {
      return ReactDOM.findDOMNode(this.refs[this.props.name]).checked;
    }
  },
  handleChange(e) {
    this.props.inputChanged(this.getChecked());
  },
  render() {
    var attributes = this.props.getAttributes();
    return <input onBlur={this.props.inputInteraction} onChange={this.handleChange}
                  value={attributes.id} {...attributes} id={this.props.labelFor}/>;
  }
});

export default inputHOC(SwitchBase);
