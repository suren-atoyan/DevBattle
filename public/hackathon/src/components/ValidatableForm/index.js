import React, { PureComponent } from 'react';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Button from 'components/Button';
import './index.scss';

export default class ValidatableForm extends PureComponent {

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
      .some(name => (validation[name].required && !!this.formChildrenState[name]));

    this.setState({ canSubmit });
  }

  render() {
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
            children="Submit"
            label="Submit"
            disabled={!this.state.canSubmit}
            onClick={this.handleSubmit}
          >
            <TrendingFlatIcon />
          </Button>
        </div>
      </form>
    );
  }
}
