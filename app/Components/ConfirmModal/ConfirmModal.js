import React from "react";
import {connect} from "react-redux";
import {Modal} from "../../../Frecl/exports";
import {fireConfirmAction} from "./Actions/confirmModal"

const createSuccessButton = (dispatch, modalId) => {
  return function () {
    const fireSuccess = (e) => {
      e.preventDefault();
      dispatch(fireConfirmAction(modalId));
    };
    return <button className="button button-primary" onClick={fireSuccess}>Confirm</button>
  }
};

const cancelButton = (props) => {
  return <button {...props} className="button button-secondary">Cancel</button>
};

const ConfirmModal = ({dispatch, title, content, ...props}) => {
  return (
    <Modal cancel="Cancel" title={title} className="small"
           success={createSuccessButton(dispatch, props.id)} {...props}
           cancel={cancelButton}>{content}</Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state.getIn(['ConfirmState', 'confirm', 'title']),
    content: state.getIn(['ConfirmState', 'confirm', 'body'])
  }
};

export default connect(mapStateToProps)(ConfirmModal)
