import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { withRouter } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    position: 'absolute',
  },
  dot: {
    marginLeft: '20px'
  }
};

class DotsMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  toStep = activeStep => {
    const { history } = this.props;

    this.setState({ activeStep }, _ => history.push(`${this.state.activeStep + 1}`));
  }

  handleNext = _ => this.toStep(this.state.activeStep + 1);

  handleBack = _ => this.toStep(this.state.activeStep - 1);

  render() {
    const { classes, steps } = this.props;

    return (
      <MobileStepper
        variant="dots"
        steps={steps}
        position="bottom"
        activeStep={this.state.activeStep}
        classes={classes}
        nextButton={
          <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === steps - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    );
  }
}

DotsMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(DotsMobileStepper));
