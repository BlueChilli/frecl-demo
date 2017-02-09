import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import inputHOC from "../Form/Helpers/inputHOC";
import {SwitchInputHOCWithHandlersProps, SwitchProps} from "../Form/Types/types"
import {snakeCase} from "lodash"

interface SwitchBaseElement extends Element{
  checked: boolean
}

/** {Internal} Method used internally to display a switch component(radio or checkbox)  */
class SwitchBase extends React.Component<SwitchInputHOCWithHandlersProps, {}>{
  displayName: 'SwitchBase'
  getChecked = () => {
    if (this.props.type === 'radio') {
      return this.props.id;
    } else {
      return ReactDOM.findDOMNode<SwitchBaseElement>(this.refs[this.props.name]).checked;
    }
  }
  handleChange = () => {
    this.props.inputChanged(this.getChecked());
  }
  render() {
    var attributes = this.props.getAttributes();
    return <input onBlur={this.props.setInputBlurred} onChange={this.handleChange}
                  value={attributes.id} {...attributes} id={this.props.id}/>;
  }
};

export default inputHOC<SwitchInputHOCWithHandlersProps, SwitchProps>(SwitchBase);
