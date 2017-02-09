import React from "react";
import moment from "moment";
import DateWrapper from "./DateWrapper.jsx";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import inputHOC from "../Form/Helpers/inputHOC.js";
import {DateRange} from "react-date-range";
import "./DateRange.scss";

const DateRangeBase = React.createClass({
  handleChange(dateRange){
    this.props.inputChanged({
      startDate: dateRange.startDate.format('YYYY-MM-DD'),
      endDate: dateRange.endDate.format('YYYY-MM-DD')
    });
  },
  render(){
    return <DateRange {...this.props} calendars={1} onChange={this.handleChange}/>
  }
});

const getValue = (dateRange, dateFormat) => {
  if (dateRange) {
    return moment(dateRange.startDate).format(dateFormat) + " to " + moment(dateRange.endDate).format(dateFormat);
  }
  return "";
};

const DateRangePicker = ({dateFormat = "DD/MM/YYYY", value, ...props}) => (
  <DateWrapper {...props} value={getValue(value, dateFormat)}>
    <DateRangeBase {...props}/>
  </DateWrapper>
);


export default performanceWrapper(inputHOC(DateRangePicker));

