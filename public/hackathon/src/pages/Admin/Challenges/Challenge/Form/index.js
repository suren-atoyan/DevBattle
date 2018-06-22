import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Components
import Form from 'components/Form';

import './index.scss';

const challengeSchema = {
  name: {
    required: true,
  },
  description: {
    required: true, 
  },
  hasCodeEditor: {
    required: false,
  },
  codeExample: {
    required: false,
  },
  fnName: {
    required: true,
  },
  fnLength: {
    required: false,
  },
  points: {
    required: false,
  },
  exclude: {
    required: false,
  },
};

class ChallengeForm extends PureComponent {

  render() {

    const {
      name,
      description,
      codeExample,
      hasCodeEditor,
      fnName,
      fnLength,
      canSubmit,
      points,
      exclude,
      submit,
    } = this.props;

    return (
      <Form
        submit={submit}
        validation={challengeSchema}
        canSubmit={canSubmit}
        className="challenge__form"
      >
        <TextField
          autoFocus
          required
          name="name"
          label="Name"
          defaultValue={name}
        />
        <TextField
          required
          multiline
          defaultValue={description}
          name="description"
          label="Description"
        />
        <TextField
          multiline
          defaultValue={codeExample}
          name="codeExample"
          label="Code Example"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="hasCodeEditor"
              defaultValue={hasCodeEditor}
              color="primary"
            />
          }
          label="Has code Editor"
        />
        <TextField
          required
          defaultValue={fnName}
          name="fnName"
          label="Function Name"
        />
        <TextField
          type="number"
          name="fnLength"
          label="Function length (optional)"
          defaultValue={fnLength}
        />
        <TextField
          type="number"
          name="points"
          label="Points (optional)"
          defaultValue={points}
        />
        <TextField
          defaultValue={exclude}
          name="exclude"
          label="Exclude (optional)"
        />
      </Form>
    );
  }
}

ChallengeForm.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  codeExample: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fnName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fnLength: PropTypes.number,
  hasCodeEditor: PropTypes.bool.isRequired,
  hasCodeLimitation: PropTypes.bool.isRequired,
  tests: PropTypes.array.isRequired,
};

export default ChallengeForm;
