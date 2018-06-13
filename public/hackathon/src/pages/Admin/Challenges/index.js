import React, { PureComponent } from 'react';
import Challenge from './Challenge';
import ChallengeInfo from './Challenge/Info';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';

import './index.scss';

const emptyChallenge = {
  name: '',
  description: '',
  codeExample: '',
  fnName: '',
  fnLength: '',
  hasCodeLimitation: false,
  hasCodeEditor: true,
  tests: [],
};

export default class Challenges extends PureComponent {

  state = {
    isOpenAddChallengeDialog: false,
  }

  getChallenges = _ => {
    const challenges = this.props.challenges.map((challenge, index) => (
      <ChallengeInfo
        key={index}
        index={index}
        deleteChallenge={this.props.deleteChallenge}
        {...challenge}
      />
    ));

    return challenges.length
      ? (
          <Paper className="admin__paper">
            <List
              component="nav"
            >
              {challenges}
            </List>
          </Paper>
        )
      : (
          <Typography color="secondary">
            * Challenges are required
          </Typography>
        );
  }

  openAddChallengeDialog = _ => this.setState({ isOpenAddChallengeDialog: true });

  closeAddChallengeDialog = _ => this.setState({ isOpenAddChallengeDialog: false });

  addChallenge = data => {
    this.closeAddChallengeDialog();
    this.props.addChallenge(data);
  }

  render() {
    return (
      <div className="admin__challenges">
        {this.getChallenges()}
        {this.state.isOpenAddChallengeDialog && <Challenge
          {...emptyChallenge}
          submit={this.addChallenge}
          onClose={this.closeAddChallengeDialog}
        />}
        <Tooltip title="Add new Challenge">
          <Button
            variant="fab"
            onClick={this.openAddChallengeDialog}
            className="admin__challenges--add"
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}
