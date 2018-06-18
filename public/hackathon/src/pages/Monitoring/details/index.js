import React, {PureComponent} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CountDown from '../../../components/CountDown/index';

import './index.scss'

const startDate = new Date().valueOf();

export default class Details extends PureComponent {

  getTeams() {
    const {activeHackathon: {challenges, teams}} = this.props;
    console.log(this.props.activeHackathon.results);
    // TODO ::: Use results

    return teams.map(({name, _id}) => (
      <Card className="details__team-card" key={_id}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {name}
          </Typography>
          {
            challenges.map(({name, _id}) =>
              <Button key={_id} variant="raised" disableRipple>
                {name}
              </Button>
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
            <Typography>
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
