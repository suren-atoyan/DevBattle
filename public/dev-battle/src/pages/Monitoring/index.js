import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Grid from '@material-ui/core/Grid';

// Components
import NoActive from 'components/NoActive';
import Charts from 'components/Charts';
import Loading from 'components/Loading';
import Details from './Details';

// Decorators
import { withStore } from 'store';

import './index.scss';

const Monitoring = ({ store: { activeBattle, isLoading } }) => (
  <div className="monitoring">
    {
      activeBattle
        ? activeBattle.started
            ? (
                <Grid container spacing={24}>
                  <Grid item xs={8} className="monitoring__column">
                    <Charts activeBattle={activeBattle} />
                  </Grid>
                  <Grid item xs={4} className="monitoring__column">
                    <Details activeBattle={activeBattle} />
                  </Grid>
                </Grid>
              )
            : <NoActive hasActiveBattle={!!activeBattle} />
        : isLoading
            ? <Loading />
            : <NoActive hasActiveBattle={!!activeBattle} />
    }
  </div>
);

Monitoring.propTypes = {
  store: PropTypes.object.isRequired,
};

const DecoratedMonitoring = withStore(Monitoring);

DecoratedMonitoring.propTypes = {
  // This component doesn't expect any props from outside (until nowadays)
};

export default DecoratedMonitoring;
