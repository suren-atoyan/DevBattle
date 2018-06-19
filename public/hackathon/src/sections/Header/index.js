import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChartIcon from '@material-ui/icons/ShowChart';
import Tooltip from '@material-ui/core/Tooltip';
import LoginDialog from 'components/Dialogs/Login/';
import CreateTeamDialog from 'components/Dialogs/CreateTeam/';
import NavigationButtons from 'components/NavigationButtons';

import { withRouter, Link } from 'react-router-dom';
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

class TopBar extends PureComponent {

  state = {
    isLoginDialogOpen: false,
    isAuth: false,
    isOpenCreateTeamDialog: false,
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

  openCreateTeamDialog = _ => this.setState({ isOpenCreateTeamDialog: true });

  closeCreateTeamDialog = _ => this.setState({ isOpenCreateTeamDialog: false });

  render() {
    const {
      classes,
      location: { pathname },
      authState: {
        isLoading,
        isAdmin,
        isGuest,
        isTeamMember,
        team,
      },
      authActions: {
        login,
        logout,
        loginAsGuest,
      },
      store: {
        activeHackathon,
        isLoading: isLoadingStore,
      },
      storeActions: {
        createTeam,
      },
    } = this.props;

    const title = getRouteTitle(pathname);
    const hackathonName = activeHackathon
      ? `${activeHackathon.name} - `
      : '';

    let role;

    if (isGuest) (role = 'Guest');
    if (isAdmin) (role = 'Admin');
    if (isTeamMember) {
      role = team.name;
    }

    return (
      <div className={classes.root}>
        <AppBar color="default" position="static">
          <Toolbar>
            <Link to="/monitoring" className="link">
              <Tooltip title="Monitoring">
                <IconButton variant="fab" className={classes.menuButton} color="secondary" aria-label="charts">
                  <ChartIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {hackathonName}
              {title}
            </Typography>

            {
              this.state.isAuth && (
                <Fragment>
                  <Typography variant="title">
                    {role}
                  </Typography>
                  <NavigationButtons
                    isAdmin={isAdmin}
                    isGuest={isGuest}
                    isTeamMember={isTeamMember}
                  />
                </Fragment>
              )
            }

            <Button
              color="inherit"
              onClick={this.state.isAuth ? logout : this.handleLoginDialogOpen }
            >
              {
                this.state.isAuth
                  ? 'Logout'
                  : 'Login'
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
          openCreateTeamDialog={this.openCreateTeamDialog}
        />

        <CreateTeamDialog
          open={this.state.isOpenCreateTeamDialog}
          handleClose={this.closeCreateTeamDialog}
          createTeam={createTeam}
          isLoading={isLoadingStore}
        />

      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withAuth(withStore(withStyles(styles)(TopBar))));
