import React, { PureComponent } from 'react';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
};

export default class ChallengeForm extends PureComponent {

  state = {
    hasCodeLimitation: false,
  }

  toggleCodeLimitation = _ => this.setState({ hasCodeLimitation: !this.state.hasCodeLimitation });

  render() {

    const {
      name,
      description,
      codeExample,
      hasCodeEditor,
      fnName,
      hasCodeLimitation,
      fnLength,
      canSubmit,
    } = this.props;

    return (
      <Form
        submit={this.props.submit}
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
        <FormControlLabel
          control={
            <Checkbox
              name="hasCodeLimitation"
              defaultValue={hasCodeLimitation}
              onChange={this.toggleCodeLimitation}
              color="primary"
            />
          }
          label="Has code limitation"
        />
        <TextField
          disabled={!this.state.hasCodeLimitation}
          required={this.state.hasCodeLimitation}
          type="number"
          name="fnLength"
          label="Function length"
          defaultValue={fnLength}
        />
      </Form>
    );
  }
}
