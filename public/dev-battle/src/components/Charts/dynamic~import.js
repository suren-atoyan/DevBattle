import React from 'react';

import Bar from './Bar';
import Pie  from './Pie';

const _Bar = props => <Bar {...props} />;
const _Pie = props => <Pie {...props} />;

export { _Bar, _Pie };
