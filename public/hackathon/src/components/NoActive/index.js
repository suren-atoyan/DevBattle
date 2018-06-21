import React from 'react';
import Typography from '@material-ui/core/Typography';

import './index.scss';

const defaultMessage = 'There is no active hackathons';
const notStartedMessage = 'Hackathon hasn\'t been started yet';

const NoActive = props => (
  <div className="no-active__wrapper">
    <Typography variant="display3" align="center" className="no-active__content">
      {
        props.value || (props.hasActiveHackathon
          ? notStartedMessage
          : defaultMessage)
      }
    </Typography>
  </div>
);

export default NoActive;