/* eslint-disable no-sequences */

import {
  consoleImage,
  consoleWarnText,
} from 'utils';

import {
  consoleWarnDefaultText,
  url,
} from 'config';

import './sass/main.scss';

import registerServiceWorker from './registerServiceWorker';

// Separate dependencies on small chunks for downloading them
// by http 2 more effectively until releasing async rendering in React.

Promise.all(
  [
    import('react'),
    import('react-dom'),
    import('react-router-dom'),
    import('./App'),
  ]
).then(([
  React,
  ReactDOM,
  { BrowserRouter },
  { default: App },
]) => {
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
});
