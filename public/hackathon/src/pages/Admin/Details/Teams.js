import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';

// Icons
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Teams = ({
  teams,
  deleteTeam,
}) => (
  <Grid item xs={4} className="hackathon-details__teams">
    <Paper elevation={4} className="hackathon-details__paper">
      <Typography align="left" variant="title">Teams</Typography>
      <List>
        {
          teams.map(team => (
            <ListItem button key={team._id}>
              <ListItemText>{team.name}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton aria-label="delete-team" color="secondary" onClick={deleteTeam.bind(this, team._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    </Paper>
  </Grid>
);

Teams.propTypes = {
  teams: PropTypes.array.isRequired,
  deleteTeam: PropTypes.func.isRequired,
};

export default Teams;
