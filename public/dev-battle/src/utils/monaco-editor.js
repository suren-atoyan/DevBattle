import { url } from 'config';

class Monaco {
  init() {

    // add more checks
    if (window.monaco && window.monaco.editor) {
      return new Promise((res, rej) => res(window.monaco));
    }

    document.addEventListener('monaco_init', this.handleMainScriptLoad);

    const mainScript = this.createMainScript();

    this.loadScript(url.monaco_loader)
        .then(_ => this.injectScripts(mainScript));
        .catch(this.reject);

    return new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }

  injectScripts(script) {
    document.body.appendChild(script);
  }

  loadScript(src, body) {
    return new Promise((res, rej) => {
      const script = this.createScript(src, body);

      script.onload = _ => resolve(script);
      script.onerror = _ => reject(new Error('Script load error: ' + src));

      this.injectScripts(script);
    });
  }

  handleMainScriptLoad = () => {
    document.removeEventListener('monaco_init', this.handleMainScriptLoad);
    this.resolve(window.monaco);
  }

  createScript(src, body) {
    const script = document.createElement('script');
    
    src && (script.src = src);

    body && (script.innerHTML = body);

    return script;
  }

  createMainScript() {
    const mainScript = this.createScript(null, `
      require.config({ paths: { 'vs': '/monaco-editor/vs' }});
      require(['vs/editor/editor.main'], function() {
        document.dispatchEvent(new Event('monaco_init'));
      });
    `);

    mainScript.onerror = this.reject;

    return mainScript;
  }
}

export default new Monaco();
