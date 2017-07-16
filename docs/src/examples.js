import React from 'react';

import EditableElement from '../../src/';

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
          onChange={(value) => {
            this.setState({ value });
          }}
        />
        <div>
          The current value is {`"${this.state.value}"`}
        </div>
      </div>
    );
  }
}

const examples = [
  {
    description: 'All defaults',
    element: <EditableElement />,
    code: '<EditableElement />',
  },
  {
    description: 'Pass an initial value',
    element: <EditableElement value="Click me to edit this text." />,
    code: `<EditableElement
  value="Click me to edit this text."
/>`,
  },
  {
    description: 'Editable h1',
    element: <EditableElement value="Click me to edit this text" element="h1" />,
    code: `<EditableElement
  value="Click me to edit this text"
  element="h1"
  />`,
  },
  {
    description: 'Editable h1 with custom input styles',
    element: (
      <EditableElement
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
      />
    ),
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
