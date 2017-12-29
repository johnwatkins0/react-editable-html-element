import React from 'react';

import AllDefaults from './tests/AllDefaults';
import InitialValue from './tests/InitialValue';
import EditableH1 from './tests/EditableH1';
import EditableH1WithCustomStyles from './tests/EditableH1WithCustomStyles';
import OnChangeOverride from './tests/OnChangeOverride';

const examples = [
  {
    description: 'All defaults',
    element: <AllDefaults />,
    code: '<EditableElement />',
  },
  {
    description: 'Pass an initial value',
    element: <InitialValue />,
    code: `<EditableElement
  value="Click me to edit this text."
/>`,
  },
  {
    description: 'Editable h1',
    element: <EditableH1 />,
    code: `<EditableElement
  value="Click me to edit this text"
  element="h1"
  />`,
  },
  {
    description: 'Editable h1 with custom input styles',
    element: <EditableH1WithCustomStyles />,
    code: `<EditableElement
  value="Click me to edit this text"
  element="h1"
  inputStyle={{
    width: '100%',
    fontSize: '2rem',
    border: 'none',
    backgroundColor: 'transparent',
    fontWeight: 500,
    lineHeight: 1.1,
    display: 'block',
  }}
/>`,
  },
  {
    description: 'Override default onChange behavior',
    element: <OnChangeOverride />,
    code: `class OnChangeOverride extends React.Component {
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
          onChange={(value) => {
            this.setState({ value });
          }}
        />
        <div>
          The current value is {\`"\${this.state.value}"\`}
        </div>
      </div>
    );
  }
}`,
  },
];

export default examples;
