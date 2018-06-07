import React, { PureComponent, Fragment } from 'react';

import CodeEditor from '../CodeEditor/';

import './index.scss';

export default class Challenges extends PureComponent {

  static defaultProps = {
    hasCodeEditor: true,
  }

  render() {

    const { hasCodeEditor } = this.props;

    return (
      <Fragment>
        {
          hasCodeEditor && (
            <div className="code-editor__wrapper">
              <CodeEditor />
            </div>
          )
        }
      </Fragment>
    );
  }
}
