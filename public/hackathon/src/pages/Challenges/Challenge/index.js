import React, { PureComponent } from 'react';
import CodeEditor from '../CodeEditor/';
import Info from './Info';
import Grid from '@material-ui/core/Grid';

class Challenge extends PureComponent {

  static defaultProps = {
    hasCodeEditor: true,
    results: {
      confirmedSolutions: [],
    },
  }

  render() {

    const { hasCodeEditor, description, name, codeExample, sendResult, _id, results } = this.props;

    const solvedChallenge = results.confirmedSolutions.find(({ challengeId }) => challengeId === _id );

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
            />
          </Grid>
        }
        <Grid item xs={hasCodeEditor ? 6 : 12}>
          <Info
            title={name}
            content={description}
          />

          {
            solvedChallenge && (
              <Info
                title="Challenge solved!"
                content={solvedChallenge.source}
              />
            )
          }
        </Grid>
      </Grid>
    );
  }
}

export default Challenge;
