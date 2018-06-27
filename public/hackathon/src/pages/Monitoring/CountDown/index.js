import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Typography from '@material-ui/core/Typography';

import './index.scss';

class CountDown extends PureComponent {

  state = {
    hours: 0,
    min: 0,
    sec: 0,
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidMount() {
    this.start(this.props.duration);
  }

  calculateCountdown() {
    const { startTime, duration: dur } = this.props;
    const [hours, minutes] = dur.split(':');
    const duration = hours * 3600 + minutes * 60;
    // TODO ::: Move to utils
    const diff = Math.floor((startTime + duration * 1000 - new Date().valueOf()) / 1000);

    return {
      hours: Math.floor(diff / 3600),
      min: Math.floor(diff % 3600 / 60),
      sec: diff % 60,
    };
  }

  start(duration) {
    this.intervalId = setInterval(_ => {
      const date = this.calculateCountdown(duration);

      if (Object.values(date).some(value => value < 0)) {
        clearInterval(this.intervalId);
        return;
      }

      this.setState(date);
    }, 1000);
  }

  makeDoubleDigitString(value) {
    return (value < 10)
      ? '0' + value
      : '' + value;
  }

  getWinner(winner) {
    return (
      <Typography className="details__winner-team">
        The winner is {this.props.winner} !!!
      </Typography>
    )
  }
  
  getCountDown(hours, min, sec, duration){
    return !this.props.styled 
      ? (
        <div>
          { this.makeDoubleDigitString(hours) } : { this.makeDoubleDigitString(min) } : { this.makeDoubleDigitString(sec) }
        </div>
      )
      : (
        <div className="countdown-element">
          <strong> {this.makeDoubleDigitString(hours)} : </strong>
          <strong> {this.makeDoubleDigitString(min)} : </strong>
          <strong> {this.makeDoubleDigitString(sec)} </strong>
        </div>
      )
  }

  render() {
    const { hours, min, sec } = this.state;
    const { started, finished, duration, startDate } = this.props;

    return started && !finished
      ? this.getCountDown(hours, min, sec, duration, startDate)
      : null;
  }
}

CountDown.propTypes = {
  styled: PropTypes.bool,
  winner: PropTypes.string,
  started: PropTypes.bool.isRequired,
  duration: PropTypes.string.isRequired,
  finished: PropTypes.bool.isRequired,
  startTime: PropTypes.number.isRequired,
};

export default CountDown;
