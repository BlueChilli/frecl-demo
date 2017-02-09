import React from "react";
import {connect} from "react-redux";
import classnames from "classnames";
import "./avatar.scss";

var onClickOutside = require('react-onclickoutside');  

const AvatarItem = ({src, title}) => (
    <div className="flex-container">
        <img className="avatarPath" src={src} />
        <span className="avatarTitle">{title}</span>
        <img className="chevron-down" src={require("../../Assets/chevron-down.png")} />
    </div>
)

const Avatar = onClickOutside(React.createClass({
    getInitialState: function() {
        return {
            childrenVisible: false
        }
    },

    toggleAvatarChildren: toggleChildren,

    render: function() {
        //console.log('render: ' + this.state.childrenVisible);
        const avatarClasses = classnames('children', {
            'avatar-container-selected': this.state.childrenVisible
        });
        
        const avatarMenuStyle = {
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#F0F0F0'
        };

        return (
            <div className='avatar-container' style={{color: this.props.color}} onClick={this.toggleAvatarChildren}>
                <AvatarItem src={this.props.src} title={this.props.title} />
                <div className={avatarClasses} style={this.state.childrenVisible ? avatarMenuStyle : null}>
                    <AvatarItem src={this.props.src} title={this.props.title}/>
                    { this.state.childrenVisible ? this.props.children : null }
                </div>
            </div>
        );
    },

    handleClickOutside: function(e) {
        this.state.childrenVisible && this.toggleAvatarChildren(e);
    }
}));

function toggleChildren(e) {
    this.setState({
        childrenVisible: !this.state.childrenVisible
    }, () => {
        //console.log('toggleChildren: ' + this.state.childrenVisible);
    });
}
export default Avatar;