import React, {PureComponent} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CountDown from '../../../components/CountDown/index';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import './index.scss'

const startDate = new Date().valueOf();

export default class Details extends PureComponent {

  getTeams() {
    const {activeHackathon: {challenges, teams, results}} = this.props;
    console.log(this.props.activeHackathon.results);
    // TODO ::: Use results

    return teams.map(({name, _id}) => (
      <Card className="details__team-card" key={_id}>
        <CardContent>
		          <Typography gutterBottom variant="headline" component="h2" className="details__team-data">
		          	{name} - Score {results[_id] ? results[_id].score : '0'}
		          </Typography>
          {
            challenges.map(({name}) =>
              <Chip
				        avatar={<Avatar> {results[_id] ? results[_id].score : '0'} </Avatar>}
				        label={name}
				        className={results[_id] && results[_id].score !== '0' ? 'challenge__solved' : 'unsolved'}
				      />
            )
          }
        </CardContent>
      </Card>
    ));
  }

  getWinner() {
    const winner = 'Team 2';

    if (winner) {
      return (
        <Card className="details__winner-block">
          <CardContent>
            <Typography className="details__winner-team">
              The winner is {winner} !!!
            </Typography>
          </CardContent>
        </Card>
      )
    }
  }

  render() {
    const {activeHackathon: {duration, startDate}} = this.props;

    return (
      <div className="details">
        <Typography variant="headline" component="h2" className="details__title">
          details
        </Typography>
        <Card className="details__count-down">
          <CardContent>
            <CountDown startDate={startDate} duration={duration} styled/>
          </CardContent>
        </Card>
        {this.getWinner()}
        {this.getTeams()}
      </div>
    )
  }
}
