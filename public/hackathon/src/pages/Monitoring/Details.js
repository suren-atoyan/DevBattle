import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CountDown from '../../components/CountDown';

import './details.scss'

const startDate = new Date().valueOf();

export default class Details extends PureComponent {

  getTeams() {
    const { activeHackathon: { teams, challenges } } = this.props;

    // TODO ::: Use results

    return teams.map(({ name, _id }) => (
      <Card className="details__team-card" key={_id}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {name}
          </Typography>
          {
            challenges.map(({ name, _id }) =>
              <Button key={_id} variant="raised">
                { name }
              </Button>
            )
          }
        </CardContent>
      </Card>
    ));
  }

  render() {
    const { activeHackathon: { duration } } = this.props;

    return (
      <div className="details">
        <Typography variant="headline" component="h2" className="details__title" >
          deatails
        </Typography>
        <Card className="details__count-down">
          <CardContent>
            <CountDown startDate={startDate} duration={duration} />
          </CardContent>
        </Card>
        {this.getTeams()}
      </div>
    )
  }
}
