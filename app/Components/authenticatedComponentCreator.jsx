import React from "react";
import {Map} from 'immutable';
import {connect} from "react-redux";
import {push} from "react-router-redux";

const defaultMapStateToProps = (state) => {
  return {
    user: state.getIn(['SessionState', 'Session', 'data', 'roles'], Map())
  }
};

export default (mapStateToProps = defaultMapStateToProps) => {
  const AuthenticatedComponent = React.createClass({
    componentDidMount() {
      this.checkAuth(this.props);
    },
    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps);
    },
    checkAuth ({user, dispatch, location}) {
      if (!user || (!user.size && !user.size > 0)) {
        const redirectAfterLogin = location.pathname.search('logout') === -1 ? location.pathname : '';
        const url = LOGIN_URL;
        if (redirectAfterLogin.length > 0) {
          dispatch(push(`${url}?next=${redirectAfterLogin}`));
        } else {
          dispatch(push(url));
        }
      }
    },
    render () {
      const renderComponent = ({children, ...props}) => {
        return React.cloneElement(children, props);
      };
      if (this.props.user) {
        return renderComponent(this.props);
      }
      return false;
    }
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
