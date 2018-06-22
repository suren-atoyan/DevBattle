import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.scss';

const Loading = _ => (<div className="main-preloader">
  <CircularProgress className="main-preloader__circle" size={50} />
</div>);

export default Loading;
