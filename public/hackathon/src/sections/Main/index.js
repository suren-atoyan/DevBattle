import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Admin, Monitoring, Challenges } from 'pages';
import NoMatch from 'components/NoMatch';
import Paper from '@material-ui/core/Paper';
import PrivateRoute from 'auth/PrivateRoute';
import { withAuth } from 'auth';

import './index.scss';

const Content = ({ match, authState: { isAdmin, isGuest, isTeamMember, isLoading } }) => {
  return (
    <div className="main__wrapper">
      <Paper className="main__wrapper--paper" elevation={8}>
        <Switch>
          <Route exact path="/" component={Monitoring} />
          <Route path="/monitoring" component={Monitoring} />
          <PrivateRoute path="/challenges/:id?" isLoading={isLoading} hasAccess={isAdmin || isGuest || isTeamMember} component={Challenges} />
          <PrivateRoute path="/admin" isLoading={isLoading} hasAccess={isAdmin} component={Admin} />
          <Route exact path="/404" component={NoMatch} />
          <Redirect to="/404" />
        </Switch>
      </Paper>
    </div>
  );
}

export default withAuth(Content);
