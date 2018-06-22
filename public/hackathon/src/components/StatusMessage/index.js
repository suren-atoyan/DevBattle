import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Snackbar from '@material-ui/core/Snackbar';

// TODO ::: Add messages for all kind of statuses

const getMessageBasedOnStatus = status => status === 401
  ? 'You are not authorized'
  : 'Something went wrong';

const defaultSnackbarPosition = { vertical: 'top', horizontal: 'right' };

const StatusMessage = props => {
  const message = props.statusData.errorMessage ||
    getMessageBasedOnStatus(props.statusData.status);

  return (
    <Snackbar
      anchorOrigin={defaultSnackbarPosition}
      message={message}
      open={true}
      onClose={props.handleClose}
    />
  );
}

StatusMessage.propTypes = {
  statusData: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};

export default StatusMessage;
