import React, { Component } from 'react';
import AuthProvider from 'auth';
import './App.scss';

import TopBar from 'components/TopBar';
import Content from 'components/Content';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AuthProvider>
          <TopBar />
          <Content />
        </AuthProvider>
      </div>
    );
  }
}

export default App;
