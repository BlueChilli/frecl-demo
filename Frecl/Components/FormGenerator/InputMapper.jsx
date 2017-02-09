import React, {PropTypes, isValidElement, cloneElement} from "react";
import {Map, fromJS, List, Iterable} from "immutable";
import classnames from "classnames";
import {Input, CheckBox, TextArea, Radio, Select, Validate, DropZone, Number, DatePicker} from "../../exports"
import {validationsAvailable} from "../../Helpers/validate";
import {getContext, withProps, compose} from "recompose";
import {isUndefined, size} from "lodash";

const booleanArray = fromJS([{
  description: 'Yes',
  value: true
}, {
  description: 'No',
  value: false
}]);

const chooseSwitchControl = (inputAttributes) => {
  if (inputAttributes.get('type') === 'checkbox') {
    return value => (
      <CheckBox label={value.get('text', value.get('label'))} name={inputAttributes.get('name') + '[]'}
                id={value.get('value')} key={value.get('value')}/>
    );
  } else {
    return value => {
      return (
        <Radio defaultChecked={inputAttributes.get('defaultValue') + ""} label={value.get('description', value.get('label'))}
               name={inputAttributes.get('name')} id={value.get('value')} key={value.get('value')}/>
      );
    }
  }
};

const displaySwitches = (inputAttributes, options) => {
  const classes = classnames("input-mapper-switch-container", inputAttributes.get('className'));
  return (
    <div className={classes}>
      <label htmlFor="#">{inputAttributes.get('label')}</label>
      {options.map(chooseSwitchControl(inputAttributes)).toArray()}
      {validationsAvailable(inputAttributes.toJS()).length > 0 &&
      <Validate {...inputAttributes.toJS()} name={inputAttributes.get('name') + '[]'}/>}
    </div>
  )
};

const GetAPIforRender = React.createClass({
  getInitialState(){
    return {
      response: List([])
    }
  },
  componentWillMount(){
    this.props.api().then(res => {
      this.setState({
        response: res.data.get('data', List([]))
      })
    })
  },
  render() {
    return React.cloneElement(this.props.children, {
      ...this.props,
      array: this.state.response
    })
  }
});

const ApiSelect = ({array, multiple = false, ...props}) => {
  return (
    <select {...props} multiple={multiple}>
      {array.map(item => <option value={item.get('id')}>{item.get('description')}</option>)}
    </select>
  )
};

/**
 * Allows the user to create a custom layout for the FormGenerator. Must have a FormGenerator component as a parent
 * Note: this is used internally to generate a form as well.
 */
const InputMapper = React.createClass({
  propTypes: {
    /** Matches a key in the Form Schema passed down by the parent FormGenerator.
     * Is used to match InputMapper with the correct attributes  */
    name: PropTypes.string.isRequired,
    /** User can pass in a custom component for InputMapper to render instead of the default options */
    component: PropTypes.element,
    /** Passed as children to the chosen component currently only supported by Select and custom components */
    children: PropTypes.node,
    notUserCreated: PropTypes.bool
  },
  // componentWillMount(){
  //   if (!this.props.notUserCreated) {
  //     this.props.registerInputMapper(this.props.name);
  //   }
  // },
  // componentWillUnmount(){
  //   if (!this.props.notUserCreated) {
  //     this.props.unregisterInputMapper(this.props.name);
  //   }
  // },
  mapInput(inputAttributes){
    const type = inputAttributes.get('type');
    if (this.props.component) {
      if (inputAttributes.hasIn(['items', 'x-blue-ApiResourceReference', 'api']) || inputAttributes.has('x-blue-ApiResourceReference')) {
        const api = inputAttributes.getIn(['items', 'x-blue-ApiResourceReference', 'api'], inputAttributes.get('x-blue-ApiResourceReference'));
        return (
          <GetAPIforRender api={api}>
            {cloneElement(this.props.component, {
              ...inputAttributes.toJS(),
              ...this.props,
              ...this.props.component.props
            })}
          </GetAPIforRender>
        )
      }
      else {
        return cloneElement(this.props.component, {
          ...inputAttributes.toJS(),
          ...this.props,
          ...this.props.component.props
        });
      }
    } else if (inputAttributes.has('x-blue-ApiResourceReference')) {
      return (
        <GetAPIforRender api={inputAttributes.get('x-blue-ApiResourceReference')}>
          <ApiSelect {...inputAttributes.toJS()}/>
        </GetAPIforRender>
      )
    } else if (type === "checkbox") {
      const classes = classnames("input-mapper-switch-container", inputAttributes.get('className'));
      if (inputAttributes.get('options').size > 0) {
        return displaySwitches(inputAttributes, inputAttributes.get('options'));
      } else {
        const safeInputAttributes = inputAttributes.delete('options');
        return (
          <div className={classes}>
            <CheckBox {...safeInputAttributes.toJS()}/>
          </div>
        )
      }
    } else if (type === "boolean") {
      const classes = classnames("input-mapper-switch-container", inputAttributes.get('className'));
      return (
        <div className={classes}>
          <CheckBox {...inputAttributes.delete('type').toJS()}/>
        </div>
      )
    } else if (type === "number") {
      return <Number {...inputAttributes.toJS()} />
    } else if (type === 'array') {
      const api = inputAttributes.getIn(['items', 'x-blue-ApiResourceReference', 'api']);
      if (!isUndefined(api)) {
        return (
          <GetAPIforRender api={api}>
            <ApiSelect multiple {...inputAttributes.toJS()}/>
          </GetAPIforRender>
        );
      } else {
        console.warn('Elements of type array without api references are not currently supported by the input mapper please specify your own component');
        return <div>Component name: {this.props.name}</div>
      }

    } else if (type === "file") {
      return (
        <div>
          <label htmlFor={inputAttributes.get('name')}>{inputAttributes.get('label')}</label>
            <DropZone {...inputAttributes.toJS()} multiple={false}>
              <span>Drop stuff here</span>
            </DropZone>
        </div>
      );
    } else if (inputAttributes.get('format', false) === 'date-time') {
      return <DatePicker {...inputAttributes.toJS()} />
    } else if (inputAttributes.get('enum', false)) {
      const selectAttributes = inputAttributes.delete('options');
      if (inputAttributes.has('children')) {
        return (
          <Select {...selectAttributes.toJS()}>
            {React.Children.toArray(inputAttributes.get('children').toJS())}
          </Select>
        )
      } else {
        return (
          <Select {...selectAttributes.toJS()}>
            {inputAttributes.get('options').map((value, key) => (
              <option value={value.get('value')} key={key}>{value.get('description') || key}</option>
            )).toArray()}
          </Select>
        );
      }
    } else if (inputAttributes.get('maxLength', false) >= 100) {
      const safeInputAttributes = inputAttributes.delete('type');
      return <TextArea {...safeInputAttributes.toJS()} />
    } else if (inputAttributes.get('hidden', false)) {
      return <noscript/>
    } else {
      const safeInputAttributes = inputAttributes.delete('type');
      return <Input {...safeInputAttributes.toJS()} />
    }
  },
  render: function () {
    const inputAttributes = this.props.attributes.merge(this.props);

    return this.mapInput(inputAttributes);
  }
});

export default compose(
  getContext({
    formSchema: PropTypes.any,
    registerInputMapper: PropTypes.func,
    unregisterInputMapper: PropTypes.func
  }), withProps(props => {
    const {name, formSchema, className} = props;
    const attributes = formSchema.get(name, Map({}));
    const renameAttributes = attributes.mapEntries(([key, value]) => {
      if (key === 'title') {
        return ['label', value];
      } else if (key === 'x-sys-Required') {
        return ['required', !value.get('allowEmptyStrings')];
      } else if (key === 'x-blue-Hidden') {
        return ['hidden', true];
      } else if (key === 'x-blue-enum-definitions') {
        return ['options', value];
      } else if (key === 'x-blue-HttpPostedFileBaseFileExtensions') {
        return ['accept', value.get('accept')]
      } else if (key === 'x-blue-FileMaxSize') {
        return ['fileMaxSize', value.get('maxSize')]
      } else if (key === 'minLength' && value === 0) {
        return [key, false];
      } else if (key === 'x-blue-ApiResourceReference') {
        const resourceName = value.get('resourceName');
        return [key, window.client.getIn([resourceName, resourceName + "_Query", 'api'])];
      } else if (Iterable.isIterable(value) && value.has('x-blue-ApiResourceReference')) {
        const resourceName = value.getIn(['x-blue-ApiResourceReference', 'resourceName']);
        const resourcePath = resourceName.split('/');
        if(size(resourcePath) > 1){
          return [key, value.setIn(['x-blue-ApiResourceReference', 'api'], window.client.getIn([resourcePath[0], `${resourcePath[0]}_${resourcePath[1]}`, 'api']))]
        } else {
          return [key, value.setIn(['x-blue-ApiResourceReference', 'api'], window.client.getIn([resourceName, resourceName + "_Query", 'api']))]
        }
      }
      return [key, value];
    });
    return {
      attributes: renameAttributes,
      className: classnames(name, className),
      name
    };
  })
)(InputMapper)
