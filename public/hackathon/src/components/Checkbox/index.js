import React from 'react';
import MUICheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import './index.scss';

export default class Checkbox extends React.PureComponent {

    state = {
        checked: false,
    }

    handleChange = e => {
        const checked = e.target.checked;
        const { onChange } = this.props;

        !this.props.hasOwnProperty('checked') && this.setState({ checked });
        onChange && onChange(checked);
    }


    getChecked() {
        return this.props.hasOwnProperty('checked') ? this.props.checked : this.state.checked;
    }

    render() {
        return (
            <div className="checkbox-container">
                <FormControlLabel
                    control={
                        <MUICheckbox
                            checked={this.getChecked()}
                            onChange={this.handleChange}
                            value="guest"
                            {...this.props}
                        />
                    }
                    label={this.props.label}
            />
            </div>
        )
    }
}