import React, { PureComponent, Fragment } from 'react';

import Button from '@material-ui/core/Button';

import Editor from 'components/Editor';

import { maximum_allowed_code_length } from 'config';

// Example

const codeExample = `class Auth {
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

  sendResult = _ => {
    const value = this.getEditorValue();
    if (value.length > (maximum_allowed_code_length || 1000)) {
      alert('Bro, please write a little bit less code... You\'ll ruin your self');
      return;
    }

    this.props.sendResult(value, this.props._id);
  }

  toggleTheme = _ => this.setState({ theme: this.state.theme.endsWith('dark') ? 'vs' : 'vs-dark' });

  render() {

    const { hackathon: { started, finished } } = this.props;

    const value = this.props.value || codeExample;

    const isDisabled = !this.state.isEditorMounted || !started || finished;

    return (
      <Fragment>
        <Editor
          value={value}
          valueGetter={getEditorValue => (this.getEditorValue = getEditorValue)}
          editorDidMount={this.editorDidMount}
          theme={this.state.theme}
        />
        <Button
          onClick={this.sendResult}
          disabled={isDisabled}
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
