/* eslint-disable no-sequences */
import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import {
  consoleImage,
  consoleWarnText,
} from 'utils';

import {
  consoleWarnDefaultText,
  url,
} from 'config';

import registerServiceWorker from './registerServiceWorker';

process.env.NODE_ENV === 'production' && Promise.resolve().then(_ => (
  consoleWarnText(consoleWarnDefaultText),
  consoleImage(url.console_image_why)
));

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
