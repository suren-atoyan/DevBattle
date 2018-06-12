import React, { PureComponent } from 'react';

import Typography from '@material-ui/core/Typography'
import { removeItem } from 'utils/';
import Form from './Form';
import Challenges from './Challenges';
import './index.scss';

export default class Admin extends PureComponent {

  state = {
    challenges: [],
  }

  createHackathon = data => {

    const { challenges } = this.state;

    const hackathon = {
      ...data,
      challenges,
    }

    this.props.store.createHackathon(hackathon);
  }

  addChallenge = challenge => this.setState({
    challenges: [ ...this.state.challenges, challenge ],
    isOpenAddChallengeDialog: false,
  });

  deleteChallenge = inx => this.setState({ challenges: removeItem(this.state.challenges, inx) });

  render() {
    return (
      <div className="admin">
        <Typography variant="headline" component="h2">
          Create new hackathon
        </Typography>
        <Form
          submit={this.createHackathon}
          canSubmit={!!this.state.challenges.length}
        />
        <Challenges
          challenges={this.state.challenges}
          addChallenge={this.addChallenge}
          deleteChallenge={this.deleteChallenge}
        />
      </div>
    );
  }
}