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

    return teams.map(({name, _id}) => (
      <Card className="details__team-card" key={_id}>
        <CardContent>
		          <Typography gutterBottom variant="headline" component="h2" className="details__team-data">
		          	{name} - Score {results[_id] ? results[_id].score : '0'}
		          </Typography>
          {
            challenges.map(({name}) =>
              <Chip
				        label={name}
             		key={_id}
				        avatar={<Avatar> {results[_id] ? results[_id].score : '0'} </Avatar>}
				        className={results[_id] && results[_id].score !== '0' ? 'challenge__solved' : 'unsolved'}
				      />
            )
          }
        </CardContent>
      </Card>
    ));
  }

  

  render() {
    const { activeHackathon: { duration, startDate, started, finished, winner } } = this.props;

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
            	startDate={startDate}
            />
          </CardContent>
        </Card>
        {this.getTeams()}
      </div>
    )
  }
}
