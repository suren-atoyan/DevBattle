import React, { PureComponent } from 'react';
import { withStore } from 'store';
import Grid from '@material-ui/core/Grid';
import NoActive from 'components/NoActive';
import Chart from 'components/Chart';
import Details from './details';

import './index.scss';

class Monitoring extends PureComponent {  
  render() {
    const { store: { activeHackathon } } = this.props;

    const hasHackathonStarted = activeHackathon && activeHackathon.started;
    
    return (
      <div className="monitoring">
        {
          hasHackathonStarted
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
            : <NoActive hasActiveHackathon={!!activeHackathon} />
        }
      </div>
    );
  }
}

export default withStore(Monitoring);
