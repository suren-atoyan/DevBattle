/* eslint-disable no-sequences */
import React, { PureComponent } from 'react';
import Test from './Test';
import TestInfo from './Test/Info';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';

import './index.scss';

const emptyTest = {
  name: '',
  length: null,
};

export default class Tests extends PureComponent {

  state = {
    isOpenAddTestDialog: false,
  }

  openAddTestDialog = _ => this.setState({ isOpenAddTestDialog: true });

  closeAddTestDialog = _ => this.setState({ isOpenAddTestDialog: false });

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
    this.closeAddTestDialog();
    this.props.addTest(
      Object
        .keys(data)
        .reduce((acc, key) => (acc[key] = JSON.parse(data[key]), acc), {})
    );
  }

  render() {
    return (
      <div className="admin__tests">
        {this.getTests()}
        <Test
          {...emptyTest}
          open={this.state.isOpenAddTestDialog}
          submit={this.addTest}
          onClose={this.closeAddTestDialog}
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
