import React, {PropTypes, ReactElement} from "react";
import {connect} from "react-redux";
import {setEditListItem, deleteListItem, getNextPage, resetEditListItem} from "./Actions/List"
import CrudHelperWrapper, {CrudHelperChildProps} from "./CrudHelperWrapper"
import {BaseReactProps} from "../../types"

declare var window;

export interface DispatchProps extends BaseReactProps{
   /** {Passed Down} a function to retrieve the next page in a paginated array */
    getNextPage: () => undefined,
    /** {Passed Down} a function to delete an item in the dataset
     * @param: {string, number} the id of the list item to delete, available in the data prop */
    deleteListItem:(id: string | number) => undefined,
    /** {Passed Down} a function to trigger and edit on and attached form generator for an item in the dataset
     * @param: {string, number} the id of the list item to edit, available in the data prop */
    editListItem: (id: string | number) => undefined,
    /** {Passed Down} */
    // nextDisplayed: boolean
    resetEditState: () => undefined
}

interface ListHelperProps extends DispatchProps, CrudHelperChildProps {}

interface DataProps {
  data: any
}

interface ListHelperChildProps extends BaseReactProps, DispatchProps, DataProps{}

type ListHelperChild = ReactElement<ListHelperChildProps>



/** A component to display, edit and delete a list of paginated elements */
class ListHelper extends React.Component<ListHelperProps, {}>{
  componentWillUnmount(){
    this.props.resetEditState()
  }
  render(){
    const {data, children, getNextPage, editListItem, deleteListItem, resetEditState, ...props} = this.props;
    return (
      <CrudHelperWrapper {...props}>
        {React.Children.map<ListHelperChild>(children, (child:ListHelperChild) => React.cloneElement(child, {
          data,
          getNextPage,
          deleteListItem,
          editListItem,
          resetEditState
        }))}
      </CrudHelperWrapper>
    );
  }
};

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

export default connect<{}, DispatchProps, CrudHelperChildProps>(() => ({}), mapDispatchToProps)(ListHelper);