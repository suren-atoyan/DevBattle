import React, { PureComponent } from 'react';

import Form from 'components/Form';

export default class Admin extends PureComponent {
  render() {
    return (
      <Form
        validation={{
          name: {
            required: true,
          }
        }}
      >
        <input name="name" />
      </Form>
    );
  }
}