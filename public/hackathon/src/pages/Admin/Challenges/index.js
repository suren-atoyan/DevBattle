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
import Challenge from './Challenge';
import ChallengeInfo from './Challenge/Info';

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

class Challenges extends PureComponent {

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
    const { fnLength, points, exclude } = data; // Should be converted
    fnLength && (data.fnLength = parseInt(fnLength, 10));
    points && (data.points = parseInt(points, 10));
    exclude && (data.exclude = exclude.split(','));
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

Challenges.propTypes = {
  challenges: PropTypes.array.isRequired,
  addChallenge: PropTypes.func.isRequired,
  deleteChallenge: PropTypes.func.isRequired,
}

export default Challenges;
