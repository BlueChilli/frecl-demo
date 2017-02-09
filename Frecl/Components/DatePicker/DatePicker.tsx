import React from "react";
import moment from "moment";
import DateWrapper, {DateWrapperPassedDownProps} from "./DateWrapper";
import {compose} from "recompose";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import {DatePickerProps, DateRangePerformanceWrapperProps, DatePickerInputHOCWithHandlersProps} from "../Form/Types/types";
import inputHOC from "../Form/Helpers/inputHOC";
import {Calendar} from "react-date-range";
import "./DateRange.scss";




class CalendarBase extends React.Component<DatePickerInputHOCWithHandlersProps & DateWrapperPassedDownProps, {}>{
  handleChange = (dateRange) => {
    this.props.inputChanged(dateRange.format('YYYY-MM-DD'));
    this.props.close();
  }
  render() {
    return <Calendar {...this.props} onChange={this.handleChange}/>
  }
};

class DatePicker extends React.Component<DatePickerInputHOCWithHandlersProps, {}>{
  public static defaultProps:any = {
      dateFormat: 'DD/MM/YYYY',
      defaultValue: moment().format('YYYY-MM-DD')
  }
  getValue = () => {
    if (this.props.value || this.props.defaultValue) {
      return moment(this.props.value || this.props.defaultValue).format(this.props.dateFormat);
    }
    return "";
  }
  render() {
    return (
      <DateWrapper {...this.props} valueString={this.getValue()}>
        <CalendarBase {...this.props}/>
      </DateWrapper>
    );
  }
};

export default compose<DatePickerInputHOCWithHandlersProps, DatePickerProps>(
  performanceWrapper,
  inputHOC
)(DatePicker);



