import React, { PureComponent } from 'react';
import Form from './Form';
import Tests from './Tests';
import { removeItem } from 'utils';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './index.scss';

export default class Challenge extends PureComponent {

  state = {
    tests: [],
  }

  addTest = test => this.setState({
    tests: [ ...this.state.tests, test ],
    isOpenAddTestDialog: false,
  });

  deleteTest = inx => this.setState({ tests: removeItem(this.state.tests, inx) });

  render() {

    const {
      submit,
      onClose,
      ...props
    } = this.props;

    const canSubmit = !!this.state.tests.length;

    return (
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="add-challenge-dialog"
      >
        <DialogTitle>Create a Challenge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please be creative and don't write challenges less then 400 Mwatt
          </DialogContentText>
          <Form
            submit={submit}
            canSubmit={canSubmit}
            {...props}
          />
          <Typography variant="title">Tests</Typography>
          <Tests
            tests={this.state.tests}
            addTest={this.addTest}
            deleteTest={this.deleteTest}
          />
        </DialogContent>
      </Dialog>
    );
  }
}