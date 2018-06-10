import React from 'react';
import MUIButton from '@material-ui/core/Button';
import './index.scss';

export default class Button extends React.PureComponent {
    render() {
        const { label, children, ...rest } = this.props;

        return (
            <div className="button-container">
                <MUIButton
                    variant="outlined" 
                    color="primary"
                    className="button"
                    {...rest}
                >
                    {label}
                    {children}
                </MUIButton>
            </div>
        )
    }
}
