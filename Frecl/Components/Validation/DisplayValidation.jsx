import React, {PropTypes} from "react";
import {validationsMessages, validationsAvailable} from "../../Helpers/validate";
import Validation from "../Validation/Validation.jsx";

const childrenValidations = (children) => {
  if (React.Children.count(children) > 0) {
    return React.Children.map(children, child => {
      return child.props.isFor;
    })
  }
  return [];
};

const isSwitch = (type) => {
  return type === "checkbox" || type === 'radio';
};

const validationsUnused = (validationsUsed, validationsAvailable, isSwitch) => {
  return validationsAvailable.filter(validation => {
    if (validation === 'type' && isSwitch) return false;
    return validationsUsed.indexOf(validation) === -1;
  });
};

const DisplayValidation = ({children, disabled, inputInfo, inputGroupInfo, noValidate, ...props}) => {
  const validationsAvail = validationsAvailable(props);
  const validationUsed = childrenValidations(children);
  const unusedValidations = validationsUnused(validationUsed, validationsAvail, isSwitch(props.type));
  if (disabled, noValidate) {
    return <span/>;
  }
  return (
    <div>
      {React.Children.map(children, (child) => {
        const typeOfValidation = child.props.isFor;
        return React.cloneElement(child, {
          typeOfValidation,
          test: props[typeOfValidation],
          inputInfo,
          inputGroupInfo,
          type: props.type,
          name: props.name
        });
      })}
      {unusedValidations.map((validation, index) => React.createElement(Validation, {
        typeOfValidation: validation,
        key: index,
        isFor: validation,
        test: props[validation],
        inputInfo,
        inputGroupInfo,
        type: props.type,
        children: validationsMessages(validation, props[validation]),
        name: props.name
      }))}
    </div>
  );
};

DisplayValidation.propTypes = {
  name: PropTypes.string.isRequired,
  noValidate: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default DisplayValidation;

