import React, { Component } from 'react';
import AuthProvider from 'auth';
import AppStateProvider from 'store';
import { JssProvider } from '_jss';
import { Header, Main } from 'sections';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <JssProvider>
          <AuthProvider>
            <AppStateProvider>
              <Header />
              <Main />
            </AppStateProvider>
          </AuthProvider>
        </JssProvider>
      </div>
    );
  }
}

export default App;
