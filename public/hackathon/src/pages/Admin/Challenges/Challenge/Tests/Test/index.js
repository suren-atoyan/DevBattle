import React, { Component } from 'react';
import Form from 'components/Form';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './index.scss';

const testSchema = {
  input: {
    required: true,
  },
  output: {
    required: true,
  }
};

export default class Test extends Component {
  render() {

    const {
      open,
      submit,
      onClose,
      input,
      output,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="add-test-dialog"
      >
        <DialogTitle>Create a Test</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please write input/output for your function
            Note ::: type of input/output should be JSON
            So, eg. if you want to write 2 as number in input field
            just write 2. If you want to write 2 as string, write "2".
            They are boght valid JSONs.
          </DialogContentText>
          <Form
            submit={submit}
            validation={testSchema}
            className="add-test-dialog__form"
          >
            <TextField
              autoFocus
              required
              name="input"
              label="Input"
              defaultValue={input}
            />
            <TextField
              required
              multiline
              defaultValue={output}
              name="output"
              label="Output"
            />
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
}