import React, {PropTypes} from "react";
import classnames from "classnames";
import InputWrapper from "../../Components/Form/InputWrapper.jsx";
import "./RadioTabs.scss";

export default React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired
  },
  render() {
    var {className, ...other} = this.props;
    var classes = classnames(className, 'input', 'radio-tabs');
    const radioClasses = classnames(this.props.radioClasses);
    return (
      <InputWrapper className={classes} name={this.props.name} label={this.props.label}>
        <div type="radio" className={radioClasses} {...other}>
          {React.Children.map(this.props.children, (value, index) => {
            return React.cloneElement(value, {
              ...value.props,
              name: this.props.name,
              key: this.props.name + index,
            });
          })}
        </div>
      </InputWrapper>
    );
  }
});

