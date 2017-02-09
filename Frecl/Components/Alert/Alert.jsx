import React, {PropTypes} from "react";
import classnames from "classnames";
import ListView from "../ListView/ListView.jsx";
import "./alert.scss";
export {addAlertItem, removeAllAlertItems} from "./Actions/Alert";
export const COMPONENT_NAME = "Alerts";

class Alert extends React.Component {
  render() {
    return <ListView className={classnames("alerts", this.props.className)} component={COMPONENT_NAME} id={this.props.id}/>;
  }
}

Alert.PropTypes = {
  /* to uniquely identify the alert */
  id: PropTypes.string.isRequired,
  /* class(es) for custom styling */
  className: PropTypes.string
}
// ({id, className})
export default Alert;