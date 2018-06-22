/* eslint-disable no-sequences */
import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

// Components
import Loading from 'components/Loading';

import './index.scss';

const getResultsWithNames = (results, teams) => Object.keys(results).reduce(
  (acc, key) => (acc.push(
    key === 'guests'
      ? {
        name: 'Guests',
        _id: 1,
        ...results.guests,
      }
      : { ...teams.find(team => team._id === key), ...results[key] }
  ), acc),
  [],
);

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
  hackathon,
  isLoading,
}) => {
  return (
    isLoading
      ? (
        <Loading />
      )
      : (
        <Grid container className="hackathon-details" spacing={16}>
          <Grid item xs={4} className="hackathon-details__main-info">
            <Paper elevation={4} className="hackathon-details__paper">
              <Typography align="left" variant="title">Info</Typography>
              <List>
                <ListItem button>{`Name - ${name}`}</ListItem>
                <ListItem button>{`Duration - ${duration}`}</ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={4} className="hackathon-details__teams">
            <Paper elevation={4} className="hackathon-details__paper">
              <Typography align="left" variant="title">Teams</Typography>
              <List>
                {
                  teams.map(team => (
                    <ListItem button key={team._id}>
                      <ListItemText>{team.name}</ListItemText>
                    </ListItem>
                  ))
                }
              </List>
            </Paper>
          </Grid>
          <Grid item xs={4} className="hackathon-details__results">
            <Paper elevation={4} className="hackathon-details__paper">
              <Typography align="left" variant="title">Scores</Typography>
              <List>
                {getResultsWithNames(results, teams).map(result => (
                  <ListItem button key={result._id}>
                    <ListItemText>{result.score}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={4} className="hackathon-details__state">
            <Button onClick={startHackathon} disabled={started}>Start</Button>
            <Button onClick={finishHackathon} disabled={started && finished}>Finish</Button>
          </Grid>
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
