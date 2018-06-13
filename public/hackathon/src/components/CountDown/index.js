import React, {PureComponent} from 'react';
import './index.scss';
import Typography from '@material-ui/core/Typography';


class CountDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      min: 0,
    }
  }

  componentDidMount() {
    console.log(this.props.duration);
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.duration);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }
  calculateCountdown(endDate) {
    let diff = endDate;

    const timeLeft = {
      hours: 0,
      min: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }

    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
    }

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const {min, hours} = this.state;

    return (
      <Typography variant="headline" gutterBottom style={{textAlign: 'center', marginTop: '10px', color: '#fff'}}>
        <span className="Countdown-col-element">
          <strong>{this.addLeadingZeros(hours)}</strong>
          <span>Hours</span>
          <strong>{this.addLeadingZeros(min)}</strong>
          <span>Min</span>
        </span>
      </Typography>
    );
  }
}

export default CountDown;
