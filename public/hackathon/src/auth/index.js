import React, { Component, Fragment } from 'react';
import Fetch from 'utils/fetch';
import { url } from 'config';
import AuthMessage from './AuthMessage';

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
  state = {
    ...defaultAuthState,
    showAuthMessage: false,
    authMessage: {},
  };

  async makeRequest(url, params, options) {
    this.setState({ isLoading: true });

    let result = {};

    try {
      const response = await Fetch.post(url, params);

      const authMessageData = !response.success
        ? { result, ...{ showAuthMessage: true, authMessage: response } }
        : { result, ...{ showAuthMessage: false, authMessage: {} } };

      result = { ...options, ...authMessageData };

    } catch(err) {
      console.log(err);
    }

    result.isLoading = false;

    this.setState({ ...defaultAuthState, ...result });
  }

  login = pass => this.makeRequest(`${url.base_url}${url.login}`, { pass }, { isAuth: true });

  logout = _ => this.makeRequest(`${url.base_url}${url.logout}`, {}, { isAuth: false });

  loginAsGuest = _ => this.makeRequest(`${url.base_url}${url.login}`, { isGuest: true }, { isGuest: true });

  handleAuthMessageClose = _ => this.setState({ showAuthMessage: false });

  render() {

    const {
      state: { showAuthMessage, authMessage },
      state,
      login,
      logout,
      loginAsGuest,
      handleAuthMessageClose,
    } = this;

    return(
      <Fragment>
        <AuthMessage
          open={showAuthMessage}
          authData={authMessage}
          handleClose={handleAuthMessageClose}
        />
        <AuthContext.Provider value={{
          ...state,
          login,
          logout,
          loginAsGuest,
        }}>
          {this.props.children}
        </AuthContext.Provider>
      </Fragment>
    );
  }
}

export { withAuth };

export default AuthProvider;
