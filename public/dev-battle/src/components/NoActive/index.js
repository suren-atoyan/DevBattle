import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Typography from '@material-ui/core/Typography';

import './index.scss';

// TODO ::: Move it to config file
const defaultMessage = 'There is no active battle';
const notStartedMessage = 'Battle hasn\'t been started yet';

const NoActive = props => (
  <div className="no-active__wrapper">
    <Typography variant="display3" align="center" className="no-active__content">
      {
        props.value || (props.hasActiveBattle
          ? notStartedMessage
          : defaultMessage)
      }
    </Typography>
  </div>
);

NoActive.propTypes = {
  hasActiveBattle: PropTypes.bool,
};

export default NoActive;
