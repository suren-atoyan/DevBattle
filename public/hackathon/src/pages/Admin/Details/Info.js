import React from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const Info = ({
  name,
  duration,
}) => (
  <Grid item xs={4} className="hackathon-details__main-info">
    <Paper elevation={4} className="hackathon-details__paper">
      <Typography align="left" variant="title">Info</Typography>
      <List>
        <ListItem button>{`Name - ${name}`}</ListItem>
        <ListItem button>{`Duration - ${duration}`}</ListItem>
      </List>
    </Paper>
  </Grid>
);

Info.propTypes = {
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

export default Info;
