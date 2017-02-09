import React, {PropTypes} from "react";
import inputHOC from "../Form/Helpers/inputHOC";
import {isFunction} from "lodash";
import {TextInputHOCWithHandlersProps, TextInputProps} from "../Form/Types/types";


class InputBase extends React.Component<TextInputHOCWithHandlersProps, {}>{
  displayName: 'InputBase'
  handleChange = (e) => {
    const value:string = this.props.type === 'file' ? e.target.files : e.target.value;
    this.props.inputChanged(value);
    if (isFunction(this.props.onChange)) {
      this.props.onChange(e);
    }
  }
  render() {
    const attributes = this.props.getAttributes();
    return <input onBlur={this.props.setInputBlurred} {...attributes} onChange={this.handleChange}/>
  }
};

export default inputHOC<TextInputHOCWithHandlersProps, TextInputProps>(InputBase);
