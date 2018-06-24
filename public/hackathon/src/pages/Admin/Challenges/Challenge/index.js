import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Components
import Form from './Form';
import Tests from './Tests';

// Utils
import { removeItem } from 'utils';

import './index.scss';

class Challenge extends PureComponent {

  state = {
    tests: [],
  };

  static defaultProps = {
    name: '',
    description: '',
    codeExample: '',
    fnName: '',
    fnLength: null,
    hasCodeLimitation: false,
    hasCodeEditor: true,
    tests: [],
  };

  addTest = test => this.setState({
    tests: [ ...this.state.tests, test ],
    isOpenAddTestDialog: false,
  });

  deleteTest = inx => this.setState({ tests: removeItem(this.state.tests, inx) });

  submit = data => {

    const { tests } = this.state;

    const currentChallenge = {
      ...data,
      tests,
    }

    this.props.submit(currentChallenge);
  };

  render() {
    const {
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
            {...props}
            canSubmit={canSubmit}
            submit={this.submit}
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

Challenge.propTypes = {
  submit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  codeExample: PropTypes.string,
  description: PropTypes.string,
  fnName: PropTypes.string,
  name: PropTypes.string,
  fnLength: PropTypes.number,
  hasCodeEditor: PropTypes.bool,
  hasCodeLimitation: PropTypes.bool,
  tests: PropTypes.array,
};

export default Challenge;
