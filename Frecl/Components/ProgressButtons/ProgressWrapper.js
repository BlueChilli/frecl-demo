import React, {PropTypes} from "react";

class ProgressWrapper extends React.Component{
    getChildContext(){
        return {
            progressWrapperNameSpace: this.props.name
        }
    }
    render() {
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

ProgressWrapper.childContextTypes = {
    progressWrapperNameSpace: PropTypes.string
}

export default ProgressWrapper

//TODO: Move ProgressButtons outside ProgressWrapper