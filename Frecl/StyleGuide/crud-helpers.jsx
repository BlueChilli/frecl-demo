import React from "react";
import {connect} from "react-redux";
import {Input} from "../exports.js";
import {stubObject} from "lodash";
import InputMapper from "../Components/FormGenerator/InputMapper";
import FormGenerator from "../Components/FormGenerator/FormGenerator";
import "./style-guide.scss";


const ListChildDisplay = ({value, deleteListItem, editListItem}) => {
  const deleteItem = (e) => {
    e.preventDefault();
    deleteListItem(value.get('id'));
  };

  const editItem = (e) => {
    e.preventDefault();
    editListItem(value.get('id'));
  };

  return (
    <div>
      {value.get('amount') + " id:" + value.get('id')}
      <a href="#" onClick={deleteItem}>Delete</a><span> </span>
      <a href="#" onClick={editItem}>Edit</a>
    </div>
  )
};

const ListDisplay = ({data, deleteListItem, editListItem, getNextPage, nextDisplayed}) => (
  <div>
    {data.map(value => (
      <ListChildDisplay deleteListItem={deleteListItem} value={value} editListItem={editListItem}/>
    ))
    }
    {nextDisplayed && <button onClick={getNextPage}>Next</button>}
  </div>
);


const CrudHelpers = ({submitSuccess}) => (
  <div>
  
    {/*<ListHelper stateName="TEST" pathname="test">*/}
    {/*<ListDisplay/>*/}
    {/*</ListHelper>*/}
    <FormGenerator stateName="TEST" apiType="UserAccount">
      <InputMapper name="firstName"/>
      <InputMapper name="email" component={<Input/>}/>
      <InputMapper name="password"/>
      <InputMapper name="lastName"/>      
    </FormGenerator>

     <FormGenerator stateName="TEST" apiType="UserSession">
      <InputMapper name="email" component={<Input/>}/>
      <InputMapper name="password"/>
    </FormGenerator>

  </div>
);


const mapDispatchToProps = (dispatch) => {
  return {
    submitSuccess: (res) => {
      dispatch({
        type: "YEAH_WHAT",
        payload: {},
        meta: {notification: {status: 'success', success: 'Form generator submitted'}}
      })
    }
  }
};

export default connect(stubObject, mapDispatchToProps)(CrudHelpers);