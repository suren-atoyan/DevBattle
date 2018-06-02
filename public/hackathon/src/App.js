import React, { Component } from 'react';
import './App.scss';

import TopBar from 'components/TopBar';
import Content from 'components/Content';

class App extends Component {
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
