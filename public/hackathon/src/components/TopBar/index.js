import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import LoginDialog from 'components/LoginDialog';

import { withRouter } from 'react-router';
import { getRouteTitle } from 'utils';
import { withAuth } from 'auth';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component {

  state = {
    isLoginDialogOpen: false,
  }

  handleLoginDialogOpen = _ => this.setState({ isLoginDialogOpen: true });

  handleLoginDialogClose = _ => this.setState({ isLoginDialogOpen: false });

  render() {
    const {
      classes,
      location: { pathname },
      authState: {
        isAuth,
        isLoading,
        login,
        logout,
        loginAsGuest,
      },
    } = this.props;

    const title = getRouteTitle(pathname);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {title}
            </Typography>

            <Button
              color="inherit"
              onClick={isAuth ? logout : this.handleLoginDialogOpen }
            >
              {
                isAuth
                  ? 'Logout'
                  : 'Logoin'
              }
            </Button>

          </Toolbar>
        </AppBar>

        <LoginDialog
          open={this.state.isLoginDialogOpen}
          handleClose={this.handleLoginDialogClose}
          login={login}
          loginAsGuest={loginAsGuest}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withAuth(withRouter(withStyles(styles)(ButtonAppBar)));
