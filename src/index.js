import PropTypes from 'prop-types';
import React from 'react';

import htmlTags from './htmlTags';

class EditableElement extends React.Component {
  static propTypes = {
    allowEditing: PropTypes.bool,
    editable: PropTypes.bool,
    element: (props, propName, componentName) => {
      if (htmlTags.includes(props[propName])) {
        return null;
      }

      return new Error(
        `Invalid prop \`${propName}\` supplied to` +
          ` \`${componentName}\`. Allowed elements: ${htmlTags.join(', ')}`,
      );
    },
    elementClassName: PropTypes.string,
    elementStyle: PropTypes.objectOf(PropTypes.any),
    inputClassName: PropTypes.string,
    inputStyle: PropTypes.objectOf(PropTypes.any),
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    allowEditing: true,
    allowedElements: htmlTags,
    editable: false,
    element: 'div',
    elementClassName: '',
    elementStyle: {},
    inputClassName: '',
    inputStyle: {},
    onChange: null,
    onKeyDown: null,
    placeholder: 'Enter text',
    value: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      editable:
        this.props.allowEditing === true ? this.props.value === '' || this.props.editable : false,
    };

    this.renderStaticElement = this.renderStaticElement.bind(this);
    this.renderEditableElement = this.renderEditableElement.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    if (this.state.editable) {
      this.input.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.editable === false && this.props.editable === true) {
      this.input.focus();
      return;
    }

    if (prevState.editable === false && this.state.editable === true) {
      this.input.focus();
    }
  }

  onChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
      return;
    }

    this.setState({ value });
  }

  onClick() {
    if (this.props.allowEditing === true) {
      this.setState({ editable: true });
    }
  }

  onKeyDown(event) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
      return;
    }

    const key = event.keyCode || event.which;

    if ([13, 27].includes(key)) {
      this.setState({ editable: false });
    }
  }

  renderStaticElement() {
    const Element = this.props.element;

    return (
      <Element
        className={this.props.elementClassName}
        style={this.props.elementStyle}
        onClick={this.onClick}
        dangerouslySetInnerHTML={{
          __html: this.state.value || '(empty element)',
        }}
      />
    );
  }

  renderEditableElement() {
    return (
      <input
        ref={(input) => {
          this.input = input;
        }}
        className={this.props.inputClassName}
        style={this.props.inputStyle}
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={event => this.onChange(event.target.value)}
        onKeyDown={this.onKeyDown}
        onBlur={() => this.setState({ editable: false })}
      />
    );
  }

  render() {
    if (this.state.editable) {
      return this.renderEditableElement();
    }
    return this.renderStaticElement();
  }
}

export default EditableElement;
