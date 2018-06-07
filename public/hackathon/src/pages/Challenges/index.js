import React, { PureComponent, Fragment } from 'react';
import Challenge from './Challenge/';
import Stepper from 'components/Stepper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import { withStore } from 'store';

import './index.scss';

class Challenges extends PureComponent {

  render() {

    const { store: { activeHackathon } } = this.props;

    const hasActiveHackathon = !!activeHackathon;

    const hasChallenges = hasActiveHackathon && activeHackathon.challenges.length;

    return (
      <div
        className={classNames('challenges__wrapper', {
          centered: !hasChallenges,
        })}
      >
        {
          hasActiveHackathon || hasChallenges
            ? (
                <Fragment>
                  <div className="challenge__wrapper"><Challenge /></div>
                  <div className="challenges__stepper"><Stepper /></div>
                </Fragment>
              )
            : (
                <Typography variant="display3" align="center" className="challenges__noch">
                  {`There is no active ${!hasActiveHackathon ? 'hackathons' : 'challenges'}`}
                </Typography>
              )
        }
      </div>
    );
  }
}

export default withStore(Challenges);
