import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const AuthMessage = props => {

  const message = props.authData.status === 401 ? 'You are not authorized' : 'Something went wrong';

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      message={message}
      open={props.open}
      onClose={props.handleClose}
    />
  );
}

export default AuthMessage;
