import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

// Components
import CountDown from '../CountDown/';

// Third-Party Libraries
import classNames from 'classnames';

import './index.scss';

class Details extends PureComponent {

  getChallenges(challenges, results, teamId) {
    return challenges.map(({ name, _id }) => {
      const currentChallenge = results[teamId] && results[teamId]
        .confirmedSolutions.find(({ challengeId }) => challengeId === _id);

      const solved = currentChallenge && currentChallenge.points !== 0;

      return (
        <Chip
          label={name}
          key={_id}
          avatar={<Avatar> {
            currentChallenge
              ? currentChallenge.points
              : '0'
          } </Avatar>}
          className={classNames('challenge__info', {
            'challenge__solved': solved,
            'challenge__unsolved': !solved,
          })}
        />
      );
    });
  }

  getTeams(challenges, teams, results) {
    return teams.map(({ name, _id: teamId }) => (
      <Card className="details__team-card" key={teamId}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2" className="details__team-data">
            {name} - Score {results[teamId] ? results[teamId].score : '0'}
          </Typography>
          {this.getChallenges(challenges, results, teamId)}
        </CardContent>
      </Card>
    ));
  }

  render() {
    const {
      activeHackathon: {
        duration,
        startTime,
        started,
        finished,
        winner,
        challenges,
        teams,
        results,
      }
    } = this.props;

    return (
      <div className="details">
        <Typography variant="headline" component="h2" className="details__title">
          details
        </Typography>
        <Card className="details__count-down">
          <CardContent>
            <CountDown
              styled
              winner={winner}
              started={started}
              duration={duration}
              finished={finished}
              startTime={startTime}
            />
          </CardContent>
        </Card>
        {this.getTeams(challenges, teams, results)}
      </div>
    )
  }
}

Details.propTypes = {
  activeHackathon: PropTypes.object.isRequired,
};

export default Details;
