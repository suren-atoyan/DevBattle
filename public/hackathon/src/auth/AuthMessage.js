import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

// TODO ::: Add messages for all kind of statuses

const getMessageBasedOnStatus = status => status === 401
  ? 'You are not authorized'
  : 'Something went wrong';

const defaultSnackbarPosition = { vertical: 'top', horizontal: 'right' };

const AuthMessage = props => {
  const message = getMessageBasedOnStatus(props.authData.status);

  return (
    <Snackbar
      anchorOrigin={defaultSnackbarPosition}
      message={message}
      open={true}
      onClose={props.handleClose}
    />
  );
}

export default AuthMessage;
