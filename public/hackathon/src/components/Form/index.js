import React, { PureComponent } from 'react';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Button from '@material-ui/core/Button';

import './index.scss';

export default class Form extends PureComponent {

  state = {
    canSubmit: false,
  };

  formChildrenState = {};

  handleSubmit = _ => this.props.submit(this.formChildrenState);

  handleChildChange = e => {
    const name = e.target.name;

    if (this.props.validation[name]) {
      this.formChildrenState[name] = e.target.value;
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