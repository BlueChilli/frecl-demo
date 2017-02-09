import React, {PropTypes} from "react";
import {Map} from "immutable";
import {connect} from "react-redux";
import {addListItem, removeListItem} from "./Actions/ListView";

const ListView = React.createClass({
  propTypes: {
    id: PropTypes.string.isRequired
  },
  closeListItem(index){
    this.props.dispatch(removeListItem(this.props.component, this.props.id, index));
  },
  render() {
    const listItems = this.props.listIds.getIn([this.props.component, this.props.id], Map());
    return (
      <div className={this.props.className}>{
        listItems.map((listItem, index) => {
          return React.createElement(listItem.get('template'), {
            close: this.closeListItem.bind(this, index),
            key: index,
            ...listItem.get('props')
          });
        }).valueSeq().toJS()
      }</div>
    );
  }
});

function mapStateToProps(state) {
  return {
    listIds: state.get('ListViewState')
  }
}


export default connect(mapStateToProps)(ListView);
export {addListItem, removeListItem};