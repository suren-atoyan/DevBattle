import React, { Component } from 'react';
import AuthProvider from 'auth';
import { Header, Main } from 'sections';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AuthProvider>
          <Header />
          <Main />
        </AuthProvider>
      </div>
    );
  }
}

export default App;
