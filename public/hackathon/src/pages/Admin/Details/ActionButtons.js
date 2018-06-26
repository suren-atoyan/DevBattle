import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const ActionButtons = ({
  started,
  finished,
  startHackathon,
  finishHackathon,
  deleteHackathon,
}) => (
  <Grid item xs={4} className="hackathon-details__state">
    <Button onClick={startHackathon} disabled={started}>Start</Button>
    <Button onClick={finishHackathon} disabled={started && finished}>Finish</Button>
    <Button onClick={deleteHackathon} color="secondary" >Delete</Button>
  </Grid>
);

ActionButtons.propTypes = {
  started: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  startHackathon: PropTypes.func.isRequired,
  finishHackathon: PropTypes.func.isRequired,
  deleteHackathon: PropTypes.func.isRequired,
};

export default ActionButtons;
