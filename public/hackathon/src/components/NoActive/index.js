import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Typography from '@material-ui/core/Typography';

import './index.scss';

const defaultMessage = "There is no active hackathons";

const NoActive = props => (
  <div className="no-active__wrapper">
    <Typography variant="display3" align="center" className="no-active__content">
      { props.value || defaultMessage }
    </Typography>
  </div>
);

NoActive.propTypes = {
  hasActiveHackathon: PropTypes.bool,
};

export default NoActive;
