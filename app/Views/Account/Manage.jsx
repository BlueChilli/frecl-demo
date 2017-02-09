import React from "react";
import {connect} from "react-redux";
import Modal, {toggleModal} from "../../../Frecl/Components/Modal/Modal.jsx";
import {Map} from "immutable";
import {Input, FormGenerator, InputMapper, Row, Col} from "../../../Frecl/exports";
import {createEasyNotification} from '../../Actions/Notification';

const Manage = ({preferences, changeEmail, changePassword, createToggleModal}) => (
  <div>
    <h1>My Account</h1>

    <table>
      <tbody>
        <tr>
          <td><strong>Email</strong></td>
          <td>{preferences.get('email')}</td>
          <td><a href="#" onClick={createToggleModal('emailModal')}>Change Email</a></td>
        </tr>

        <tr>
          <td><strong>Password</strong></td>
          <td>&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</td>
          <td><a href="#" onClick={createToggleModal('passwordModal')}>Change Password</a></td>
        </tr>

        <tr>
          <td><strong>Full Name</strong></td>
          <td colSpan="2">{preferences.get('firstName') + ' ' + preferences.get('lastName')}</td>
        </tr>

        <tr>
          <td><strong>Profile Photo</strong></td>
          <td colSpan="2">{preferences.get('profilePhotoPath')}</td>
        </tr>

        <tr>
          <td><strong>Roles</strong></td>
          <td colSpan="2">{preferences.get('roles', []).join(', ')}</td>
        </tr>

        <tr>
          <td><strong>Status</strong></td>
          <td colSpan="2">{preferences.get('status')}</td>
        </tr>
      </tbody>
    </table>

    <Modal id="emailModal" className="small">
      <Row>
        <Col>
          <h1><span className="icon icon-user"/>Change Email</h1>
          <FormGenerator stateName="ACCOUNT" apiType="UserAccount" apiVerb="Patch" onSubmitSuccess={changeEmail}>
            <InputMapper name="email" component={<Input/>}/>
          </FormGenerator>
        </Col>
      </Row>
    </Modal>

    <Modal id="passwordModal" className="small">
      <Row>
        <Col>
          <h1><span className="icon icon-user"/>Change Password</h1>
          <FormGenerator stateName="ACCOUNT" apiType="UserAccount" apiVerb="Patch" onSubmitSuccess={changePassword}>
            <InputMapper name="currentPassword" component={<Input type="password"/>}/>
            <InputMapper name="password" component={<Input type="password"/>}/>
          </FormGenerator>
        </Col>
      </Row>
    </Modal>
  </div>
);

const mapStateToProps = state => ({
  preferences: state.getIn(['AccountState', 'Account', 'data'], Map())
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: () => {
    dispatch(toggleModal('passwordModal'));
    dispatch(createEasyNotification('success', 'Your password has been changed successfully'));
  },

  changeEmail: () => {
    dispatch(toggleModal('emailModal'));
    dispatch(createEasyNotification('success', 'Your email has been modified successfully.'));
  },

  createToggleModal: (modalId) => () => dispatch(toggleModal(modalId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Manage);