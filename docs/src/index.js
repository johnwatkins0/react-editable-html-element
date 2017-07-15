import React from 'react';
import { render } from 'react-dom';
import he from 'he';

import EditableElement from '../../src/';

const renderComponent = (container) => {
  render(<EditableElement {...container.dataset} />, container);
};

const init = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-editable-element]'),
    renderComponent,
  );
};

window.addEventListener('load', init);

function renderEscapedHTML(container) {
  container.innerHTML = he.encode(container.getAttribute('data-escape-html'));
}

const initEscapedHTML = () => {
  Array.prototype.forEach.call(document.querySelectorAll('[data-escape-html]'), renderEscapedHTML);
};

window.addEventListener('load', initEscapedHTML);
