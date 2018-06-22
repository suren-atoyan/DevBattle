import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Button from '@material-ui/core/Button';
import ChallengesIcon from '@material-ui/icons/InsertChart';
import AdminIcon from '@material-ui/icons/Pets';
import { Link } from 'react-router-dom';

const NavigationButtons = ({ isAdmin, isGuest, isTeamMember }) => {
  return (
    <Fragment>
      <Link className="link" to="/challenges" >
        <Button>
          <ChallengesIcon />
          Challenges
        </Button>
      </Link>
      {
        isAdmin && <Link className="link" to="/admin" >
          <Button>
            <AdminIcon />
            Admin
          </Button>
        </Link>
      }
    </Fragment>
  );
}

NavigationButtons.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isGuest: PropTypes.bool.isRequired,
  isTeamMember: PropTypes.bool.isRequired,
}

export default NavigationButtons;
