import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    marginBottom: '1rem',
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
  const {
    classes,
    titleColor,
    title,
    content,
    requirements,
    challenge: {
      fnName,
      fnLength,
      exclude,
      points,
    }
  } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            variant="headline"
            style={{color: titleColor || 'rgba(0, 0, 0, 0.54)'}}
          >
            {title}
          </Typography>
          {
            requirements
              ? (
                <Fragment>
                  <Typography>Function name - {fnName}</Typography>
                  {fnLength && <Typography>Maximum source length - {fnLength}</Typography>}
                  <Typography>Points - {points || 1}</Typography>
                  {exclude && <Typography>Exclude - "{exclude.join(', ')}"</Typography>}
                </Fragment>
              )
              : (
                <Typography className={classes.pos} variant="body1">
                  {content}
                </Typography>
              )
          }
        </CardContent>
      </Card>
    </div>
  );
}

Description.propTypes = {
  classes: PropTypes.object.isRequired,
};

Description.defaultProps = {
  challenge: {},
}

export default withStyles(styles)(Description);