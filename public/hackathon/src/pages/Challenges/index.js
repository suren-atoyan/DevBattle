import React, { PureComponent, Fragment } from 'react';
import Challenge from './Challenge/';
import Stepper from 'components/Stepper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import { withStore } from 'store';
import { withRouter } from 'react-router-dom';

import './index.scss';

class Challenges extends PureComponent {

  componentDidMount() {
    const { match, history } = this.props;

    !match.params.id && history.push(`${match.url}/1`);
  }

  getChallengesContent() {

    const { match: { params }, store: { activeHackathon : { challenges } } } = this.props;

    if (!params.id) {
      return null;
    }

    const { description, name, hasCodeEditor } = challenges[params.id - 1];

    return (
      <Fragment>
        <div className="challenge__wrapper">
          <Challenge
            description={description}
            name={name}
            hasCodeEditor={hasCodeEditor}
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
        className={classNames('challenges__wrapper', {
          centered: !hasActiveHackathon,
        })}
      >
        {
          hasActiveHackathon
            ? this.getChallengesContent()
            : (
                <Typography variant="display3" align="center" className="challenges__noch">
                  There is no active hackathons
                </Typography>
              )
        }
      </div>
    );
  }
}

export default withRouter(withStore(Challenges));
