/* eslint-disable no-sequences */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';

// Components
import Test from './Test';
import TestInfo from './Test/Info';

import './index.scss';

class Tests extends PureComponent {

  state = {
    isOpenAddTestDialog: false,
    errorMessage: null,
  }

  openAddTestDialog = _ => this.setState({ isOpenAddTestDialog: true });

  closeAddTestDialog = _ => this.setState({
    isOpenAddTestDialog: false,
    errorMessage: null,
  });

  getTests = _ => {
    const tests = this.props.tests.map((test, index) => (
      <TestInfo
        key={index}
        index={index}
        deleteTest={this.props.deleteTest}
        {...test}
      />
    ));

    return tests.length
      ? (
          <Paper className="admin__paper">
            <List
              component="nav"
            >
              {tests}
            </List>
          </Paper>
        )
      : (
          <Typography color="secondary">
            * Tests are required
          </Typography>
        );
  }

  addTest = data => {
    let result;
    try {
      result = Object
        .keys(data)
        .reduce((acc, key) => (acc[key] = JSON.parse(data[key]), acc), {});

      this.closeAddTestDialog();
    } catch(e) {
      this.setState({ errorMessage: 'Input/Output should be a valid JSON.' });
      return false;
    }

    this.props.addTest(result);
  }

  render() {
    return (
      <div className="admin__tests">
        {this.getTests()}
        <Test
          open={this.state.isOpenAddTestDialog}
          submit={this.addTest}
          onClose={this.closeAddTestDialog}
          errorMessage={this.state.errorMessage}
        />
        <Tooltip title="Add new Test">
          <Button
            variant="fab"
            onClick={this.openAddTestDialog}
            className="admin__tests--add"
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

Tests.propTypes = {
  tests: PropTypes.array.isRequired,
  addTest: PropTypes.func.isRequired,
  deleteTest: PropTypes.func.isRequired,
};

export default Tests;
