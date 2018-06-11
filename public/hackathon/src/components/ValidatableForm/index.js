import React from 'react';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Button from 'components/Button';
import './index.scss';

export default class ValidatableForm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
    };

    this.formChildrenState = {};
  }

  handleSubmit = _ => {
    this.props.submit(this.formChildrenState);
  };

  handleChildChange = e => {
    const name = e.target.name;
    if (this.props.validation[name]) {
      this.formChildrenState[name] = e.target.value;
    }
    this.checkFormValidation();
  }

  checkFormValidation() {
    const { validation } = this.props;
    let canSubmit = false;

    for (let name in validation) {
      
      if (validation[name].required && !!this.formChildrenState[name]) {
        canSubmit = true;
      } else {
        canSubmit = false;
        this.setState({ canSubmit });
        break;
      }
    }

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
