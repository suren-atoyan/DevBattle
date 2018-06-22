import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';

// Components
import ChangePasswordDialog from 'components/Dialogs/ChangePassword';

// Decorators
import { withStyles } from '@material-ui/core/styles';
import { withAuth } from 'auth';

const styles = _ => ({
  button: {
    position: 'absolute',
    top: '5vh',
    right: '5vh',
    width: '2.5rem',
    height: '2.5rem',
  },
});

class Settings extends PureComponent {

  state = {
    isDialogOpen: false,
  };

  handleDialogOpen = _ => this.setState({ isDialogOpen: true });

  handleDialogClose = _ => this.setState({ isDialogOpen: false });

  render () {
    const {
      classes,
      authState: { isLoading },
      authActions: { changeAdminPassword },
    } = this.props;

    return (
      <Fragment>
        <Button
          className={classes.button}
          variant="fab"
          color="default"
          aria-label="settings"
          onClick={this.handleDialogOpen}>
          <SettingsIcon />
        </Button>

        <ChangePasswordDialog
          open={this.state.isDialogOpen}
          isLoading={isLoading}
          handleClose={this.handleDialogClose}
          changeAdminPassword={changeAdminPassword}
        />
      </Fragment>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
};

const DecoratedSettings = withAuth(withStyles(styles)(Settings));

DecoratedSettings.propTypes = {
  // This component doesn't expect any props from outside (until nowadays)
};

export default DecoratedSettings;
