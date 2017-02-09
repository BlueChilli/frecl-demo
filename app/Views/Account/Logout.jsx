import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {createDispatchGetAction} from "../../../Frecl/exports";

const logoutApi = window.client.getIn(["User", "User_Logout", 'api']);

const Logout = React.createClass({
  componentWillMount(){
    this.props.logout();
  },
  render() {
    return <h1>Logging Out</h1>;
  }
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    createDispatchGetAction(dispatch, logoutApi)("SESSION").then(()=> {
      dispatch(push('/account/login'));
      dispatch({type: "CLEAR_STATE"});
    });
  }
})

export default connect(null, mapDispatchToProps)(Logout);
