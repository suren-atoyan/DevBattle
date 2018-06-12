import React from 'react';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Form from 'components/Form';

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

const AdminForm = ({ submit, canSubmit }) => (
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
    <FormControlLabel
      control={
        <Checkbox color="primary" name="isGuestTeam" />
      }
      label="Is guest team"
    />
  </Form>
);

export default AdminForm;