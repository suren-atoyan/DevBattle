import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Source ::: https://reacttraining.com/react-router/web/example/auth-workflow

const PrivateRoute = ({ component: Component, hasAccess, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => hasAccess
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      }
  />
);

export default PrivateRoute;
