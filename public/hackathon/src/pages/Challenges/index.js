import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// Components
import Challenge from './Challenge/';
import Stepper from 'components/Stepper';
import NoActive from 'components/NoActive';

// Decorators
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
            challenge={currentChallenge}
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

    const hasActiveHackathon = !!activeHackathon;

    const noActiveProps = activeHackathon && !activeHackathon.started
      ? { value: 'Hackathon hasn\'t been started yet' }
      : {};

    return (
      <div
        className="challenges__wrapper"
      >
        {
          hasActiveHackathon && activeHackathon.started
            ? this.getChallengesContent()
            : <NoActive {...noActiveProps} />
        }
      </div>
    );
  }
}

Challenges.propTypes = {
  store: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

const DecoratedChallenges = withRouter(withStore(withAuth(Challenges)));

DecoratedChallenges.propTypes = {
  // This component doesn't expect any props from outside (until nowadays)
};

export default DecoratedChallenges;
