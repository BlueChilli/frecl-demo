import React, {PropTypes} from "react";
import {is, List, Iterable} from "immutable";
import {registerProgressButton, changeStep} from "./Actions/ProgressActions";
import {getContext, compose} from "recompose";
import {connect} from "react-redux";

class ProgressItem extends React.Component{
    constructor(props){
        super(props);
        this.id = Math.random().toString(36).substring(7);
    }
    componentWillMount(){
        this.props.registerProgressButton(this.id);
    }
    componentWillReceiveProps({chosenProgressItemIndex, chosenProgressId, notDisplayed, changeStep}){
        if(this.id === chosenProgressId && notDisplayed){
            changeStep(chosenProgressItemIndex - this.props.chosenProgressItemIndex)
        }
    }
    render(){
        if(this.id === this.props.chosenProgressId) {
            return <div>{this.props.children}</div>; // would it work without the div?
        }
        return null;
    }
}

ProgressItem.id = null

const mapStateToProps = (state, {progressButtonsNameSpace}) => {
    const chosenProgressItemIndex = state.getIn(['ProgressWrapperState', progressButtonsNameSpace, 'state'], 0);
    return {
        chosenProgressItemIndex,
        chosenProgressId: state.getIn(['ProgressWrapperState', progressButtonsNameSpace, 'buttons', chosenProgressItemIndex, 'id'], 0),
        progressButtons: state.getIn(['ProgressWrapperState', progressButtonsNameSpace, 'buttons'], List())
    }
};

const mapDispatchToProps = (dispatch, {progressButtonsNameSpace, title}) => ({
   registerProgressButton: (id) => dispatch(registerProgressButton(progressButtonsNameSpace, title, id)),
   changeStep: (step) => dispatch(changeStep(progressButtonsNameSpace, step))
});


export default compose(
    getContext({
        progressButtonsNameSpace: PropTypes.string
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(ProgressItem)