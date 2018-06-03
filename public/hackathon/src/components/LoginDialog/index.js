import React, { PureComponent, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

class LoginDialog extends PureComponent {

  state = {
    textFieldValue: '',
  }

  handleTextFieldChange = ev => this.setState({ textFieldValue: ev.target.value });

  login = _ => this.props.login(this.state.textFieldValue) & this.clearTextField();

  handleEnterPress = ev => {
    const keycode = (ev.keyCode || ev.which);

    (keycode === 13) && this.login();
  }

  handleClose = _ => this.props.handleClose() & this.clearTextField();

  loginAsGuest = _ => this.props.loginAsGuest() & this.clearTextField();

  clearTextField() {
    this.setState({ textFieldValue: '' });
  }

  render() {
    const {
      open,
      isLoading,
    } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="login-dialog"
        >
          <DialogTitle id="form-dialog">Login</DialogTitle>
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
                      Please write your password to join one of teams of login as Guest.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Password"
                      type="password"
                      fullWidth
                      onChange={this.handleTextFieldChange}
                      value={this.state.textFieldValue}
                      onKeyPress={this.handleEnterPress}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.login} color="primary">
                      Login
                    </Button>
                    <Button onClick={this.loginAsGuest} color="primary">
                      Login as Guest
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

export default LoginDialog;
