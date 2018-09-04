import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

export default props => <JssProvider jss={jss} generateClassName={generateClassName}>
  {props.children}
</JssProvider>
