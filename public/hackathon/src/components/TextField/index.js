import React, { PureComponent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './index.scss';

export default class TextField extends PureComponent {

  static getDerivedStateFromProps(props, state) {
    if (props.hasOwnProperty('value') && (state.value !== props.value)) {
      return {
        value: props.value,
      }
    } else {
      return null;
    }
  }

  state = {
    value: '',
    showPassword: false,
  }

  static defaultProps = {
    type: 'Text',
    label: 'Name',
    error: false,
    required: false,
  }

  handleChange = e => {
    !this.props.hasOwnProperty('value') && this.setState({
        value: e.target.value,
    });

    this.props.onChange && this.props.onChange();
  }

  toggleShowPassword = _ => this.setState({ showPassword: !this.state.showPassword });

  render() {
    const { inputLabelProps, ...inputProps } = this.props;
    const { type, name, required, error, label } = inputProps;

    return (
      <div className="input-field-container">
        <FormControl
          required={required}
          error={error}
        >
          <InputLabel {...inputLabelProps}>{label}</InputLabel>
          <Input
            className="input-field"
            value={this.state.value}
            onChange={this.handleChange}
            name={name}
            {...inputProps}
            type={type === 'password' ? (this.state.showPassword ? 'text' : 'password') : type}
            endAdornment={
              <InputAdornment position="end">
                { type === 'password' && (
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.toggleShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    );
  }
}
