import React, { PureComponent } from 'react';

import monaco from 'utils/monaco-editor';

import CircularProgress from '@material-ui/core/CircularProgress';

import './index.scss';

export default class Editor extends PureComponent {

  static defaultProps = {
    width: '100%',
    height: '100%',
    value: 'console.log(\'hello world!\')',
    language: 'javascript',
    theme: 'vs-dark',
    options: {},
    editorDidMount: _ => {}
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    monaco
      .init()
      .then(monaco => (this.monaco = monaco) && this.createEditor());
  }

  componentDidUpdate({ value, language, width, height, theme }) {

    const { editor, monaco } = this;

    if (editor && monaco) {
      if (value !== this.props.value) {
        this.editor.setValue(this.props.value);
      }

      if (language !== this.props.language) {
        monaco.editor.setModelLanguage(this.editor.getModel(), this.props.language);
      }

      if (theme !== this.props.theme) {
        monaco.editor.setTheme(this.props.theme);
      }

      if (
        this.props.width !== width ||
        this.props.height !== height
      ) {
        this.editor.layout();
      }
    }
  }

  createEditor() {

    const { value, language, theme, options, editorDidMount } = this.props;

    this.editor = this.monaco.editor.create(this.monacoContainer, {
      value,
      language,
      ...options,
    });

    theme && this.monaco.editor.setTheme(theme);

    editorDidMount && editorDidMount(this.editor.getValue.bind(this.editor));

    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    this.removeEditor();
  }

  removeEditor() {
    this.editor && this.editor.dispose();
  }

  render() {

    const { width, height } = this.props;

    return (
      <section className="monaco-editor__wrapper">
        {this.state.isLoading && <div className="monaco-editor__preloader">
          <CircularProgress size={100} color="primary" className="monaco-editor__preloader--circle"/>
        </div>}
        <div
          ref={monacoContainer => (this.monacoContainer = monacoContainer)}
          style={{ width, height }}
          className="monaco-editor__content"
        />
      </section>
    );
  }
}

