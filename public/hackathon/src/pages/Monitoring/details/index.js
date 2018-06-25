import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';

// Components
import CountDown from '../CountDown/';

// Third-Party Libraries
import classNames from 'classnames';

// Utils
import { getTeamScore } from 'utils';

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

  getTeams(challenges, teams, results, finished) {
    const renderingTeams = finished
      ? [...teams].sort((teamA, teamB) => getTeamScore(results, teamB) - getTeamScore(results, teamA))
      : teams;

    return renderingTeams.map(({ name, _id: teamId }, index) => (
        <Card className="details__team-card" key={teamId}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2" className="details__team-data">
              {!index && finished && <StarIcon className="details__team-data__winner-star" />}
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
            {finished
            ? (<Typography variant="headline" className="details__heading">
              The hackathon is finished
              </Typography>)
            : (<CountDown
              styled
              winner={winner}
              started={started}
              duration={duration}
              finished={finished}
              startTime={startTime}
            />)}
          </CardContent>
        </Card>
        {this.getTeams(challenges, teams, results, finished)}
      </div>
    )
  }
}

Details.propTypes = {
  activeHackathon: PropTypes.object.isRequired,
};

export default Details;
