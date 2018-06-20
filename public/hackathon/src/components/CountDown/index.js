import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
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

  start(duration) {
    this.intervalId = setInterval(_ => {
      const date = this.calculateCountdown(duration);
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

  getWinner(winner) {
    return (
          <Typography className="details__winner-team">
            The winner is {winner} !!!
          </Typography>
    )
  }
  
  getCountDown(hours, min, sec, duration){
  	this.start(duration);
  	return !this.props.styled 
  		? <div>
     		{ this.makeDoubleDigitString(hours) } : { this.makeDoubleDigitString(min) } : { this.makeDoubleDigitString(sec) }
    	</div>
    	: <div className="countdown-element">
        <strong> {this.makeDoubleDigitString(hours)} : </strong>
        <strong> {this.makeDoubleDigitString(min)} : </strong>
        <strong> {this.makeDoubleDigitString(sec)} </strong>
      </div>
  }

  render() {
    const { hours, min, sec } = this.state;
		const {  duration, startDate,  winner } = this.props;
		const started = true, finished = true;

		return started && !finished
						? this.getCountDown(hours, min, sec, duration, startDate)
	  				: !started && !finished ? null : this.getWinner(winner)
    					
  }
}

export default CountDown;
