import React, { PureComponent, Fragment } from 'react';

import Form from 'components/Form';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Challenge from './Challenge';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import './index.scss';

const hackathonSchema = {
  name: {
    required: true,
  },

  duration: {
    required: true,
  },

  isGuestTeam: {
    required: false,
  },
};

const emptyChallenge = {
  name: '',
  description: '',
  hasCodeEditor: true,
};

export default class Admin extends PureComponent {

  state = {
    challenges: [],
    canAddCallenge: true,
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
    canAddCallenge: true,
  });

  render() {
    return (
      <div className="admin">
        <Typography variant="headline" component="h2" >
          Create new hackathon
        </Typography>
        <Form
          validation={hackathonSchema}
          submit={this.createHackathon}
          canSubmit={!!this.state.challenges.length}
        >
          <TextField
            required
            label="Name"
            name="name"
          />
          <TextField
            required
            label="Duration"
            type="time"
            name="duration"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <div>
            <Checkbox color="primary" name="isGuestTeam" />
            Is guest team
          </div>
        </Form>
        {
          <Fragment>
            {
              this.state.challenges.map(({ name, description, hasCodeEditor }, index) => (
                <Paper key={index} className="challenges-paper">
                  <Typography>Challenge Name - {name}</Typography>
                  <Button variant="contained" color="primary">Edit</Button>
                  <Button variant="contained" color="secondary">Delete</Button>
                </Paper>
              ))
            }
            <Challenge
              {...emptyChallenge}
              submit={this.addChallenge}
            />
          </Fragment>
        }
      </div>
    );
  }
}