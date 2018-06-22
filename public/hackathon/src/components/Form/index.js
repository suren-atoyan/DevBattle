import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Button from '@material-ui/core/Button';

import './index.scss';

class Form extends PureComponent {

  state = {
    canSubmit: false,
  };

  formChildrenState = {};

  handleSubmit = _ => this.props.submit(this.formChildrenState);

  handleChildChange = ({ target: { name, value, checked } }) => {

    const currentValue = value || checked;

    if (this.props.validation[name]) {
      this.formChildrenState[name] = currentValue;
      this.checkFormValidation();
    }
  }

  checkFormValidation() {
    const { validation } = this.props;
    const canSubmit = Object.keys(validation)
      .every(
        name => (
          validation[name].required
            ? !!this.formChildrenState[name]
            : true
        )
      );

    this.setState({ canSubmit });
  }

  render() {

    const canSubmit = this.props.hasOwnProperty('canSubmit')
      ? this.props.canSubmit && this.state.canSubmit
      : this.state.canSubmit;

    return (
      <form
        className={`form ${this.props.className ? this.props.className : ''}`}
        onChange={this.handleChildChange}
      >
        <div className="content">
          {this.props.children}
        </div>  
        <div className="footer">
          <Button
            color="primary"
            label="Submit"
            disabled={!canSubmit}
            onClick={this.handleSubmit}
          >
            Submit
            <TrendingFlatIcon />
          </Button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  submit: PropTypes.func,
  validation: PropTypes.object,
  canSubmit: PropTypes.bool,
};

export default Form;
