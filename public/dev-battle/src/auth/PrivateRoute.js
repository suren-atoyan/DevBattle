import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Loading from 'components/Loading';

// Source ::: https://reacttraining.com/react-router/web/example/auth-workflow

const PrivateRoute = ({ component: Component, hasAccess, isLoading, ...rest }) => {
  return (<Route
    {...rest}
    render = {
      (props) => isLoading
        ? <Loading />
        : hasAccess
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      }
  />);
};

export default PrivateRoute;
