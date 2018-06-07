import React, { PureComponent } from 'react';

import Challenge from './Challenge/';

import Stepper from 'components/Stepper';

import './index.scss';

export default class Challenges extends PureComponent {

  render() {
    return (
      <div className="challenges__wrapper">
        <div className="challenge__wrapper"><Challenge /></div>
        <div className="challenges__stepper"><Stepper /></div>
      </div>
    );
  }
}
