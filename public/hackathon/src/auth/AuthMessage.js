import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const AuthMessage = props => {

  // TODO ::: Add messages for all kind of statuses

  const message = props.authData.status === 401
    ? 'You are not authorized'
    : 'Something went wrong';

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      message={message}
      open={true}
      onClose={props.handleClose}
    />
  );
}

export default AuthMessage;
