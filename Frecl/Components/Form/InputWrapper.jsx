import React, {PropTypes} from 'react';
import ErrorWrapper from './ErrorWrapper.jsx';
import './InputWrapper.scss';

const InputWrapper = ({className, name, label, labelPostfix, children}) => (
  <ErrorWrapper className={className}>
    {(label || labelPostfix) && (
      <div className="input-label-wrapper">
        <label className="input-label" htmlFor={name}>{label}</label>
        {labelPostfix && <div className="input-label-postfix">{labelPostfix}</div>}
      </div>
    )}
    {children}
  </ErrorWrapper>
);

InputWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  labelPostfix: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  className: PropTypes.string,
  children: PropTypes.node
};

export default InputWrapper;


