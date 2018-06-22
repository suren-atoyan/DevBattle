import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Grid from '@material-ui/core/Grid';

// Components
import CodeEditor from '../CodeEditor/';
import Info from './Info';

class Challenge extends PureComponent {

  static defaultProps = {
    hasCodeEditor: true,
    results: {
      confirmedSolutions: [],
    },
  }

  render() {

    const {
      results,
      started,
      finished,
      sendResult,
      challenge: {
        hasCodeEditor,
        description,
        name,
        codeExample,
        _id,
      },
      challenge,
    } = this.props;

    const solvedChallenge = results.confirmedSolutions.find(({ challengeId }) => challengeId === _id );

    const solvedChallengeContent = solvedChallenge && `
      ${solvedChallenge.source || 'Solution is not available for guests'}
      ${solvedChallenge.points
        ? `(Points - ${solvedChallenge.points})`
        : ''}
    `;

    return (
      <Grid
        container
        spacing={24}
        alignItems={hasCodeEditor ? 'stretch' : 'center'}
      >
        {
          hasCodeEditor && <Grid item xs={6}>
            <CodeEditor
              _id={_id}
              sendResult={sendResult}
              value={codeExample}
              hackathon={{ started, finished }}
            />
          </Grid>
        }
        <Grid item xs={hasCodeEditor ? 6 : 12}>
          <Info
            title={name}
            content={description}
          />
          <Info
            title="Requirements"
            requirements
            challenge={challenge}
          />
          {
            solvedChallenge && (
              <Info
                titleColor="#00BCD4"
                title="Challenge solved!"
                content={solvedChallengeContent}
              />
            )
          }
        </Grid>
      </Grid>
    );
  }
}

Challenge.propTypes = {
  sendResult: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired,
  started: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  challenge: PropTypes.object.isRequired,
}

export default Challenge;
