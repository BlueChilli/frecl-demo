import React, {PropTypes} from "react"
import {connect} from "react-redux";
import {Map, fromJS, is} from "immutable";
import InputWrapper from "../../../Frecl/Components/Form/InputWrapper";
import InputGroup from "../../../Frecl/Components/Form/InputGroup";
import Input from "../../../Frecl/Components/Input/Input";
import Number from "../../../Frecl/Components/Number/Number";
import inputHOC from "../../../Frecl/Components/Form/Helpers/inputHOC";
import performanceWrapper from "../../../Frecl/Components/Form/Helpers/performanceWrapper";
import DisplayValidation from "../../../Frecl/Components/Validation/DisplayValidation";
import GeoSuggest from "react-geosuggest"
import classnames from "classnames";
// import "./GeoSuggest.scss";
import {trim} from "lodash";
import {getContext, compose} from "recompose";


const Base = inputHOC(React.createClass({
  componentWillMount(){
    this.props.inputChanged(this.props.defaultValue, false)
  },

  handleNoResults(change = ""){
    if (change.length === 0) {
      this.props.inputChanged(Map())
    }
  },

  handleChange(change){
    const niceMap = fromJS(change).getIn(['gmaps', 'address_components'], Map()).toMap().mapEntries(entries => {
      const innerVal = entries[1];
      return [
        innerVal.getIn(['types', 0]), innerVal.get('long_name')
      ]
    });

    const street = classnames(niceMap.get('subpremise'), niceMap.get('street_number'), niceMap.get('route'));
    const mapsInfo = Map({
      street,
      city: niceMap.get('locality'),
      state: niceMap.get('administrative_area_level_1'),
      postCode: niceMap.get('postal_code'),
      country: niceMap.get('country'),
    });
    this.props.inputChanged(mapsInfo);
  },
  render(){
    const {defaultValue} = this.props;
    const addressDefault = classnames(defaultValue.get('street'), defaultValue.get('city'), defaultValue.get('state'), defaultValue.get('postcode'));

    return (
      <GeoSuggest disabled={this.props.disabled} initialValue={addressDefault} autoActivateFirstSuggest={true}
                  onSuggestSelect={this.handleChange} onSuggestNoResults={this.handleNoResults}
                  placeholder={this.props.placeholder} country="au"/>
    )
  }
}));

const FreclGeoSuggest = React.createClass({
  render(){
    const classes = classnames(this.props.className, 'input');
    return (
      <InputWrapper {...this.props} className={classes}>
        <InputGroup>
          <Base {...this.props}/>
        </InputGroup>
        <DisplayValidation {...this.props}/>
      </InputWrapper>
    );
  }
});

const WrappedGeoSuggest = performanceWrapper(FreclGeoSuggest);

const FullFormGeoSuggest = React.createClass({
  defaultProps: {
    defaultValue: Map()
  },
  getInitialState(){
    return {
      fullForm: false,
      defaultValue: this.props.defaultValue
    }
  },
  toggleFullForm(e){
    e.preventDefault();
    this.setState({
      fullForm: !this.state.fullForm
    })
  },
  componentWillReceiveProps(nextProps){
    if (!is(this.props.defaultValue, nextProps.defaultValue)) {
      this.setState({
        defaultValue: nextProps.defaultValue
      })
    }
  },
  shouldComponentUpdate(nextProps, nextState){
    if (this.state.fullForm !== nextState.fullForm) {
      this.setState({
        defaultValue: nextState.fullForm ? nextProps.userAddress.merge(nextProps.geoSuggest) : nextProps.geoSuggest.merge(nextProps.userAddress)
      })
    }
    return true;
  },
  render(){
    return (
      <div className={this.state.fullForm ? "address-full-form" : "address-single-input"}>
        {!this.state.fullForm &&
        <WrappedGeoSuggest disabled={this.state.fullForm} {...this.props} defaultValue={this.state.defaultValue}/>}
        {this.state.fullForm && (
          <div>
            <Input labelPostfix={this.props.labelPostfix} defaultValue={this.state.defaultValue.get('street', '')} label="Street" name="street"/>
            <Input labelPostfix={this.props.labelPostfix} defaultValue={this.state.defaultValue.get('city', '')} label="Suburb" name="city"/>
            <Input labelPostfix={this.props.labelPostfix} defaultValue={this.state.defaultValue.get('state', '')} label="State" name="state"/>
            <Number labelPostfix={this.props.labelPostfix} defaultValue={this.state.defaultValue.get('postCode', '')} label="Post Code" name="postcode"/>
          </div>
        )}
        <Input type="hidden" name="addressFullForm" defaultValue={this.state.fullForm}/>

        <div className="address-toggle">
          {!this.state.fullForm && <a href="#" onClick={this.toggleFullForm}>Can't find your address?</a>}
          {this.state.fullForm && <a href="#" onClick={this.toggleFullForm}>Back to automatic lookup</a>}
        </div>
      </div>
    )
  }
});

const mapStateToProps = (state, {nameSpace, name}) => {
  return {
    geoSuggest: state.getIn(['FormState', nameSpace, name, 'value']),
    userAddress: Map({
      street: state.getIn(['FormState', nameSpace, 'street', 'value']),
      city: state.getIn(['FormState', nameSpace, 'city', 'value']),
      state: state.getIn(['FormState', nameSpace, 'state', 'value']),
      postcode: state.getIn(['FormState', nameSpace, 'postcode', 'value'])
    })
  }
};


export default compose(
  getContext({
    nameSpace: PropTypes.string,
  }),
  connect(mapStateToProps)
)(FullFormGeoSuggest)

