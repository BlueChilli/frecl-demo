import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {setToggleView, toggleToggleView} from "./Actions/toggleView";

const ToggleView = React.createClass({
  propTypes: {
    id: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired
  },
  componentWillMount(){
    this.props.dispatch(setToggleView(this.props.component, this.props.id, this.props.visible));
  },
  getValidElement(element, className){
    if (React.isValidElement(element)) {
      return React.cloneElement(element, {
        className
      })
    }
    return <span className={className}>{element}</span>;
  },
  render() {
    if (this.props.visible === false) {
      return null;
    }
    return this.getValidElement(this.props.children, this.props.className);
  }
});

const mapStateToProps = function (state, ownProps) {
  return {
    visible: state.getIn(['ToggleViewState', ownProps.component, ownProps.id], false)
  }
};

export default connect(mapStateToProps)(ToggleView);
export {toggleToggleView}