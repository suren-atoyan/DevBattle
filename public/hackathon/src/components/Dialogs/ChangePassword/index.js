import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const defaultState = {
  password: '',
  confirmPassword: '',
};

class ChangePasswordDialog extends PureComponent {

  state = defaultState;

  handlePasswordChange = ev => this.setState({ password: ev.target.value });

  handleConfirmPasswordChange = ev => this.setState({ confirmPassword: ev.target.value });

  changePassword = async _ => this.props.changeAdminPassword({ password: this.state.password });

  handleEnterPress = ev => {
    const keycode = (ev.keyCode || ev.which);

    (keycode === 13) && this.canSubmit() && this.changePassword();
  }

  handleClose = _ => this.props.handleClose() & this.clearTextFieldValues();

  canSubmit() {
    return this.state.password && this.state.password === this.state.confirmPassword;
  }

  clearTextFieldValues() {
    this.setState(defaultState);
  }

  render() {
    const {
      isLoading,
      open,
    } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="change-password-dialog"
        >
          <DialogTitle>Change Admin Password</DialogTitle>
          {
            isLoading
            ? (
                <DialogContent>
                  <CircularProgress color="secondary" />
                </DialogContent>
              )
            : (
                <Fragment>
                  <DialogContent>
                    <DialogContentText>
                      Please enter new password. (Passwords must be at least 6 characters long)
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="New password"
                      type="password"
                      fullWidth
                      onChange={this.handlePasswordChange}
                      value={this.state.password}
                      onKeyPress={this.handleEnterPress}
                    />
                    <TextField
                      margin="dense"
                      label="Confirm new password"
                      type="password"
                      fullWidth
                      onChange={this.handleConfirmPasswordChange}
                      value={this.state.confirmPassword}
                      onKeyPress={this.handleEnterPress}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={this.changePassword} color="primary"
                      disabled={!this.canSubmit()}
                    >
                      Change
                    </Button>
                  </DialogActions>
                </Fragment>
              )
          }
        </Dialog>
      </div>
    );
  }
};

ChangePasswordDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  changeAdminPassword: PropTypes.func.isRequired,
};

export default ChangePasswordDialog;
