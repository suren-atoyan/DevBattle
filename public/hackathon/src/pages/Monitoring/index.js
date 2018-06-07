import React, { PureComponent } from 'react';
import { withStore } from 'store';
import NoActive from 'components/NoActive';

class Monitoring extends PureComponent {  
  render() {

    const { store: { activeHackathon } } = this.props;

    return (
      <div>
        {
          !activeHackathon
            ? 'Chart'
            : <NoActive />
        }
      </div>
    );
  }
}

export default withStore(Monitoring);
