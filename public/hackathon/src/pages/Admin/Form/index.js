import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Components
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

AdminForm.propTypes = {
  submit: PropTypes.func.isRequired,
  canSubmit: PropTypes.bool.isRequired,
};

export default AdminForm;
