import React, { PureComponent, Fragment } from 'react';
import Challenge from './Challenge/';
import Stepper from 'components/Stepper';
import NoActive from 'components/NoActive';

import { withStore } from 'store';
import { withAuth } from 'auth';
import { withRouter } from 'react-router-dom';

import './index.scss';

class Challenges extends PureComponent {

  componentDidMount() {
    const { match, history } = this.props;

    !match.params.id && history.push(`${match.url}/1`);
  }

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
        activeHackathon: { challenges, results: allResults },
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

    const { description, name, hasCodeEditor, codeExample, _id } = currentChallenge;

    return (
      <Fragment>
        <div className="challenge__wrapper">
          <Challenge
            description={description}
            name={name}
            hasCodeEditor={hasCodeEditor}
            codeExample={codeExample}
            sendResult={this.sendResult}
            results={results}
            _id={_id}
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

    return (
      <div
        className="challenges__wrapper"
      >
        {
          hasActiveHackathon
            ? this.getChallengesContent()
            : <NoActive />
        }
      </div>
    );
  }
}

export default withRouter(withStore(withAuth(Challenges)));
