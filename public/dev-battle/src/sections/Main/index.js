import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Paper from '@material-ui/core/Paper';
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import { Admin, Monitoring, Challenges } from 'pages';
import NoMatch from 'components/NoMatch';

// Store provider
import PrivateRoute from 'auth/PrivateRoute';

// Decorators
import { withAuth } from 'auth';

import './index.scss';

const Content = ({ authState: { isAdmin, isGuest, isTeamMember, isLoading } }) => {
  return (
    <div className="main__wrapper">
      <Paper className="main__wrapper--paper" elevation={8}>
        <Switch>
          <Redirect exact from="/" to="/monitoring" component={Monitoring} />
          <Route path="/monitoring" component={Monitoring} />
          <PrivateRoute path="/challenges/:id" exact isLoading={isLoading} hasAccess={isAdmin || isGuest || isTeamMember} component={Challenges} />
          <Redirect from="/challenges" exact to="/challenges/1" />
          <PrivateRoute path="/admin" isLoading={isLoading} hasAccess={isAdmin} component={Admin} />
          <Route exact path="/404" component={NoMatch} />
          <Redirect to="/404" />
        </Switch>
      </Paper>
    </div>
  );
}

Content.propTypes = {
  authState: PropTypes.object.isRequired,
};

const DecoratedContent = withAuth(Content);

DecoratedContent.propTypes = {
  // This component doesn't expect any props from outside (until nowadays)
};

export default DecoratedContent;
