import React, { PureComponent } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import TextField from 'components/TextField';
import Form from 'components/ValidatableForm';
import ExpansionPanel from 'components/ExpansionPanel';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import { withStore } from 'store';
import './index.scss';

class Admin extends PureComponent {

  state = {
    challengePanelCount: 1,
  }

  handleHackathonSubmit = hackathonData => {
    const { name, challengesName, challengesDescription } = hackathonData;
    const hackathon = {
      name: name,
      isGuestTeam: true,
      duration: 1000,
      challenges: [
        {
          name: challengesName,
          description: challengesDescription,
        },
      ],
    };

    this.props.store.createHackathon(hackathon)
  }

  handleAddChallengeClick = _ => {
    this.setState(prevState => ({
      challengePanelCount: prevState.challengePanelCount + 1
    }), () => {
      this.buttonRef && this.buttonRef.scrollIntoView(true);
    })
  }

  stopPropagation = e => e.stopPropagation();

  render() {
    return (
      <Form
        className="admin-form"
        submit={this.handleHackathonSubmit}
        validation={{
          name: {
            required: true,
          },
          duration: {
            required: true, 
          },
          challengesName: {
            required: true,
          },
          challengesDescription: {
            required: true
          }
        }}
      >
        <Typography className="hackathon-label">Create hackathon</Typography>
        <TextField
          required
          className="name-field"
          name="name"
          label="Name"
        />
        <TextField
          required
          className="duration-field"
          name="duration"
          label="Duration"
          type="time"
          inputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <Checkbox
          name="canHaveGuest"
          label="Can have guest"
          color="primary"
        />
        {
          [...Array(this.state.challengePanelCount)].map((el, index, array) => (
            <ExpansionPanel
              label="Create Chellenge"
              expanded={index === array.length - 1}
              className="challenges-expansion-panel"
              key={index}
            >
              <TextField
                name="challengesName"
                label="Name"
                onClick={this.stopPropagation}
              />
              <TextField
                multiline
                name="challengesDescription"
                label="Description"
                onClick={this.stopPropagation}
              />
            </ExpansionPanel>
          ))

        }
        <div ref={ref => (this.buttonRef = ref)}>
          <Button
            variant="fab"
            color="primary"
            onClick={this.handleAddChallengeClick}
          >
            <AddIcon />
          </Button>
        </div>
      </Form>
    );
  }
}

export default withStore(Admin)
