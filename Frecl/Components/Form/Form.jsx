import React, {PropTypes} from "react";
import {is, List, Map} from "immutable";
import classnames from "classnames";
import {connect} from "react-redux";
import {defer} from "lodash";
import {setAllInputInteractions, clearAllInputs} from "./Actions/fields";
import {isMultipleValueInput} from "./Helpers/inputHelpers";

const convertToFormData = (formMap) => {
  const formData = new FormData();
  formMap.forEach((value, key) => {
    if (Map.isMap(value)) {
      value.map((innerVal, index) => {
        formData.append(key + `.${index}`, innerVal);
      })
    } else if (List.isList(value)) {
      value.map((innerVal, index) => {
        formData.append(key + `[${index}]`, innerVal);
      })
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

const mapOutput = (mapOutput = false, data) => (mapOutput) ? mapOutput(data) : data;

/** Displays a form component, inserts all user input into redux state and ensures that all inputs are validated
 * before allowing the user to submit the form. */
var Form = React.createClass({
  submitted: false,

  getInitialState(){
    return {
      FormState: this.props.FormState
    }
  },

  propTypes: {
    /** Used to namespace all child input components in the Redux store */
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    /** Called once Form has ensured that all child Input components are valid */
    onSubmit: PropTypes.func,
    /** Accepts different mime types and ensures the user specified onSubmit is called with data in the correct format
     * currently supports: application/json and multipart/form-data */
    encType: PropTypes.string,
    mapOutput: PropTypes.func
  },

  getDefaultProps(){
    return {
      encType: 'application/json'
    }
  },

  childContextTypes: {
    FormState: PropTypes.object,
    nameSpace: PropTypes.string,
    dispatch: PropTypes.func
  },

  getChildContext(){
    return {
      FormState: this.state.FormState,
      nameSpace: this.props.name,
      dispatch: this.props.dispatch
    }
  },

  componentWillReceiveProps(nextProps){
    if (!is(this.state.FormState, nextProps.FormState)) {
      this.setState({
        FormState: nextProps.FormState
      })
    }
    if (this.props.name !== nextProps.name) {
      this.props.dispatch(clearAllInputs(nextProps.name));
    }
  },

  componentWillUnmount(){
    this.props.dispatch(clearAllInputs(this.props.name));
  },


  handleSubmit(e){
    e.preventDefault();
    if (!this.submitted) {
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
      }, 2500);
      this.props.dispatch(setAllInputInteractions(this.props.name, "changed", true));
      defer(() => {
        const form = this.refs[this.props.name];
        const firstError = form.querySelector('.invalid');
        if (firstError === null) {
          if (this.props.onSubmit) {
            const fields = this.props.FormState.get(this.props.name);
            const niceFields = fields.map((input, inputName) => {
              if (isMultipleValueInput(inputName)) {
                return input.map(innerInput => {
                  return innerInput.get('value');
                });
              }
              return input.get('value');
            });
            const mappedData = mapOutput(this.props.mapOutput, niceFields);
            if (this.props.encType === "multipart/form-data") {
              this.props.onSubmit(e, convertToFormData(mappedData));
            } else {
              this.props.onSubmit(e, mappedData.mapEntries(([key, value]) => [key.replace('[]', ''), value]));
            }
          }
        } else {
          const scrollTo = firstError.getBoundingClientRect().top - 50;
          if (scrollTo < 0) {
            window.scrollTo(0, document.body.scrollTop + scrollTo - 5);
          }
        }
      });
    }
  },

  render(){
    const {FormState, dispatch, onSubmit, className, name, apiType, editArgs, ...safeProps} = this.props;
    var classes = classnames('form', className);
    return (
      <form name={name} ref={name} onSubmit={this.handleSubmit} className={classes} noValidate {...safeProps}>
        {this.props.children}
      </form>
    );
  }
});

function mapStateToProps(state) {
  return {
    FormState: state.get('FormState')
  };
}

export default connect(mapStateToProps)(Form);
export {clearAllInputs}
