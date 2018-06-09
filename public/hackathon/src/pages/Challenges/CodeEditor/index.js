import React, { PureComponent, Fragment } from 'react';

import Button from '@material-ui/core/Button';

import Editor from 'components/Editor';

// Example

const sourceExample = `class Auth {
  static genRandomCryptoString(len) {
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
  }

  // ...
}
`;

export default class CodeEditor extends PureComponent {

  state = {
    isEditorMounted: false,
    theme: 'vs-dark',
  }

  editorDidMount = getEditorValue => {
    this.getEditorValue = getEditorValue;

    this.setState({ isEditorMounted: true });
  }

  sendResult = _ => this.props.sendResult(this.getEditorValue(), this.props._id);

  toggleTheme = _ => this.setState({ theme: this.state.theme.endsWith('dark') ? 'vs' : 'vs-dark' });

  render() {
    return (
      <Fragment>
        <Editor
          value={sourceExample}
          valueGetter={getEditorValue => (this.getEditorValue = getEditorValue)}
          editorDidMount={this.editorDidMount}
          theme={this.state.theme}
        />
        <Button
          onClick={this.sendResult}
          disabled={!this.state.isEditorMounted}
        >
          Submit
        </Button>
        <Button
          onClick={this.toggleTheme}
        >
          Toggle Theme
        </Button>
      </Fragment>
    );
  }
}
