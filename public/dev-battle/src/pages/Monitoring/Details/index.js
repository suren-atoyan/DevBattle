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

  getChallenges(challenges, results, teamId, isGuestTeam) {
    const id = !teamId && isGuestTeam ? 'guests' : teamId;
    return challenges.map(({ name, _id }) => {
      const currentChallenge = results[id] && results[id]
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

  getTeams(challenges, teams, results, finished, isGuestTeam) {
    let renderingTeams = finished
      ? [...teams].sort((teamA, teamB) => getTeamScore(results, teamB) - getTeamScore(results, teamA))
      : [...teams];

    isGuestTeam && renderingTeams.push({ ...results.guests });

    return renderingTeams.map(({ name, _id: teamId }, index) => (
        <Card className="details__team-card" key={teamId || 1}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2" className="details__team-data">
              {!index && finished && <StarIcon className="details__team-data__winner-star" />}
              {name || 'Guests'} - Score {
                (teamId ? results[teamId] ? results[teamId].score : '0' : results.guests.score).toFixed(2)
              }
            </Typography>
            {this.getChallenges(challenges, results, teamId, isGuestTeam)}
          </CardContent>
        </Card>
    ));
  }

  render() {
    const {
      activeBattle: {
        duration,
        startTime,
        started,
        finished,
        winner,
        isGuestTeam,
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
            {
              finished
                ? (
                  <Typography variant="headline" className="details__heading">
                    The battle is finished
                  </Typography>
                )
                : (
                  <CountDown
                    styled
                    winner={winner}
                    started={started}
                    duration={duration}
                    finished={finished}
                    startTime={startTime}
                  />
                )
            }
          </CardContent>
        </Card>
        {this.getTeams(challenges, teams, results, finished, isGuestTeam)}
      </div>
    )
  }
}

Details.propTypes = {
  activeBattle: PropTypes.object.isRequired,
};

export default Details;
