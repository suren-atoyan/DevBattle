import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';

// Decorators
import { withStyles } from '@material-ui/core/styles';

import './index.scss';

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

const helperTexts = {
  fnName: 'Function name should be declated ...',
  fnLength: 'The maximum length of source is ...',
  exclude: 'Those symboles or fragment ...',
  points: 'You can get mentioned points if ...',
}

const LineOfRequirements = ({ content, helperText }) => (
  <Typography>
    {content}
    <Tooltip
      title={<Typography className="helper-text" variant="body1">{helperText}</Typography>}
      noWrap
    >
      <HelpIcon className="helper-icon" />
    </Tooltip>
  </Typography>
);

const Description = ({
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
}) => (
  <div>
    <Card className={classes.card}>
      <CardContent className="challenge-info__content">
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
                <LineOfRequirements
                  content={`Function name - ${fnName}`}
                  helperText={helperTexts.fnName}
                />
                {fnLength &&
                  <LineOfRequirements
                    content={`Maximum source length - ${fnLength}`}
                    helperText={helperTexts.fnLength}
                  />
                }
                <LineOfRequirements
                  content={`Points - ${fnLength ? points / 2 : points}`}
                  helperText={helperTexts.points}
                />
                {exclude &&
                  <LineOfRequirements
                    content={`Exclude - "${exclude.join(', ')}"`}
                    helperText={helperTexts.exclude}
                  />
                }
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

Description.propTypes = {
  classes: PropTypes.object.isRequired,
};

Description.defaultProps = {
  challenge: {},
}

const DecoratedDescription = withStyles(styles)(Description);

DecoratedDescription.propTypes = {
  title: PropTypes.string.isRequired,
  requirements: PropTypes.bool,
  challenge: PropTypes.object,
}

export default DecoratedDescription;
