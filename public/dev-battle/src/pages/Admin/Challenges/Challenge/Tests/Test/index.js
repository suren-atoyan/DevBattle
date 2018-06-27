import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

// Components
import Form from 'components/Form';

import './index.scss';

const testSchema = {
  input: {
    required: true,
  },
  output: {
    required: true,
  }
};

const Test = ({
  open,
  submit,
  onClose,
  input,
  output,
  errorMessage,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="add-test-dialog"
  >
    <DialogTitle>Create a Test</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Write input/output for your function.
        Note ::: type of input/output should be JSON
        So, if you want to write 2 as a number in input field just write 2.
        If you want to write 2 as a string, write "2". They both are valid JSONs.
        If you want to give to your function more than one argument,
        then separate them by using # symbol. E.g, if you want to give to the function two arguments,
        first of them is an array like [1, 2, 3] and the second is a number like 5, just write [1, 2, 3] # 5
      </DialogContentText>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
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

Test.defaultProps = {
  input: '',
  output: '',
};

Test.propTypes = {
  open: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  input: PropTypes.any,
  output: PropTypes.any,
};

export default Test;
