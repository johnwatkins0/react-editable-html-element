import React from 'react';
import { render } from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles';

import examples from './examples';

const initElements = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-editable-element-examples]'),
    (container) => {
      render(
        <div>
          <header className="page-header">
            <h5>react-editable-html-element - Examples</h5>
            <a href="https://github.com/johnwatkins0/react-editable-html-element">GitHub</a>
          </header>
          <section>
            <header>
              <h4>Description</h4>
            </header>
            <div>Rendered element</div>
            <div>Code</div>
          </section>
          {examples.map(example =>
            (<section key={example.description}>
              <header>
                <h4>
                  {example.description}
                </h4>
              </header>
              <div>
                {example.element}
              </div>
              <div>
                <SyntaxHighlighter
                  language="javascript"
                  style={tomorrowNightEighties}
                  showLineNumbers
                >
                  {example.code}
                </SyntaxHighlighter>
              </div>
            </section>),
          )}
        </div>,
        container,
      );
    },
  );
};

window.addEventListener('load', initElements);
