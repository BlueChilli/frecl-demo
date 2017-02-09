import React from "react";
import moment from "moment";
import DateWrapper from "./DateWrapper";
import performanceWrapper from "../Form/Helpers/performanceWrapper";
import inputHOC from "../Form/Helpers/inputHOC";
import {compose} from "recompose";
import {Map} from "immutable";
import {isFunction} from "lodash"
import {DateRange} from "react-date-range";
import {DateRangeProps, DateRangePerformanceWrapperProps, DateRangeInputHOCWithHandlersProps} from "../Form/Types/types";
import {DateRangeMap, DateRangeMoment} from "../../types";
import "./DateRange.scss";


class DateRangeBase extends React.Component<DateRangeInputHOCWithHandlersProps, {}>{
  handleChange = (dateRange: DateRangeMoment) => {
    this.props.inputChanged(Map<string, string>({
      startDate: dateRange.startDate.format('YYYY-MM-DD'),
      endDate: dateRange.endDate.format('YYYY-MM-DD')
    }));
    if(isFunction(this.props.onChange)){
      this.props.onChange(dateRange);
    }
  }
  render(){
    return <DateRange {...this.props} calendars={1} onChange={this.handleChange}/>
  }
};

const getValue = (dateRange: DateRangeMap, dateFormat:string) => {
  if (Map.isMap(dateRange)) {
    return moment(dateRange.get('startDate')).format(dateFormat) + " to " + moment(dateRange.get('endDate')).format(dateFormat);
  }
  return moment().format(dateFormat) + " to " + moment().format(dateFormat);;
};

const DateRangePicker = ({dateFormat = "DD/MM/YYYY", value, ...props}:DateRangeInputHOCWithHandlersProps) => (
  <DateWrapper {...props} valueString={getValue(value, dateFormat)}>
    <DateRangeBase {...props}/>
  </DateWrapper>
);


export default compose<DateRangeInputHOCWithHandlersProps, DateRangeProps>(
  performanceWrapper,
  inputHOC
)(DateRangePicker);

