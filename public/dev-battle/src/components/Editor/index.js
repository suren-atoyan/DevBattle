import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import CircularProgress from '@material-ui/core/CircularProgress';

// Utils
import monaco from 'utils/monaco-editor';

import './index.scss';

class Editor extends PureComponent {

  state = {
    isLoading: true,
  };

  componentDidMount() {
    monaco
      .init()
      .then(monaco => (this.monaco = monaco) && this.createEditor());
  }

  componentDidUpdate({ value, language, width, height, theme, line }) {

    const { editor, monaco } = this;

    if (editor && monaco) {
      if (value !== this.props.value) {
        editor.setValue(this.props.value);
        // `forceTokenization` is unofficial API
        // we have to did it for avoiding flickering of editor
        // content after .setValue
        // See more in this discussion
        // https://github.com/Microsoft/monaco-editor/issues/803
        editor.model.forceTokenization(editor.model.getLineCount());
      }

      if (language !== this.props.language) {
        monaco.editor.setModelLanguage(this.editor.getModel(), this.props.language);
      }

      if (line !== this.props.line) {
        editor.setScrollPosition({ scrollTop: line });
      }

      if (theme !== this.props.theme) {
        monaco.editor.setTheme(this.props.theme);
      }

      if (
        this.props.width !== width ||
        this.props.height !== height
      ) {
        editor.layout();
      }
    }
  }

  updateDimensions = _ => this.editor.layout();

  createEditor() {

    const { value, language, theme, options, editorDidMount } = this.props;

    this.editor = this.monaco.editor.create(this.monacoContainer, {
      value,
      language,
      ...options,
    });

    editorDidMount && editorDidMount(this.editor.getValue.bind(this.editor), this.editor);

    theme && this.monaco.editor.setTheme(theme);

    window.addEventListener('resize', this.updateDimensions);

    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    this.removeEditor();
  }

  removeEditor() {
    this.editor && this.editor.dispose();
  }

  render() {

    const { width, height } = this.props;

    return (
      <section className="monaco-editor__wrapper fb">
        {this.state.isLoading && <div className="monaco-editor__preloader">
          <CircularProgress
            size={100}
            color="primary"
            className="monaco-editor__preloader--circle"
          />
        </div>}
        <div
          ref={monacoContainer => (this.monacoContainer = monacoContainer)}
          style={{ width, height }}
          className="fb"
        />
      </section>
    );
  }
}

Editor.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  value: PropTypes.string,
  language: PropTypes.string,
  options: PropTypes.object,
  valueGetter: PropTypes.func.isRequired,
  editorDidMount: PropTypes.func.isRequired,
  theme: PropTypes.string,
};

Editor.defaultProps = {
  width: '100%',
  height: '100%',
  value: 'console.log(\'Make the world a little bit better :)\')',
  language: 'javascript',
  options: {},
  editorDidMount: _ => {}
};

export default Editor;
