import React, {PropTypes} from "react";
import {connect} from "react-redux";
import classnames from "classnames";
import ToggleView from "../ToggleView/ToggleView.jsx";
import {toggleModal} from "./Actions/Modal";
import close from "./cross.svg";
import "./Modal.scss";

export const COMPONENT_NAME = "Modal";


const ModalFooter = ({cancel = false, success = false, toggleModal}) => {
  if (cancel || success) {
    return (
      <div className="modal-footer">
        {cancel && React.createElement(cancel, {
          onClick: toggleModal
        })}
        {success && React.createElement(success)}
      </div>
    )
  }
  return <noscript/>;
};

/** Basic modal component for showing and hiding a modal */
const Modal = ({className, id, title, toggleModal, children, ...props}) => {
  const classes = classnames('modal', className);
  return (
    <ToggleView component={COMPONENT_NAME} id={id}>
        <div className="modal-wrapper">
          <div onClick={toggleModal} className="modal-background"></div>
          <div className={classes}>
            <div className="modal-header">
              <h1>{title}</h1>
            </div>
            <div className="modal-content">
              {children}
            </div>
            <ModalFooter {...props} toggleModal={toggleModal}/>
            <button className="modal-close" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      </ToggleView>
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  /** Passed down to toggle view to specify what component to toggle must be unique among modals */
  id: PropTypes.string.isRequired,
  /** The modals title */
  title: PropTypes.string,
  /** The content of the modal */
  children: PropTypes.any,
  /** Display a cancel button */
  cancel: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  /** Display a select button that is passed in by the user */
  success: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ])
};


const mapDispatchToProps = (dispatch, {id}) => {
  return {
    toggleModal: () => dispatch(toggleModal(id))
  }
};

export default connect(null, mapDispatchToProps)(Modal);
export {toggleModal}
