import React, {PropTypes} from "react";
import {List} from "immutable";
import {connect} from "react-redux";
import {getContext, compose} from "recompose";
import {setChosenProgressItem} from './Actions/ProgressActions';
import "./progressButtons.scss";

class ProgressButtons extends React.Component{
    switchStep(index) {
        return () => {
            this.props.setChosenProgressItem(index);
        };
    }

    decideChildState(index) {
        if(index === this.props.index) {
            return 'active';
        } else if(index < this.props.index) {
            return 'complete';
        }
        return '';
    }

    render() {
       return (
            <ol id="progress-buttons">
                {this.props.progressButtons.map((progressButton, index) => {
                    return (
                        <li>{
                            React.createElement(this.props.template, {
                                title: progressButton.get('title'),
                                state: this.decideChildState(index),
                                activateStep: this.switchStep(index)
                            })
                        }</li>
                    )
                })}
            </ol>
        );
    }
};

ProgressButtons.PropTypes = {
    /* template for progress button item */
    template: PropTypes.object
};

const mapStateToProps = (state, {progressButtonsNameSpace}) => {
    return {
        progressButtons: state.getIn(['ProgressWrapperState', progressButtonsNameSpace, 'buttons'], List()),
        index: state.getIn(['ProgressWrapperState', progressButtonsNameSpace, 'state'], 0)
    }
};

const mapDispatchToProps = (dispatch, {progressButtonsNameSpace}) => {
    return {
        setChosenProgressItem: (id) => dispatch(setChosenProgressItem(progressButtonsNameSpace, id))
    }
};

export default compose(
    getContext({
        progressButtonsNameSpace: PropTypes.string
    }), 
    connect(mapStateToProps, mapDispatchToProps)
)(ProgressButtons);