import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

// Utils
import { getResultsWithNames } from 'utils';

const Scores = ({
  results,
  teams,
}) => (
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
);

Scores.propTypes = {
  results: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired,
};

export default Scores;
