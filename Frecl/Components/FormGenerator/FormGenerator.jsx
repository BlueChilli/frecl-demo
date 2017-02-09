import React, { PropTypes } from "react";
import { Map, List, Set, fromJS, Iterable } from "immutable";
import { connect } from "react-redux";
import { getFormSchema, submitGeneratedForm } from "./actions";
import FormSubmit from "../../../app/Components/FormSubmit/FormSubmit";
import { camelCase, upperFirst } from "lodash";

import { withProps, compose } from "recompose";


import InputMapper from "./InputMapper.jsx";


/** Retrieves a form schema from the server then generates a form. InputMapper can be used with the component to create
 * more customized layouts, built on FrECL forms and accepts the same arguments as FormSubmit */
const FormGenerator = React.createClass({
  propTypes: {
    /** The Swagger key used to retrieve the form schema. You do not need to include the basename or the origin */
    apiType: PropTypes.string.isRequired,
    /** The Swagger submission type if it's not an Add or Update request */
    apiVerb: PropTypes.string,
    className: PropTypes.string,
    /** FSA type to execute post and edit actions on */
    stateName: PropTypes.string,
    /** Executed on successfully adding the the form data to both server and application state */
    onSubmitSuccess: PropTypes.func,
    /** Executed on a failed attempt to adding the the form data to server and application state */
    onSubmitError: PropTypes.func,
    /** A map that accepts to properties rename and transform. Rename is a string that replaces the key of the data
     * transform is a function that returns transformed data */
    mapInputs: PropTypes.instanceOf(Map),
    /** Id of the data inside apiType you wish to edit */
    editId: PropTypes.number,
    /** Arguments to merge into the form as default values */
    editArgs: PropTypes.instanceOf(Map),
  },

  getInitialState() {
    return {
      usedFields: Set()
    }
  },

  registerInputMapper(inputMapperName) {
    this.setState(({usedFields}) => {
      return {
        usedFields: usedFields.add(inputMapperName)
      };
    });
  },

  unregisterInputMapper(inputMapperName) {
    this.setState(({usedFields}) => {
      return {
        usedFields: usedFields.delete(inputMapperName)
      };
    })
  },

  childContextTypes: {
    formSchema: PropTypes.object,
    registerInputMapper: PropTypes.func,
    unregisterInputMapper: PropTypes.func
  },

  getChildContext() {
    return {
      formSchema: this.props.properties,
      registerInputMapper: this.registerInputMapper,
      unregisterInputMapper: this.unregisterInputMapper
    }
  },

  getUnusedFields(properties) {
    const {usedFields} = this.state;
    if (usedFields.size > 0) {
      return properties.filter((control, name) => {

        return !usedFields.includes(name);
      });
    }
    return properties;
  },

  handleSubmit(e, formData) {
    if (this.props.onSubmit) {
      this.props.onSubmit(e, formData, this.props.submitGeneratedForm);
    } else {
      this.props.submitGeneratedForm(formData, this.props.encType);
    }
  },

  render() {
    const {stateName, pathname, onSubmitSuccess, getFormSchema, submitGeneratedForm, children, properties, formProps = Map({}), edit, submitButton = "Submit", footer, ...safeProps} = this.props;
    const unusedFields = this.getUnusedFields(properties);
    return (
      <FormSubmit stateName={ safeProps.name } buttonText={ submitButton } onSubmit={ this.handleSubmit } encType={ this.props.encType } {...safeProps}>
        { children }
        { /*{unusedFields.map((field, name) => <InputMapper name={name} notUserCreated/>)}*/ }
        { footer }
      </FormSubmit>
      );
  }
});

const mapStateToProps = (state, {apiType, editId = false, editArgs = Map()}) => {
  const stateLocation = `${compose(upperFirst, camelCase)(apiType)}State`;
  const editIdPath = editId ? editId : state.getIn([stateLocation, 'editItem', 'id'], Map({}));
  return {
    editArgs: state.getIn([stateLocation, apiType, 'data', editIdPath], Map({})).merge(editArgs)
  };
};


const createControlsEdit = (properties, editArgs = Map()) => {
  return properties.map((value, key) => {
    if (editArgs.has(key)) {
      return value.merge({
        defaultValue: fromJS(editArgs.get(key), (key, value) => {
          return value.toMap();
        })
      });
    } else if (editArgs.hasIn([key, 'fullAddress'])) {
      return value.merge({
        defaultValue: fromJS(editArgs.getIn([key, 'fullAddress'], ''))
      });
    }
    return value;
  });
};

const removeFieldsByRole = (properties, roles = List([])) => {
  if (List.isList(roles) && roles.size > 0) {
    return properties.filter(value => {
      if (value.hasIn(['x-blue-ApiVisibility', 'roles'])) {
        const fieldRoles = value.getIn(['x-blue-ApiVisibility', 'roles']);
        return fieldRoles.some(value => {
          return roles.keyOf(value) !== undefined;
        });
      }
      return true;
    })
  }
  return properties;
};

const mapInputs = (editArgs, mapInputsFunction = (args) => args) => {
  if (Iterable.isIterable(mapInputsFunction)) {
    console.warn('Using mapInputs as an Immutable object is depricated please pass in a function', 'Date: 12/01/17')
    return editArgs.mapEntries(([key, value]) => {
      if (mapInputsFunction.has(key)) {
        if (mapInputsFunction.hasIn([key, 'rename']) && mapInputsFunction.hasIn([key, 'transform'])) {
          return [mapInputsFunction.getIn([key, 'rename']), mapInputsFunction.getIn([key, 'transform'])(value)];
        } else if (mapInputsFunction.hasIn([key, 'rename'])) {
          return [mapInputsFunction.getIn([key, 'rename']), value];
        } else if (mapInputsFunction.hasIn([key, 'transform'])) {
          return [key, mapInputsFunction.getIn([key, 'transform'])(value)];
        }
      }
      return [key, value];
    });
  }
  return mapInputsFunction(editArgs);
};


export default compose(connect(mapStateToProps),
  withProps(props => {
    const {dispatch, apiType, stateName, onSubmitSuccess, onSubmitError} = props;
    const submitType = props.editArgs.size > 0 ? "Update" : "Add";
    const {apiVerb = submitType} = props;
    const baseInfo = window.client.getIn([props.apiType, props.apiType + '_' + apiVerb], Map({}));
    const parameters = baseInfo.get('parameters', Map()).groupBy(value => value.get('in'));
    const properties = parameters.getIn(['body', 0, 'schema', 'properties'], parameters.getIn(['formData', 0, 'schema', 'properties'], Map({})));
    const pathArgs = parameters.get('path', Map({})).toMap().mapEntries(entries => {
      const value = entries[1];
      return [value.get('name'), props.editArgs.get(value.get('name'))];
    });
    const roleSafeProperties = removeFieldsByRole(properties, props.roles);
    const mappedEditArgs = mapInputs(props.editArgs, props.mapInputs);
    const apiCreator = pathArgs => (data, params) => baseInfo.get('api')(data, params, pathArgs);
    const name = apiType + '_' + apiVerb;
    return {
      properties: createControlsEdit(roleSafeProperties, mappedEditArgs),
      encType: baseInfo.getIn(['consumes', 0]),
      name,
      submitGeneratedForm: (formData) => dispatch(submitGeneratedForm(name, formData, apiCreator(pathArgs), apiType, stateName, onSubmitSuccess, onSubmitError))
    };
  })
)(FormGenerator)
