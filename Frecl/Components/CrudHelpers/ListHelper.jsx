import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {getList, setEditListItem, deleteListItem, getNextPage, resetEditListItem} from "./Actions/List"
import CrudHelperWrapper from "./CrudHelperWrapper.jsx"


/** A component to display, edit and delete a list of paginated elements */
const ListHelper = React.createClass({
  propTypes: {
    /** {Passed Down} a function to retrieve the next page in a paginated array */
    getNextPage: PropTypes.func.isRequired,
    /** {Passed Down} a function to delete an item in the dataset
     * @param: {string, number} the id of the list item to delete, available in the data prop */
    deleteListItem: PropTypes.func.isRequired,
    /** {Passed Down} a function to trigger and edit on and attached form generator for an item in the dataset
     * @param: {string, number} the id of the list item to edit, available in the data prop */
    editListItem: PropTypes.func.isRequired,
    /** {Passed Down} */
    // nextDisplayed: PropTypes.bool.isRequired
    /** Specified by the user used to display the data passed down by list helper */
    children: PropTypes.element
  },
  componentWillUnmount(){
    this.props.resetEditState()
  },
  render(){
    const {data, children, getNextPage, editListItem, deleteListItem, resetEditState, nextDisplayed, ...props} = this.props;
    return (
      <CrudHelperWrapper {...props}>
        {React.Children.map(children, child => React.cloneElement(child, {
          data,
          getNextPage,
          deleteListItem,
          editListItem,
          resetEditState,
          nextDisplayed
        }))}
      </CrudHelperWrapper>
    );
  }
});

const mapStateToProps = (state, {apiType, stateName}) => {
  return {
    // isEdit:
    // nextDisplayed: state.getIn([statePath, ...path, 'currentPage']) !== state.getIn([statePath, ...path, 'pageCount']) && data.size > 0
  };
};

const mapDispatchToProps = (dispatch, {stateName, apiType}) => {
  const deleteApi = window.client.getIn([apiType, `${apiType}_Delete`, 'api']);
  return {
    editListItem: (id) => dispatch(setEditListItem(stateName, id)),
    deleteListItem: (id) => dispatch(deleteListItem(stateName, id, deleteApi)),
    getNextPage: () => dispatch(getNextPage(stateName, apiType)),
    resetEditState: () => dispatch(resetEditListItem(stateName))
  }
};


export {resetEditListItem};

export default connect(mapStateToProps, mapDispatchToProps)(ListHelper);