import React from "react";
import classnames from "classnames";
import onReactOutsideClick from "react-onclickoutside";
import InputWrapper from "../Form/InputWrapper.jsx";
import InputGroup from "../Form/InputGroup.jsx";

export default onReactOutsideClick(React.createClass({
  getInitialState(){
    return {
      hidden: true
    }
  },
  handleFocus(e){
    e.preventDefault();
    this.setState({hidden: false});
  },
  handleClickOutside() {
    this.setState({hidden: true});
  },
  closeInput(){
    this.setState({hidden: true});
    this.refs[this.props.name].blur();
  },
  render() {
    const dateRangeClasses = classnames({hidden: this.state.hidden}, 'date-range-container');
    return (
      <div className="date-range-wrapper">
        <InputWrapper className="input date-picker" name={this.props.name}
                      labelPostfix={this.props.labelPostfix}
                      label={this.props.label}>
          <InputGroup prepend={this.props.prepend} append={this.props.append}>
            <input onFocus={this.handleFocus} placeholder={this.props.placeholder}
                   value={this.props.value} ref={this.props.name} readOnly="true"/>
          </InputGroup>
        </InputWrapper>
        <div className={dateRangeClasses}>
          {React.cloneElement(this.props.children, {
            close: this.closeInput
          })}
        </div>
      </div>
    );
  }
}));

