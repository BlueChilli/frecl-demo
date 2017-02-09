import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {List, Map} from "immutable";
import FormMessages from "./FormMessages/FormMessages.jsx";
import '../Styles/main.scss';


const Container = React.createClass({
  getMenu(){
    if (this.props.userRoles.size > 0) {
      return (
        <ul>
          <li><Link activeClassName="active" to="/app">App</Link></li>
          <li><Link activeClassName="active" to="/account/manage">Account</Link></li>
          <li><Link activeClassName="active" to="/account/logout">Logout</Link></li>
          <li><Link activeClassName="active" to="/layout">Layout</Link></li>
        </ul>
      )
    }
    return (
      <ul>
        <li><Link activeClassName="active" to="/account/login">Login</Link></li>
        <li><Link activeClassName="active" to="/account/register">Register</Link></li>
        <li><Link activeClassName="active" to="/layout">Layout</Link></li>
      </ul>
    )
  },
  render() {
    return (
      <div>
        <header>
          <nav>
            <ul className="pull-right">
              <li><Link activeClassName="active" to="/components">Components</Link></li>
            </ul>
            {this.getMenu()}
          </nav>
        </header>
        <FormMessages id={'FormMessages'}/>
        <div className="container fatty">
          {this.props.children || "That component doesn't seem to exist... How troubling :("}
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    userRoles: state.getIn(['SessionState', 'Session', 'data', 'roles'], List())
  }
};

export default connect(mapStateToProps)(Container);
