import React from 'react';
import Typography from '@material-ui/core/Typography';

import './index.scss';

const NoActive = props => (
  <div className="no-active__wrapper">
    <Typography variant="display3" align="center" className="no-active__content">
      There is no active hackathons
    </Typography>
  </div>
);

export default NoActive;