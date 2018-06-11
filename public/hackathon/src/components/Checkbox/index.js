import React, { PureComponent } from 'react';
import MUICheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import './index.scss';

export default class Checkbox extends PureComponent {

  static getDerivedStateFromProps(props, state) {
    if (props.hasOwnProperty('checked') && (state.checked !== props.checked)) {
      return {
        checked: props.checked,
      }
    } else {
      return null;
    }
  }

  state = {
    checked: false,
  }

  handleChange = e => {
    const checked = e.target.checked;
    const { onChange } = this.props;

    !this.props.hasOwnProperty('checked') && this.setState({ checked });
    onChange && onChange(checked);
  }

  render() {
    return (
      <div className="checkbox-container">
        <FormControlLabel
          control={
            <MUICheckbox
              checked={this.state.checked}
              onChange={this.handleChange}
              value="guest"
              {...this.props}
            />
          }
          label={this.props.label}
      />
      </div>
    );
  }
}