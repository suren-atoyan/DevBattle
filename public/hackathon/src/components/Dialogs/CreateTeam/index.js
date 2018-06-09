import React, { PureComponent, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const defaultState = {
  name: '',
  password: '',
};

class LoginDialog extends PureComponent {

  state = defaultState;

  handleNameChange = ev => this.setState({ name: ev.target.value });

  handlePasswordChange = ev => this.setState({ password: ev.target.value });

  createTeam = async _ => {
    const success = await this.props.createTeam({ ...this.state });    

    if (success) {
      this.handleClose();
    }

    this.clearTextFieldValues();
  };

  handleEnterPress = ev => {
    const keycode = (ev.keyCode || ev.which);

    (keycode === 13) && (this.state.name && this.state.password) && this.createTeam();
  }

  handleClose = _ => this.props.handleClose() & this.clearTextFieldValues();

  clearTextFieldValues() {
    this.setState({ name: '', password: '' });
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
          aria-labelledby="create-team-dialog"
        >
          <DialogTitle>Crate Team</DialogTitle>
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
                      Please write your name and password for your team.
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
                      onClick={this.createTeam} color="primary"
                      disabled={!(this.state.name && this.state.password)}
                    >
                      Create
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
