import React, {PropTypes} from "react";
import {List} from "immutable";
import {registerProgressButton} from "./Actions/ProgressActions";
import {getContext, compose} from "recompose";
import {connect} from "react-redux";

class ProgressItem extends React.Component{
    componentWillMount(){
        this.props.registerProgressButton()
    }
    render(){
        if(this.props.index - 1 === this.props.chosenProgressItem) {
            return <div>{this.props.children}</div>; // would it work without the div?
        }
        return null;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        chosenProgressItem: state.getIn(['ProgressWrapperState', ownProps.progressWrapperNameSpace, 'state'], 0)
    }
};

const mapDispatchToProps = (dispatch, {progressWrapperNameSpace, title}) => {
    return {
        registerProgressButton: () => dispatch(registerProgressButton(progressWrapperNameSpace, title))
    }
}


export default compose(
    getContext({
        progressWrapperNameSpace: PropTypes.string
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(ProgressItem)