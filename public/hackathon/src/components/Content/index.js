import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Monitoring from 'components/Monitoring';
import Challenges from 'components/Challenges';
import Admin from 'components/Admin';
import NoMatch from 'components/NoMatch';

import PrivateRoute from 'auth/PrivateRoute';
import { withAuth } from 'auth';

const Content = ({ match, authState: { isAdmin, isGuest, isTeamMember } }) => {
  return (
    <Switch>
      <Route exact path="/" component={Monitoring} />
      <Route path="/monitoring" component={Monitoring} />
      <PrivateRoute path="/challenges" hasAccess={isAdmin || isGuest || isTeamMember} component={Challenges} />
      <PrivateRoute path="/admin" hasAccess={isAdmin} component={Admin} />
      <Route exact path="/404" component={NoMatch} />

      <Redirect to="/404" />
    </Switch>
  );
}

export default withAuth(Content);
