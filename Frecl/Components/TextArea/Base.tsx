import React from "react";
import inputHOC from "../Form/Helpers/inputHOC";
import {TextAreaInputHOCWithHandlersProps, TextAreaProps} from "../Form/Types/types";

class TextareaBase extends React.Component<TextAreaInputHOCWithHandlersProps, {}>{
  displayName: 'TextAreaBase'
  handleChange = (e) => {
    this.props.inputChanged(e.target.value);
  }
  render() {
    var attributes = this.props.getAttributes();
    return <textarea onBlur={this.props.setInputBlurred} onChange={this.handleChange} {...attributes} />
  }
};

export default inputHOC<TextAreaInputHOCWithHandlersProps, TextAreaProps>(TextareaBase);
