import React, { Fragment } from 'react';
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

export default NavigationButtons;
