import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Monitoring from 'components/Monitoring';
import Challenges from 'components/Challenges';
import Admin from 'components/Admin';
import NoMatch from 'components/NoMatch';

const Content = ({ match }) => {
  return (
    <Switch>
      <Route exact path='/' component={Monitoring} />
      <Route path='/monitoring' component={Monitoring} />
      <Route path='/challenges' component={Challenges} />
      <Route path='/admin' component={Admin} />
      <Route exact path='/404' component={NoMatch} />

      <Redirect to='/404' />
    </Switch>
  );
}

export default Content;
