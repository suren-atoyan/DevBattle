import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Button from '@material-ui/core/Button';

// Components
import Editor from 'components/Editor';

// Config
import { maximum_allowed_code_length } from 'config';

// Example

const codeExample = `class Auth {
  static genRandomCryptoString(len) {
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
  }

  // ...
}
`;

class CodeEditor extends PureComponent {

  state = {
    isEditorMounted: false,
    canSubmit: true,
    theme: 'vs-dark',
  }

  editorDidMount = getEditorValue => {
    this.getEditorValue = getEditorValue;

    this.setState({ isEditorMounted: true });
  }

  sendResult = _ => {
    const value = this.getEditorValue();
    if (value.length > (maximum_allowed_code_length || 1000)) {
      // TODO ::: Move it to config file
      alert('Bro, please write a little bit less code... You\'ll ruin yourself');
      return;
    }

    this.temporaryDisableSubmit();

    this.props.sendResult(value, this.props._id);
  }

  toggleTheme = _ => this.setState({ theme: this.state.theme.endsWith('dark') ? 'vs' : 'vs-dark' });

  temporaryDisableSubmit() {
    // Explanation of this suspicious two lines of code
    // The problem is that we are trying to avoid
    // users Submit button spamming
    // So, we are blocking submit button by 800 milliseconds.
    this.setState({ canSubmit: false }, _ =>
      setTimeout(_ => this.setState({ canSubmit: true }), 800));
  }

  render() {

    const { battle: { started, finished }, isLoading } = this.props;

    const value = this.props.value || codeExample;

    const isDisabled = !this.state.isEditorMounted
      || !this.state.canSubmit
      || !started
      || finished
      || isLoading;

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

CodeEditor.propTypes = {
  _id: PropTypes.string.isRequired,
  sendResult: PropTypes.func.isRequired,
  value: PropTypes.string,
  battle: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CodeEditor;
