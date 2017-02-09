import React from "react";
import {push} from "react-router-redux";
import {connect} from "react-redux";
import {Link} from "react-router";
import {Icon} from "../../../Frecl/exports";

const Home = React.createClass({
  render() {
    return (
      <div>
        <h1>Font Icons</h1>
        <h2><Icon name="account-login">Click to Login</Icon></h2>
        <h3><Icon name="account-logout">Click to Logout</Icon></h3>
        <h4><Icon name="check">Select</Icon></h4>
        <h5><Icon name="cog">Settings</Icon></h5>
        <h6><Icon name="dial">Phone Me</Icon></h6>
        <button><Icon name="check">Download Now</Icon></button>
      </div>
    );
  }
});

export default connect()(Home);
