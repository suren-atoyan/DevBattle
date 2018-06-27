import React, { Component } from 'react';
import AuthProvider from 'auth';
import AppStateProvider from 'store';
import { Header, Main } from 'sections';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AuthProvider>
          <AppStateProvider>
            <Header />
            <Main />
          </AppStateProvider>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
