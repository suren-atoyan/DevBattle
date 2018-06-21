import React, { PureComponent, Fragment } from 'react';
import Challenge from './Challenge/';
import Stepper from 'components/Stepper';
import NoActive from 'components/NoActive';

import { withStore } from 'store';
import { withAuth } from 'auth';
import { withRouter } from 'react-router-dom';

import './index.scss';

class Challenges extends PureComponent {

  sendResult = (source, challengeId) => {

    const { isGuest, isAdmin, team } = this.props.authState;

    const result = {
      source,
      challengeId,
    }

    !(isGuest || isAdmin) && (result.teamId = team._id);

    this.props.storeActions.sendChallengeAnswer(result);
  }

  getChallengesContent() {

    const {
      match: { params },
      store: {
        activeHackathon: {
          challenges,
          results: allResults,
          started,
          finished,
        },
      },
      authState: { team },
    } = this.props;

    const results = team
      ? allResults[team._id]
      : allResults.guests;

    if (!params.id) {
      return null;
    }

    const currentChallenge = challenges[params.id - 1];

    if (!currentChallenge) return <NoActive value="There is no such kind of challenge" />;


    return (
      <Fragment>
        <div className="challenge__wrapper">
          <Challenge
            {...currentChallenge}
            sendResult={this.sendResult}
            results={results}
            started={started}
            finished={finished}
          />
        </div>
        <div className="challenges__stepper">
          <Stepper steps={challenges.length} />
        </div>
      </Fragment>
    );
  }

  render() {

    const { store: { activeHackathon } } = this.props;

    const hasHackathonStarted = activeHackathon && activeHackathon.started;

    return (
      <div
        className="challenges__wrapper"
      >
        {
          hasHackathonStarted
            ? this.getChallengesContent()
            : <NoActive hasActiveHackathon={!!activeHackathon} />
        }
      </div>
    );
  }
}

export default withRouter(withStore(withAuth(Challenges)));
