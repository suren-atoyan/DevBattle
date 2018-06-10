import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './index.scss';


export default class TextField extends React.PureComponent{
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
            value: e.target.value
        });
        
        const { onChange } = this.props;
        onChange && onChange();
    }

    
    handleClickShowPassword = _ => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    getValue() {
        return this.props.hasOwnProperty('value') ? this.props.value : this.state.value;
    }

    render() {
        const { inputLabelProps, ...inputProps } = this.props;
        const { type, name } = inputProps;

        return (
            <div className="input-field-container">
                <FormControl
                    required={this.props.required}
                    error={this.props.error}
                >
                    <InputLabel {...this.props.inputLabelProps}>{this.props.label}</InputLabel>
                    <Input
                        className="input-field"
                        value={this.getValue()}
                        onChange={this.handleChange}
                        name={name}
                        {...inputProps}
                        type={type === 'password' ? (this.state.showPassword ? 'text' : 'password') : type}
                        endAdornment={
                            <InputAdornment position="end">
                                {  type === 'password' && (
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                )}
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
        )
    }
}
