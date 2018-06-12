import React, {PureComponent} from 'react';
import {Card} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CountDown from '../../components/CountDown';

class Details extends PureComponent {
  render() {
    const { activeHackathon: {teams, duration} } = this.props;

    return (
      <div>
        <Typography variant="headline" component="h2" style={{textAlign: 'center', marginTop: '10px'}} >
          DETAILS
        </Typography>
        <Card className='countDown'>
          <CardContent>
            <CountDown duration={duration} />
          </CardContent>
        </Card>
        {
          teams.map(({name, _id}, i) =>
            <Card className={`teamCard team-${name.split(" ").join('-')}`} key={_id}>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {name}
                </Typography>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>)
        }

      </div>
    )
  }
}
export default Details;