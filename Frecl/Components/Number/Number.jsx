import React, {PropTypes} from 'react';
import Input from '../Input/Input.tsx';

class Number extends React.Component {
  static defaultProps = {
    pattern: '[0-9]',
    type: 'number',
  }

  render() {
    return <Input {...this.props} />;
  }
}

export default Number;