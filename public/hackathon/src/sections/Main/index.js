import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Admin, Monitoring, Challenges } from 'pages';
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
      <Route component={NoMatch} />
    </Switch>
  );
}

export default withAuth(Content);
