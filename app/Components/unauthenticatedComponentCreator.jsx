import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

const defaultMapStateToProps = (state) => {
  return {
    user: state.getIn(['AccountState', 'user'])
  }
};

export default (mapStateToProps = defaultMapStateToProps) => {
  const UnauthenticatedComponent = React.createClass({
    componentDidMount() {
      this.checkAuth(this.props);
    },
    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps);
    },
    checkAuth ({user, dispatch}) {
      const url = this.props.location.query.next ? this.props.location.query.next : '/app';
      if (user) {
        dispatch(push(url));
        return false;
      }
      else {
        return true;
      }

    },
    render () {
      let renderComponent = ({children, ...props}) => {
        return React.cloneElement(children, props);
      };
      if (!this.props.user) {
        return renderComponent(this.props);
      }
      return false;
    }
  });

  return connect(mapStateToProps)(UnauthenticatedComponent);
}
