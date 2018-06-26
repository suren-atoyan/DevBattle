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
  hackathon: {
    name,
    duration,
    teams,
    results,
    started,
    finished,
  },
  startHackathon,
  finishHackathon,
  deleteHackathon,
  deleteTeam,
  isLoading,
}) => {
  return (
    isLoading
      ? (
        <Loading />
      )
      : (
        <Grid container className="hackathon-details" spacing={16}>
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
            startHackathon={startHackathon}
            finishHackathon={finishHackathon}
            deleteHackathon={deleteHackathon}
          />
        </Grid>
      )
  );
}

Details.propTypes = {
  hackathon: PropTypes.object.isRequired,
  startHackathon: PropTypes.func.isRequired,
  finishHackathon: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Details;
