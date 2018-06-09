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

    this.props.store.sendChallengeAnswer(result);
  }

  getChallengesContent() {

    const { match: { params }, store: { activeHackathon : { challenges } } } = this.props;

    if (!params.id) {
      return null;
    }

    const currentChallenge = challenges[params.id - 1];

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
