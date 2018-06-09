import React, { PureComponent, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStore } from 'store';

const defaultState = {
  name: '',
  password: '',
};

class LoginDialog extends PureComponent {

  state = defaultState;

  handleNameChange = ev => this.setState({ name: ev.target.value });

  handlePasswordChange = ev => this.setState({ password: ev.target.value });

  login = _ => this.props.login({ ...this.state }) & this.clearTextField();

  handleEnterPress = ev => {
    const keycode = (ev.keyCode || ev.which);
    (keycode === 13) && (this.state.name && this.state.password) && this.login();
  }

  handleClose = _ => this.props.handleClose() & this.clearTextField();

  loginAsGuest = _ => this.props.loginAsGuest() & this.clearTextField();

  clearTextField() {
    this.setState(defaultState);
  }

  render() {
    const {
      open,
      isLoading,
      store: { activeHackathon }
    } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="login-dialog"
        >
          <DialogTitle>Login</DialogTitle>
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
                      label="Name"
                      type="name"
                      fullWidth
                      onChange={this.handleNameChange}
                      value={this.state.name}
                      onKeyPress={this.handleEnterPress}
                    />
                    <TextField
                      margin="dense"
                      label="Password"
                      type="password"
                      fullWidth
                      onChange={this.handlePasswordChange}
                      value={this.state.password}
                      onKeyPress={this.handleEnterPress}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={this.login} color="primary"
                      disabled={!(this.state.name && this.state.password)}
                    >
                      Login
                    </Button>
                    <Button onClick={this.loginAsGuest} color="primary">
                      Login as Guest
                    </Button>
                    {
                      activeHackathon && (
                        <Button onClick={this.props.openCreateTeamDialog}>
                          Create Your Team
                        </Button>
                      )
                    }
                  </DialogActions>
                </Fragment>
              )
          }
        </Dialog>
      </div>
    );
  }
};

export default withStore(LoginDialog);
