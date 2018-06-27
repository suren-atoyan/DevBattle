import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const ActionButtons = ({
  started,
  finished,
  startBattle,
  finishBattle,
  deleteBattle,
}) => (
  <Grid item xs={4} className="battle-details__state">
    <Button onClick={startBattle} disabled={started}>Start</Button>
    <Button onClick={finishBattle} disabled={started && finished}>Finish</Button>
    <Button onClick={deleteBattle} color="secondary" >Delete</Button>
  </Grid>
);

ActionButtons.propTypes = {
  started: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  startBattle: PropTypes.func.isRequired,
  finishBattle: PropTypes.func.isRequired,
  deleteBattle: PropTypes.func.isRequired,
};

export default ActionButtons;
