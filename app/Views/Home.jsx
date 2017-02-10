import React from "react";
import {List} from "immutable";
import {push} from "react-router-redux";
import {connect} from "react-redux";
import FormGenerator from "../../Frecl/Components/FormGenerator/FormGenerator";
import ListHelper from "../../Frecl/Components/CrudHelpers/ListHelper";
import InputMapper from "../../Frecl/Components/FormGenerator/InputMapper";
import Select from "../../Frecl/Components/Select/Select";
import Form from "../../Frecl/Components/Form/Form"
import Input from "../../Frecl/Components/Input/Input"


const JobFunctionIdsComponent = ({array, ...props}) => {
  return (
    <div>
        <Select {...props}>
          {array.map(val => <option value={val.get('id')}>{val.get('title')}</option>)}
        </Select>
    </div>
  )
}

const DisplayEmployees = ({data, editListItem, deleteListItem, ...props}) => {
  const createEdit = id => e => {
    e.preventDefault();
    editListItem(id)
  }
  const createDelete = id => e => {
    e.preventDefault();
    deleteListItem(id)
  }

  return(
    <div>
      {data.map(val => (
        <ul>
          <li>{val.get('firstName')} {val.get('lastName')}</li>
          <li><a href="#" onClick={createEdit(val.get('id'))}>Edit</a></li>
          <li><a href="#" onClick={createDelete(val.get('id'))}>Delete</a></li>
        </ul>
      ))}
    </div>
  )
}

const mapOutput = (data) => {

  return data.set('jobFunctionIds', List([data.get('jobFunctionIds')]));
}


const Home = React.createClass({

  goTo(e) {
    e.preventDefault();
    this.props.dispatch(push('/doc/'));
  },
  render() {
    return (
      <div className="home-hero">
        <div className="home-hero-container">
            <FormGenerator debug apiType="Employee" stateName="EMPLOYEE" mapOutput={mapOutput}>
              <InputMapper name="firstName" />
              <InputMapper name="ratePerHour" />
              <InputMapper name="jobFunctionIds" component={<JobFunctionIdsComponent/>} />
            </FormGenerator>

          <ListHelper apiType="Employee" stateName="EMPLOYEE">
            <DisplayEmployees/>
          </ListHelper>

          <Form name="test">
            <Input name="test" label="test" defaultValue="test"/>
          </Form>

        </div>
      </div>
    );
  }
});

export default connect()(Home);


