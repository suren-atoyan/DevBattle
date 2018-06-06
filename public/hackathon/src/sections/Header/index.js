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
import RoleButton from 'components/RoleButton';

import { withRouter } from 'react-router';
import { getRouteTitle } from 'utils';
import { withAuth } from 'auth';

import { withStore } from 'store';

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

class TopBar extends Component {

  state = {
    isLoginDialogOpen: false,
    isAuth: false,
  }

  static getDerivedStateFromProps(props, state) {
    const { isTeamMember, isAdmin, isGuest } = props.authState;

    const isAuth = isTeamMember || isAdmin || isGuest;

    const changes = {};

    if (isAuth !== state.isAuth) {
      changes.isAuth = isAuth;
    }

    if (isAuth && state.isLoginDialogOpen) {
      changes.isLoginDialogOpen = false;
    }

    return Object.keys(changes).length ? changes : null;
  }

  handleLoginDialogOpen = _ => this.setState({ isLoginDialogOpen: true });

  handleLoginDialogClose = _ => this.setState({ isLoginDialogOpen: false });

  render() {
    const {
      classes,
      location: { pathname },
      authState: {
        isLoading,
        login,
        logout,
        loginAsGuest,
        isAdmin,
        isGuest,
        isTeamMember,
      },
      store: {
        activeHackathon,
      }
    } = this.props;

    const title = getRouteTitle(pathname);
    const hackathonName = activeHackathon
      ? activeHackathon.name
      : 'no name';

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {hackathonName}
              -------
              {title}
            </Typography>

            {
              this.state.isAuth && (
                <RoleButton
                  isAdmin={isAdmin}
                  isGuest={isGuest}
                  isTeamMember={isTeamMember}
                />
              )
            }

            <Button
              color="inherit"
              onClick={this.state.isAuth ? logout : this.handleLoginDialogOpen }
            >
              {
                this.state.isAuth
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

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStore(withAuth(withRouter(withStyles(styles)(TopBar))));
