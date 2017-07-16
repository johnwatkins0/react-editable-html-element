import React from 'react';
import { render } from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles';
import ReactMarkdown from 'react-remarkable';
import smoothScroll from 'smooth-scroll';
import highlight from 'highlight.js';

import examples from './examples';

class Site extends React.Component {
  static renderExamples() {
    return (
      <article className="articleExamples">
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
      </article>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      page: window.location.hash === '#examples' ? 'examples' : 'docs',
      docsSource: '',
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.renderDocs = this.renderDocs.bind(this);
  }

  componentWillMount() {
    fetch(
      'https://raw.githubusercontent.com/johnwatkins0/react-editable-html-element/master/README.md',
    )
      .then(response => response.text())
      .then((docsSource) => {
        this.setState({ docsSource });
      });
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  renderHeader() {
    return (
      <header className="page-header">
        <h5>react-editable-html-element</h5>
        <div>
          <button
            onClick={() => {
              this.setState({ page: 'docs' }, () => {
                smoothScroll.animateScroll(document.body);
              });
            }}
          >
            Docs
          </button>
          <button
            onClick={() => {
              this.setState({ page: 'examples' }, () => {
                smoothScroll.animateScroll(document.body);
              });
            }}
          >
            Examples
          </button>
        </div>
        <a href="https://github.com/johnwatkins0/react-editable-html-element">GitHub</a>
      </header>
    );
  }

  renderDocs() {
    if (this.state.docsSource.length) {
      return (
        <article className="articleDocs">
          <ReactMarkdown
            source={this.state.docsSource}
            options={{
              highlight: (str, lang) => {
                if (lang && highlight.getLanguage(lang)) {
                  try {
                    return highlight.highlight(lang, str).value;
                  } catch (err) {
                    // noop
                  }
                }

                try {
                  return highlight.highlightAuto(str).value;
                } catch (err) {
                  // noop
                }

                return '';
              },
            }}
          />
        </article>
      );
    }

    return null;
  }

  renderBody() {
    if (this.state.page === 'examples') {
      return Site.renderExamples();
    }

    return this.renderDocs();
  }

  render() {
    const header = this.renderHeader();
    const body = this.renderBody();

    return (
      <div>
        {header}
        {body}
      </div>
    );
  }
}

const initElements = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-editable-element-examples]'),
    (container) => {
      render(<Site />, container);
    },
  );
};

window.addEventListener('load', initElements);
