import React, {PropTypes} from 'react';
import classnames from 'classnames';
import './InputGroup.scss';


/** Internal method to make creation of input boxes with appended or prepended segments easier */
const InputGroup = ({prepend, append, children}) => {
  const inputGroupClass = classnames('input-group', {'input-prepend': prepend}, {'input-append': append});

  return (
    <div className={inputGroupClass}>
      {children}
      {prepend && <span className="input-addon">{prepend}</span>}
      {append && <span className="input-addon">{append}</span>}
    </div>
  );
};

InputGroup.propTypes = {
  append: PropTypes.node,
  prepend: PropTypes.node,
  children: PropTypes.element
};

export default InputGroup;


