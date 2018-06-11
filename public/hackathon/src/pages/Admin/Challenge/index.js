import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Form from 'components/Form';
import Checkbox from '@material-ui/core/Checkbox';

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
  requirements: {
    required: false,
  },
  codeExample: {
    required: false,
  },
};

let countOfMounts = 0;

export default class Challenge extends Component {
  render() {

    const { name, description, hasCodeEditor } = this.props;

    return (
      <Form
        submit={this.props.submit}
        validation={challengeSchema}
        key={countOfMounts++} // Force update
      >
        <TextField
          required
          name="name"
          label="Name"
          defaultValue={name}
          onClick={this.stopPropagation}
        />
        <TextField
          required
          multiline
          defaultValue={description}
          name="description"
          label="Description"
          onClick={this.stopPropagation}
        />
        <div>
          <Checkbox
            name="hasCodeEditor"
            defaultValue={hasCodeEditor}
            color="primary"
          />
          Has code Editor
        </div>
      </Form>
    );
  }
}