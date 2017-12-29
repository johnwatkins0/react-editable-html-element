import React from 'react';
import EditableElement from '../../../';

class OnChangeOverride extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <div>
        <EditableElement
          value={this.state.value}
          onChange={value => {
            this.setState({ value });
          }}
        />
        <div>The current value is {`"${this.state.value}"`}</div>
      </div>
    );
  }
}

export default OnChangeOverride;
