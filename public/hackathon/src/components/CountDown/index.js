import React, { PureComponent } from 'react';

import './index.scss';

class CountDown extends PureComponent {
  state = {
    hours: 0,
    min: 0,
    sec: 0,
  };

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown() {
    const { startDate, duration: dur } = this.props;
    const [hours, minutes] = dur.split(':');
    const duration = hours * 3600 + minutes * 60;
    const diff = Math.floor((startDate + duration * 1000 - new Date().valueOf()) / 1000);

    return {
      hours: Math.floor(diff / 3600),
      min: Math.floor(diff % 3600 / 60),
      sec: diff % 60,
    };
  }

  start() {
    this.intervalId = setInterval(_ => {
      const date = this.calculateCountdown(this.props.duration);
      this.setState(date);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  makeDoubleDigitString(value) {
    return (value < 10)
      ? '0' + value
      : '' + value;
  }

  render() {
    const {hours, min, sec} = this.state;

    console.log(this.props)
    return this.props.styled ?
      <div className="countdown-element">
        <strong>{this.makeDoubleDigitString(hours)} : </strong>
        <strong>{this.makeDoubleDigitString(min)} : </strong>
        <strong>{this.makeDoubleDigitString(sec)}</strong>
      </div>
      : <div>
        {this.makeDoubleDigitString(hours)} : {this.makeDoubleDigitString(min)} : {this.makeDoubleDigitString(sec)}
      </div>;
  }
}

export default CountDown;
