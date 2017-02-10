import React, {PropTypes, Children} from "react";
import {withProps} from "recompose";
import {List} from "immutable";
import inputHOC from "../Form/Helpers/inputHOC";
import {ShallowCompare} from "../../types";
import {SelectInputProps, SelectInputHOCWithHandlersProps} from "../Form/Types/types";

interface OptionTypes{
  value: string | boolean | number,
  children: List<React.ReactText>
}

interface WithProps extends SelectInputProps {
  defaultSelected?: string | boolean | number
}

interface InputHOC extends SelectInputHOCWithHandlersProps{
  defaultSelected: string | boolean | number,
  children: List<React.ReactText>
}


const getDefaultSelected = ({children, defaultValue}:SelectInputProps) => {
  if (Children.count(children) < 1) {
    return '';
  } else if (defaultValue) {
    return defaultValue;
  } else {
    return (Children.toArray(children)[0] as React.ReactElement<OptionTypes>).props.value;
  }
};

class SelectBase extends React.Component<InputHOC, {}> {
  displayName: 'SelectBase'
  handleChange = (e) => {
    this.props.inputChanged(e.target.value);
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
  render () {
    const attributes = this.props.getAttributes();
    return (
      <select {...attributes} onChange={this.handleChange}>
        {this.props.children.toArray()}
      </select>
    );
  }
};

export default withProps<WithProps, SelectInputProps>(props => {
  return {
    defaultSelected: getDefaultSelected(props)
  }
})(inputHOC<InputHOC, SelectInputProps>(SelectBase));
