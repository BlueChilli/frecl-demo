import React from "react";
import {validationsMessages, validationsAvailable} from "../../Helpers/validate";
import {DisplayValidationPerformanceWrapperProps, ValidationElementProps, InputInfoProps, ValidationAdditionProps, ValidationCloneElementProps} from "../Form/Types/types"
import {ReactElement} from "../../types"
import Validation from "../Validation/Validation";

type ValidationChild = React.ReactElement<ValidationElementProps>

type ValidationAdditionChild = React.ReactElement<ValidationAdditionProps>


const childrenValidations = (children) : string[] => {
  if (React.Children.count(children) > 0) {
    return React.Children.map<string>(children, (child:ValidationChild) => {
      return child.props.isFor;
    })
  }
  return [];
};

const isSwitch = (type) :boolean => {
  return type === "checkbox" || type === 'radio';
};

const validationsUnused = (validationsUsed:string[], validationsAvailable:string[], isSwitch:boolean):string[] => {
  return validationsAvailable.filter(validation => {
    if (validation === 'type' && isSwitch) return false;
    return validationsUsed.indexOf(validation) === -1;
  });
};

const DisplayValidation = ({children, disabled, inputInfo, inputGroupInfo, noValidate, ...props} : DisplayValidationPerformanceWrapperProps) => {
  const validationsAvail:string[] = validationsAvailable(props);
  const validationUsed:string[] = childrenValidations(children);
  const unusedValidations = validationsUnused(validationUsed, validationsAvail, isSwitch(props.type));
  if (disabled || noValidate) {
    return <span/>;
  }
  return (
    <div>
      {React.Children.map<ValidationAdditionChild>(children, (child:ValidationAdditionChild) => {
        const typeOfValidation = child.props.isFor;
        return React.cloneElement<ValidationAdditionProps, ValidationCloneElementProps>(child, {
          typeOfValidation,
          test: props[typeOfValidation],
          inputInfo,
          inputGroupInfo,
          type: props.type,
          name: props.name
        });
      })}
      {unusedValidations.map<ValidationAdditionChild>((validation, index) => React.createElement(Validation as React.ComponentClass<ValidationAdditionProps>, {
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

export default DisplayValidation;

