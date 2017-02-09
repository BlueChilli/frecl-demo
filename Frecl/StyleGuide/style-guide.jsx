import React from "react";
import {Map} from "immutable";
import {connect} from "react-redux";
import StyleGuide from "react-style-guide";
import {
  CheckBox, Form, Input, TextArea, Radio, RadioTab, RadioTabs, Select, Validation, Validate, DateRange,
  DatePicker, DropZone, Modal, toggleModal, Alert, addAlertItem, removeAllAlertItems, Fieldset, Row, Spinner,
  Vimeo, YouTube, GeoSuggest
} from "../exports";
import Number from '../Components/Number/Number.jsx';
import Notification from "../Components/Notification/Notification.jsx";
import ButtonSpinner from '../../app/Components/ButtonSpinner/ButtonSpinner';
import Avatar from '../../app/Components/Avatar/Avatar';
import {setDefaultValue, clearAllInputs} from "../Components/Form/Actions/fields";
import "./style-guide.scss";

const geoDefaultValue = Map({
  street: 'Missenden Road',
  city: 'Sydney',
  state: 'NSW',
  postcode: '2042'
});

const FreclStyleGuide = React.createClass({
  handleSubmit(e, fields){
    console.log(fields.toJS());
  },
  lastNameValidation(value){
    return value === 'Shane';
  },
  addSuccess(){
    this.props.dispatch(addAlertItem('alerts', 'Great success', 'This is a successful alert', 'success'));
  },
  addWarning(){
    this.props.dispatch(addAlertItem('alerts', 'Oh oh', 'Seems something odd has occurred', 'warning'));
  },
  addDanger(){
    //User must clear these alerts
    this.props.dispatch(addAlertItem('alerts', '99 Problems', 'You got 99 Problems and this error report is one', 'danger', true));
  },
  clearAlerts(){
    this.props.dispatch(removeAllAlertItems('alerts'));
  },
  toggleModal(){
    this.props.dispatch(toggleModal('modal'));
  },
  componentWillMount(){
    this.props.dispatch(setDefaultValue('StyleGuide', ['BackEndDevelopers'], 'Ella'));
  },
  clearInputs(){
    this.props.dispatch(clearAllInputs('StyleGuide'));
  },
  render() {
    return (
      <div>
        <Avatar title="Pash" color="#0000FF" backgroundColor="#FFFFFF">
          <Row>Title</Row>
          <Row>Title</Row>
        </Avatar>

        <Notification className="normal">
          <p>This is the notification text.This is the notification text.This is the notification text.</p>
        </Notification>

        <StyleGuide title="GeoSuggest">
          <Form name="GeoSuggestForm">
            <GeoSuggest defaultValue={geoDefaultValue} labelPostfix='geoLabelPostfix' label='geoLabel' name='geo' placeholder='Placeholder Text' />
          </Form>
        </StyleGuide>

        <StyleGuide title="Number">
          <Form name="NumberForm">
            <Number labelPostfix='labelPostfix' defaultValue='2' label="label" name="numberLabel" />
          </Form>
        </StyleGuide>

        <StyleGuide title="YouTube">
          <YouTube id='pPEv_hY_paA' />
        </StyleGuide>

        <StyleGuide title="Spinner">
            <Spinner color="#0000FF" />
        </StyleGuide>
        <StyleGuide title="Button Spinner">
            <ButtonSpinner color="#FFF" backgroundColor="#0000FF">Button</ButtonSpinner>
        </StyleGuide>
        <StyleGuide title="Alerts">
          <Alert id="alerts"/>
          <button className="button-primary" onClick={this.addSuccess}>Add Success</button>
          <button className="button-secondary" onClick={this.addWarning}>Add Warning</button>
          <button className="button-error" onClick={this.addDanger}>Add Danger</button>
          <button className="button-disabled" onClick={this.clearAlerts}>Clear all</button>
        </StyleGuide>
        <StyleGuide title="Modals">
          <Modal id="modal">
            Toggle View
          </Modal>
          <button onClick={this.toggleModal}>Show Modal</button>
        </StyleGuide>

        <Form name="StyleGuide" onSubmit={this.handleSubmit}>
          <StyleGuide title="Inputs">
           <button type="button" onClick={this.clearInputs}>Clear inputs</button>
            <Input autoFocus label="First Name" required defaultValue="First Name" pattern="[A-Za-z]+$"
                   name="FirstName" customValidation={this.lastNameValidation}>
              <Validation isFor="required">This field is required</Validation>
              <Validation isFor="customValidation">This field must be Shane</Validation>
            </Input>
            <Fieldset name="users" id="test">
              <Input label="Last Name" name="LastName" required minLength="2">
                <Validation isFor="required">This field is required</Validation>
              </Input>
              <Input label="First Name" name="FirstName" required minLength="2">
                <Validation isFor="required">This field is required</Validation>
              </Input>
            </Fieldset>
            <Fieldset name="users" id="test2">
              <Input label="Last Name" name="LastName" required minLength="2">
                <Validation isFor="required">This field is required</Validation>
              </Input>
              <Input label="First Name" name="FirstName" required minLength="2">
                <Validation isFor="required">This field is required</Validation>
              </Input>
            </Fieldset>
            <Input label="Currency" prepend="$" type="text" required min="10" max="100000"
                   pattern="[0-9]" name="Currency">
              <Validation isFor="required">Currency is required</Validation>
              <Validation isFor="pattern">Currency must be a number</Validation>
              <Validation isFor="min">Currency must be greater then 9</Validation>
              <Validation isFor="max">Currency must be less then 100001</Validation>
            </Input>
            <Input label="Percentage" append="%" type="number" required name="Percentage">
              <Validation isFor="pattern">Percentage must be a number</Validation>
            </Input>
            <div>Using <a target="_blank" href="https://github.com/BankFacil/vanilla-masker">vanilla masker</a>&nbsp;
              toPattern functionality to handle masking
            </div>
            <Input label="Credit Card" type="text" required name="CreditCard">
              <Validation isFor="required">Currency is required</Validation>
            </Input>
            <Input label="Expiry Date" type="text" required name="ExpiryDate">
              <Validation isFor="required">Expiry Date is required</Validation>
            </Input>
            <Input label="Email" type="email" required name="Email">
              <Validation isFor="required">Email is required</Validation>
              <Validation isFor="type">Must be a valid email</Validation>
            </Input>
            <Input label="Password" labelPostfix="Your password must be at least 6 characters long." minLength="5"
                   type="password" required name="Password">
              <Validation isFor="required">Password is required</Validation>
              <Validation isFor="minLength">Password must be 5 characters long</Validation>
            </Input>
          </StyleGuide>
          <StyleGuide title="Text Areas">
            <TextArea label="Write something" name="something"/>
         <TextArea label="With validation" required name="withValidation">
         <Validation isFor="required">With validation is required</Validation>
         </TextArea>
          </StyleGuide>
          <StyleGuide title="Switches">
            <div className="switch-container">
              <CheckBox id="tanscs" required label="Terms and Conditions" name="tandcs">
                <Validation isFor="required">Please accept the T&Cs</Validation>
              </CheckBox>
            </div>
            <div className="switch-container">
              <CheckBox defaultChecked id="red" label="Red" name="color[]"/>
              <CheckBox id="blue" label="Blue" name="color[]"/>
              <CheckBox defaultChecked id="green" label="Green" name="color[]"/>
              <Validate name="color[]" required>
                <Validation isFor="required">Please choose a color</Validation>
              </Validate>
            </div>
            <div className="switch-container">
              <Radio name="size" label="Extra Small" id="x-small"/>
              <Radio name="size" label="Small" id="small"/>
              <Radio name="size" label="Medium" id="medium"/>
              <Radio name="size" label="Large" id="large"/>
              <Validate name="size" required>
                <Validation isFor="required">Please choose a size</Validation>
              </Validate>
            </div>
            <RadioTabs name="BackEndDevelopers" label="Back End Developers">
              <RadioTab defaultValue id="Max" label="Max!"/>
              <RadioTab id="Dave" label="Dave"/>
              <RadioTab id="Ella" label="Ella"/>
            </RadioTabs>
          </StyleGuide>
          <StyleGuide title="Select">
            <Select label="Front End Developers" defaultSelected="Mick" name="FrontEndDevelopers">
              <option value="Shane">Shane</option>
              <option value="Mick">Mick</option>
              <option value="Mitch">Mitch</option>
            </Select>

            <Select label="Numbers" name="Numbers">
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Select>
          </StyleGuide>

          <StyleGuide title="Drop Zone">
            <a target="_blank" href="https://github.com/okonet/react-dropzone">Props avaliable here</a>
            <br/>
            <br/>
            <DropZone className="drop-zone" name="dropZone">
              <span>Drop stuff here</span>
            </DropZone>
          </StyleGuide>

          <StyleGuide title="Date Range">
            <DateRange label="Date Range" name="DateRange"/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </StyleGuide>

          <StyleGuide title="Date Picker">
            <DatePicker label="Date Picker" name="DatePicker"/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </StyleGuide>
          <button>Submit</button>
        </Form>
      </div>
    );
  }
});
export default connect()(FreclStyleGuide);
