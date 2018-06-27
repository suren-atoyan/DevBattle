/* eslint-disable no-sequences */
import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Grid from '@material-ui/core/Grid';

// Components
import Loading from 'components/Loading';
import Info from './Info';
import Teams from './Teams';
import Scores from './Scores';
import ActionButtons from './ActionButtons';

import './index.scss';

const Details = ({
  battle: {
    name,
    duration,
    teams,
    results,
    started,
    finished,
  },
  startBattle,
  finishBattle,
  deleteBattle,
  deleteTeam,
  isLoading,
}) => {
  return (
    isLoading
      ? (
        <Loading />
      )
      : (
        <Grid container className="battle-details" spacing={16}>
          <Info
            name={name}
            duration={duration}
          />
          <Teams
            teams={teams}
            deleteTeam={deleteTeam}
          />
          <Scores
            results={results}
            teams={teams}
          />
          <ActionButtons
            started={started}
            finished={finished}
            startBattle={startBattle}
            finishBattle={finishBattle}
            deleteBattle={deleteBattle}
          />
        </Grid>
      )
  );
}

Details.propTypes = {
  battle: PropTypes.object.isRequired,
  startBattle: PropTypes.func.isRequired,
  finishBattle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Details;
