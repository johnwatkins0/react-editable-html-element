import PropTypes from 'prop-types';
import React from 'react';

import htmlTags from './htmlTags';
import validateElementPropType from './validateElementPropType';

class EditableElement extends React.Component {
  static propTypes = {
    allowEditing: PropTypes.bool,
    editable: PropTypes.bool,
    element: validateElementPropType,
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

  static setEditable = props =>
    props.allowEditing === true ? props.value === '' || props.editable : false;

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      editable: EditableElement.setEditable(props),
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.maybeFocusInput = this.maybeFocusInput.bind(this);
  }

  componentDidMount() {
    this.maybeFocusInput();
  }

  componentWillReceiveProps(nextProps) {
    this.maybeUpdateValue(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    this.maybeFocusInput(prevProps, prevState);
  }

  maybeFocusInput(prevProps = {}, prevState = {}) {
    if (!this.input) {
      return;
    }

    if (Object.keys(prevProps).length === 0 && this.state.editable) {
      this.input.focus();
      return;
    }

    if (prevProps.editable === false && this.props.editable === true) {
      this.input.focus();
      return;
    }

    if (prevState.editable === false && this.state.editable === true) {
      this.input.focus();
    }
  }

  maybeUpdateValue(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange(value) {
    this.props.onChange ? this.props.onChange(value) : this.setState({ value });
  }

  onClick(event) {
    if (this.props.allowEditing === true) {
      event.preventDefault();
      this.setState({ editable: true });
    }
  }

  onKeyDown(event) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
      return;
    }

    if ([13, 27].includes(event.keyCode || event.which)) {
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

  renderEditableElement = () => (
    <input
      ref={input => {
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

  render = () =>
    this.state.editable
      ? this.renderEditableElement()
      : this.renderStaticElement();
}

export default EditableElement;
