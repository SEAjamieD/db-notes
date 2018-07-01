import React from 'react';
import './dracula.css';
const hljs = window.hljs


class CodeBlock extends React.Component {

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeBlock)
  }

  render() {
    return (
      <pre>
        <code ref={el => (this.codeBlock = el)}>
          {this.props.value}
        </code>
      </pre>
    );
  }
}

export default CodeBlock;
