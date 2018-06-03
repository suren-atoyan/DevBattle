import React from 'react';
import Button from '@material-ui/core/Button';
import UserIcon from '@material-ui/icons/AccountCircle';
import AdminIcon from '@material-ui/icons/Pets';

import { Link } from 'react-router-dom';

const RoleButton = ({ isAdmin, isGuest, isTeamMember }) => {

  let role;

  if (isGuest) (role = 'Guest');
  if (isTeamMember) (role = 'Team Member');
  if (isAdmin) (role = 'Admin');

  return (
    <Link className="link" to={ isAdmin ? '/admin' : '/challenges' } >
      <Button>
        { isAdmin ? <AdminIcon /> : <UserIcon /> }
        {role}
      </Button>
    </Link>
  );
}

export default RoleButton;
