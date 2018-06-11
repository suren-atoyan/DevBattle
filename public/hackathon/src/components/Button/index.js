import React from 'react';
import MUIButton from '@material-ui/core/Button';
import './index.scss';

const Button = ({ label, children, ...rest }) => (
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
);

export default Button;
