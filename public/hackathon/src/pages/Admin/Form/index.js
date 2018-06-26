import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Components
import Form from 'components/Form';

// Config
import { messages } from 'config';

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

const durationPattern = /^(\d+:[0-5]\d)$/g;

class AdminForm extends PureComponent {

  state = {
    durationError: '',
  };

  handleDurationKeyUp = event => {
    const { value } = event.target;

    this.setState({
      durationError: !value.match(durationPattern)
        ? messages.durationWarning
        : '',
    });
  };

  render() {
    const { submit, canSubmit } = this.props;

    return (
      <Form
        validation={hackathonSchema}
        submit={submit}
        canSubmit={canSubmit}
        className="admin__form"
      >
        <TextField
          required
          label="Name"
          name="name"
        />
        <TextField
          required
          error={!!this.state.durationError}
          helperText={this.state.durationError}
          label="Duration"
          type="text"
          placeholder="HH:MM"
          name="duration"
          InputLabelProps={{
            shrink: true,
          }}
          onKeyUp={this.handleDurationKeyUp}
        />
        <FormControlLabel
          control={
            <Checkbox color="primary" name="isGuestTeam" />
          }
          label="Is guest team"
        />
      </Form>
    );
  }
}

AdminForm.propTypes = {
  submit: PropTypes.func.isRequired,
  canSubmit: PropTypes.bool.isRequired,
};

export default AdminForm;
