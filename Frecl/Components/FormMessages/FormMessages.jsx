import React, {PropTypes} from "react";
import {is, Iterable, List} from "immutable";
import {isString} from "lodash";
import {connect} from "react-redux";
import Alert, {addAlertItem, removeAllAlertItems} from "../../../Frecl/Components/Alert/Alert.jsx";

function messagesExists(messages) {
  return (Iterable.isIterable(messages) && messages.size > 0) || (isString(messages) && messages.length > 0);
}

const FormMessages = React.createClass({
  displayAlert(props = this.props){
    const {notifications, dispatch, id} = props;
    notifications.forEach(notification => {
      const messages = notification.getIn(['actionPayload', 'errors'], notification.getIn(['actionPayload', 'message'], List()));
      const status = notification.get('status');
      if (messagesExists(messages)) {
        if (status === 'failure') {
          dispatch(addAlertItem(id, "There was an error submitting the form", messages, 'danger'))
        } else if (status === 'success') {
          dispatch(addAlertItem(id, "Form Submitted", messages, 'success'))
        }
      }
    });
  },
  componentWillMount(){
    this.displayAlert();
  },
  componentWillUpdate(nextProps){
    if (!is(this.props.notifications, nextProps.notifications)) {
      this.props.dispatch(removeAllAlertItems(this.props.id));
      this.displayAlert(nextProps);
    }
  },
  componentWillUnmount(){
    this.props.dispatch(removeAllAlertItems(this.props.id));
  },
  render(){
    return <Alert className="error-message" id={this.props.id}/>
  }
});

const mapStateToProps = (state) => {
  const notifications = state.get('NotificationState').filter(notification => {
    return notification.get('status') !== 'expired';
  });
  return {
    notifications
  }
};

export default connect(mapStateToProps)(FormMessages);
