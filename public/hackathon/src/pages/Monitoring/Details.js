import React, {PureComponent} from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import CountDown from '../../components/CountDown';
const startDate = new Date().valueOf();

  class Details extends PureComponent {
  render() {
    const { activeHackathon: {teams, duration, challenges} } = this.props;

    return (
      <div>
        <Typography variant="headline" component="h2" style={{textAlign: 'center', marginTop: '10px'}} >
          DETAILS
        </Typography>
        <Card className='countDown'>
          <CardContent>
            <CountDown startDate={startDate} duration={duration} />
          </CardContent>
        </Card>
        {
          teams.map(({name, _id}) =>
            <Card className={`teamCard team-${name.split(" ").join('-')}`} key={_id}>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {name}
                </Typography>
                {
                  challenges.map(({resolved}, i) =>
                    <Button key={i} variant="raised" color={ resolved ? 'primary' : 'secondary' }>
                      Challenge {i+1}
                    </Button>
                  )
                }
              </CardContent>
            </Card>
          )
        }
      </div>
    )
  }
}
export default Details;