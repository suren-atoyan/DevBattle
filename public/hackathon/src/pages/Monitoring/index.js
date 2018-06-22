import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Grid from '@material-ui/core/Grid';

// Components
import NoActive from 'components/NoActive';
import Chart from './Chart';
import Details from './details';

// Decorators
import { withStore } from 'store';

import './index.scss';

const Monitoring = ({ store: { activeHackathon } }) => (
  <div className="monitoring">
    {
      activeHackathon
        ? (
            <Grid container spacing={24}>
              <Grid item xs={8}>
                <Chart activeHackathon={activeHackathon} />
              </Grid>
              <Grid item xs={4}>
                <Details activeHackathon={activeHackathon} />
              </Grid>
            </Grid>
          )
        : <NoActive />
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
