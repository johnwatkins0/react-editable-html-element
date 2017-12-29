import React from 'react';
import EditableElement from '../../../';

const EditableH1WithCustomStyles = () => (
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
);

export default EditableH1WithCustomStyles;
