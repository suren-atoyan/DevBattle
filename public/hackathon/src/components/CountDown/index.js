import React, {PureComponent} from 'react';
import './index.scss';
import Typography from '@material-ui/core/Typography';


class CountDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      min: 0,
      sec: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.duration);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown() {
    const {startDate, duration: dur} = this.props;
    const duration = dur.split(':').reduce((prev, value, index) => prev + value * (index ? 60 : 3600), 0);
    const diff = Math.floor((startDate + duration * 1000 - new Date().valueOf())/1000);
    const timeLeft = {
      hours: 0,
      min: 0,
      sec: 0,
    };

    timeLeft.hours = Math.floor(diff / 3600);
    timeLeft.min = Math.floor(diff % 3600 / 60);
    timeLeft.sec = diff % 60;

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
    const {hours, min, sec} = this.state;

    return (
      <Typography variant="headline" gutterBottom style={{textAlign: 'center', marginTop: '10px', color: '#fff'}}>
        <div className="countdown-element">
          <strong>{this.addLeadingZeros(hours)} : </strong>
          <strong>{this.addLeadingZeros(min)} : </strong>
          <strong>{this.addLeadingZeros(sec)}</strong>
        </div>
      </Typography>
    );
  }
}

export default CountDown;
