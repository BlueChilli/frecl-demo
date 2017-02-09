import React from "react";
import {connect} from "react-redux";
// import {switchProfile} from "../../Actions/Account";

const SwitchUser = React.createClass({
  componentWillMount(){
    // this.props.dispatch(switchProfile());
  },
  render() {
    return <h1>Switching User</h1>;
  }
});

export default connect()(SwitchUser);
