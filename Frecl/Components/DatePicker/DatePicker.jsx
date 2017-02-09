import React from "react";
import moment from "moment";
import DateWrapper from "./DateWrapper.jsx";
import performanceWrapper from "../Form/Helpers/performanceWrapper";

import inputHOC from "../Form/Helpers/inputHOC.js";
import {Calendar} from "react-date-range";
import "./DateRange.scss";


const CalendarBase = React.createClass({
  handleChange(dateRange){
    this.props.inputChanged(dateRange.format('YYYY-MM-DD'));
    this.props.close();
  },
  render(){
    return <Calendar {...this.props} onChange={this.handleChange}/>
  }
});

const DatePicker = React.createClass({
  getDefaultProps(){
    return {
      dateFormat: 'DD/MM/YYYY',
      defaultValue: moment().format('YYYY-MM-DD')
    }
  },
  render() {
    var getValue = () => {
      if (this.props.value || this.props.defaultValue) {
        return moment(this.props.value || this.props.defaultValue).format(this.props.dateFormat);
      }
      return "";
    };
    return (
      <DateWrapper {...this.props} value={getValue()}>
        <CalendarBase {...this.props}/>
      </DateWrapper>
    );
  }
});

export default performanceWrapper(inputHOC(DatePicker));



