import React, { Component, Fragment } from 'react';
import { makeRequest } from 'utils';
import { url } from 'config';
import StatusMessage from 'components/StatusMessage';

const defaultAuthState = {
  isAdmin: false,
  isGuest: false,
  isTeamMember: false,
  isLoading: true,
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
    showStatusMessage: false,
    authMessage: {},
  };

  componentDidMount() {
    this.checkToken();
  }

  async makeRequest(url, method, data) {
    const response = await makeRequest(url, method, data, defaultAuthState);
    this.setState({ ...response });
  }

  login = pass => this.makeRequest(`${url.base_url}${url.login}`, 'POST', { pass });

  logout = _ => this.makeRequest(`${url.base_url}${url.logout}`, 'POST', {});

  loginAsGuest = _ => this.makeRequest(`${url.base_url}${url.login}`, 'POST', { isGuest: true });

  checkToken = _ => this.makeRequest(`${url.base_url}${url.check_tocken}`, 'GET');

  handleAuthMessageClose = _ => this.setState({ showStatusMessage: false });

  render() {

    const {
      state: { showStatusMessage, statusMessage },
      state,
      login,
      logout,
      loginAsGuest,
      handleAuthMessageClose,
    } = this;

    return(
      <Fragment>
        {showStatusMessage && <StatusMessage
          statusData={statusMessage}
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
