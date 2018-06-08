import React, { PureComponent } from 'react';
import { withStore } from 'store';
import NoActive from 'components/NoActive';
import Chart from 'components/Chart';

import './index.scss';

class Monitoring extends PureComponent {  
  render() {

    const { store: { activeHackathon } } = this.props;

    return (
      <div className="monitoring">
        {
          activeHackathon
            ? <Chart />
            : <NoActive />
        }
      </div>
    );
  }
}

export default withStore(Monitoring);
