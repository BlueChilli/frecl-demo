import React, {PropTypes} from "react";
import classnames from "classnames";
import './Notification.scss';


//const lightIcon = require('./Assets/close-light.svg');
//const darkIcon = require('./Assets/close-dark.svg');

class Notification extends React.Component {
    render() {
        //let close = lightIcon;
        const classes = classnames('notification', this.props.className);
        //classes.indexOf('light') > 0 ? close = lightIcon : darkIcon;

        return (
            <div className={classes}>
                <div className="closeButton" />
                <div className="notification-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Notification.PropTypes = {
    /* className : declares the type of notification - warning, error, success, normal(default) */
    className: PropTypes.string,
    /* title : notification title */
    title: PropTypes.string.isRequired,
}

export default Notification;