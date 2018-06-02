import React, { PureComponent } from 'react';
import './App.scss';

import TopBar from 'components/TopBar';
import Content from 'components/Content';

class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <TopBar />
        <Content />
      </div>
    );
  }
}

export default App;
