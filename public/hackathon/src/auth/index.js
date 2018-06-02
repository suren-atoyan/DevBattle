import React, { Component } from 'react';
import Fetch from 'utils/fetch';
import { url } from 'config';

const defaultAuthState = {
  isAuth: false,
  isAdmin: false,
  isGuest: false,
  isUser: false,
  isLoading: false,
}

const AuthContext = React.createContext(defaultAuthState);

const withAuth = Component => function WrappedComponent(props) {
  return (
    <AuthContext.Consumer>
      { authState => <Component {...props} authState={authState} /> }
    </AuthContext.Consumer>
  )
};

class AuthProvider extends Component {
  state = defaultAuthState;

  async makeRequest(url, params, options) {
    this.setState({ isLoading: true });

    let result = {};

    try {
      await Fetch.post(url, params);
      result = { ...options };
    } catch(err) {
      console.log(err);
    }

    result.isLoading = false;

    this.setState({ ...defaultAuthState, ...result });
  }

  login = pass => this.makeRequest(`${url.base_url}${url.login}`, { pass }, { isAuth: true });

  logout = _ => this.makeRequest(`${url.base_url}${url.logout}`, null, { isAuth: false });

  loginAsGuest = _ => this.makeRequest(`${url.base_url}${url.login}`, { isGuest: true }, { isGuest: true });

  render() {

    const { state, login, logout, loginAsGuest } = this;

    return(
      <AuthContext.Provider value={{
        ...state,
        login,
        logout,
        loginAsGuest,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { withAuth };

export default AuthProvider;
