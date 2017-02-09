import React, {PropTypes} from "react";
import {List} from "immutable";
import {connect} from "react-redux";
import classnames from "classnames";
import {getContext, compose} from "recompose";
import {setChosenProgressItem} from './Actions/ProgressActions';
import "./progressButtons.scss";

class ProgressButtons extends React.Component{
    switchStep(index) {
        return (e) => {
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
        console.log(this.props.index);
       return (
            <ol id="progress-buttons">
                {this.props.progressButtons.map((stepTitle, index) => {
                    return (
                        <li>{
                            React.createElement(this.props.template, {
                                title: stepTitle,
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

const mapStateToProps = (state, ownProps) => {
    return {
        progressButtons: state.getIn(['ProgressWrapperState', ownProps.progressWrapperNameSpace, 'buttons'], List()),
        index: state.getIn(['ProgressWrapperState', ownProps.progressWrapperNameSpace, 'state'], 0)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setChosenProgressItem: (index) => dispatch(setChosenProgressItem(ownProps.progressWrapperNameSpace, index))
    }
};

export default compose(
    getContext({
        progressWrapperNameSpace: PropTypes.string
    }), 
    connect(mapStateToProps, mapDispatchToProps)
)(ProgressButtons);