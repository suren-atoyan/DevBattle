import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function Description(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="headline" color="textSecondary">
            {props.name}
          </Typography>
          <Typography className={classes.pos} variant="body1">
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

Description.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description);