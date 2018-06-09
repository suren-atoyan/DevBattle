import React, { PureComponent } from 'react';
import CodeEditor from '../CodeEditor/';
import Description from './Description';
import Grid from '@material-ui/core/Grid';

class Challenge extends PureComponent {

  static defaultProps = {
    hasCodeEditor: true,
  }

  render() {

    const { hasCodeEditor, description, name, codeExample, sendResult, _id } = this.props;

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
          <Description
            name={name}
            description={description}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Challenge;
