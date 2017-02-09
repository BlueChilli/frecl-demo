import React, {PropTypes} from "react";
import {is, List, Map} from "immutable";
import classnames from "classnames";
import {connect} from "react-redux";
import {defer} from "lodash";
import {Dispatch} from "redux";
import {setAllInputInteractions, clearAllInputs} from "./Actions/fields";
import {isMultipleValueInput} from "./Helpers/inputHelpers";
import {ShallowCompare, BaseReactProps} from "../../types"
import {eventHandler} from "./Types/types"


type formState = Map<string, Map<string, ShallowCompare>>

export type OnSubmit = (e:any, formData:formState | FormData) => void

interface DefaultProps {
    /** Accepts different mime types and ensures the user specified onSubmit is called with data in the correct format
     * currently supports: application/json and multipart/form-data */
    encType?: string,
}

interface FormStateProps {
    FormState: formState
}

interface FormDispatchProps {
    dispatch: Dispatch<any>
}

export interface FormOwnProps extends BaseReactProps, DefaultProps {
   /** Used to namespace all child input components in the Redux store */
    name: string,
    /** Called once Form has ensured that all child Input components are valid */
    onSubmit?: OnSubmit,
    /** Called before the form is submitted, ths is a chance to modify the contents of the payload
     * primarily used by the form generator */    
    mapOutput?: Function,
    
}

interface FormProps extends FormOwnProps, FormStateProps, FormDispatchProps {}

const convertToFormData = (formMap:formState):FormData => {
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

const mapOutput = (data, mapOutputFunc) => (mapOutput) ? mapOutputFunc(data) : data;

/** Displays a form component, inserts all user input into redux state and ensures that all inputs are validated
 * before allowing the user to submit the form. */


class Form extends React.Component<FormProps, FormStateProps>{

  public static childContextTypes = {
    FormState: PropTypes.object,
    nameSpace: PropTypes.string,
    dispatch: PropTypes.func
  }

//FIXME: any to make TS happy unsure why it needs to be this way
  public static defaultProps:any = {
    encType: 'application/json',
    mapOutput: data => data
  }


  refs: {
    querySelector: any
  }

  submitted:boolean = false

  constructor(props:FormProps){
    super(props);
    this.state = {
      FormState: props.FormState
    }
  }

  getChildContext(){
    return {
      FormState: this.state.FormState,
      nameSpace: this.props.name,
      dispatch: this.props.dispatch
    }
  }

  componentWillReceiveProps(nextProps:FormProps){
    if (!is(this.state.FormState, nextProps.FormState)) {
      this.setState({
        FormState: nextProps.FormState
      })
    }
    if (this.props.name !== nextProps.name) {
      this.props.dispatch(clearAllInputs(nextProps.name));
    }
  }

  componentWillUnmount(){
    this.props.dispatch(clearAllInputs(this.props.name));
  }


  handleSubmit = e => {
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
            const niceFields = fields.map((input:Map<string, ShallowCompare>, inputName) => {
              if (isMultipleValueInput(inputName)) {
                return input.map((innerInput:Map<string, ShallowCompare>) => {
                  return innerInput.get('value');
                });
              }
              return input.get('value');
            });
            const mappedData = mapOutput(niceFields, this.props.mapOutput);
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
  }

  render(){
    const {FormState, dispatch, onSubmit, className, name, ...safeProps} = this.props;
    var classes = classnames('form', className);
    return (
      <form name={name} ref={name} onSubmit={this.handleSubmit} className={classes} noValidate {...safeProps}>
        {this.props.children}
      </form>
    );
  }
};

function mapStateToProps(state):FormStateProps{
  return {
    FormState: state.get('FormState')
  };
}

export default connect<FormStateProps, FormDispatchProps, FormOwnProps>(mapStateToProps)(Form);
export {clearAllInputs}
