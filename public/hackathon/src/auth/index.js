import React, { Component, Fragment } from 'react';
import Fetch from 'utils/fetch';
import { omit } from 'utils';
import { url } from 'config';
import AuthMessage from './AuthMessage';

const defaultAuthState = {
  isAdmin: false,
  isGuest: false,
  isTeamMember: false,
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

  componentDidMount() {
    this.makeRequest(`${url.base_url}${url.check_tocken}`, {}, {}, 'get');
  }

  async makeRequest(url, params, options = {}, method = 'post') {
    this.setState({ isLoading: true });

    let result = {};

    try {
      const response = await Fetch[method](url, params);

      const authMessageData = response.success
        ? { result, ...{ showAuthMessage: false, authMessage: {} } }
        : { result, ...{ showAuthMessage: true, authMessage: response } };

      if (!Object.keys(options).length) {
        // TODO ::: Move to pick mathod ( + implement pick method )
        options = omit(response, ['success']);
      }

      result = { ...options, ...authMessageData };

    } catch(err) {
      console.log(err);
    }

    result.isLoading = false;

    this.setState({ ...defaultAuthState, ...result });
  }

  login = pass => this.makeRequest(`${url.base_url}${url.login}`, { pass });

  logout = _ => this.makeRequest(`${url.base_url}${url.logout}`, {});

  loginAsGuest = _ => this.makeRequest(`${url.base_url}${url.login}`, { isGuest: true });

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
        {showAuthMessage && <AuthMessage
          authData={authMessage}
          handleClose={handleAuthMessageClose}
        />}
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
