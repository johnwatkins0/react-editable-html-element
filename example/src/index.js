import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles/hljs';

import examples from './examples';

const Examples = ({ examples }) => (
  <article
    className="articleExamples"
    style={{ maxWidth: 768, margin: '0 auto' }}
  >
    {examples.map(example => (
      <section key={example.description} style={{ marginBottom: '2.25rem' }}>
        <header>
          <h1
            style={{
              backgroundColor: 'rgba(0, 0, 0, .2)',
              padding: '.75rem',
              marginBottom: '1.5rem',
            }}
          >
            {example.description}
          </h1>
        </header>
        <div>{example.element}</div>
        <div>
          <SyntaxHighlighter
            language="javascript"
            style={tomorrowNightEighties}
            showLineNumbers
          >
            {example.code}
          </SyntaxHighlighter>
        </div>
        <br />
      </section>
    ))}
  </article>
);

Examples.propTypes = {
  examples: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const initElements = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-editable-element-examples]'),
    container => {
      ReactDOM.render(<Examples examples={examples} />, container);
    },
  );
};

window.addEventListener('load', initElements);
