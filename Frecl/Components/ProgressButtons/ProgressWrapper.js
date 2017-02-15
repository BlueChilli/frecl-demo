import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {clearProgressWrapperState} from "./Actions/ProgressActions"

class ProgressWrapper extends React.Component{
    getChildContext(){
        return {
            progressButtonsNameSpace: this.props.name
        }
    }
    componentWillUnmount(){
        this.props.clearProgressWrapperState();
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

ProgressWrapper.childContextTypes = {
    progressButtonsNameSpace: PropTypes.string
}

const mapDispatchToProps = (dispatch, {name}) => ({
    clearProgressWrapperState: () => {
        dispatch(clearProgressWrapperState(name));
    }
})

export default connect(null, mapDispatchToProps)(ProgressWrapper)

//TODO: Move ProgressButtons outside ProgressWrapper