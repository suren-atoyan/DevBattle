import React, { Component, Fragment } from 'react';
import { makeRequest } from 'utils';
import { url } from 'config';
import {
  LOGIN,
  LOGIN_AS_GUEST,
  LOGOUT,
  CHECK_TOKEN,
} from 'constants/action-types/auth';
import StatusMessage from 'components/StatusMessage';

const defaultAuthState = {
  isAdmin: false,
  isGuest: false,
  isTeamMember: false,
  team: null,
  isLoading: false,
}

const AuthContext = React.createContext(defaultAuthState);

const withAuth = Component => function WrappedComponent(props) {
  return (
    <AuthContext.Consumer>
      {value => <Component
        {...props}
        authState={value.state}
        authActions={value.actions}
      />}
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

  async handleResponse(request, action) {
    this.setState({ isLoading: true });
    const response = await request;

    if (response && response.errorMessage) {
      this.showError(response.errorMessage);
      return false;
    }

    switch(action) {
      case LOGIN:
      case LOGIN_AS_GUEST:
      case CHECK_TOKEN:
          this.setState(response);
      break;
      case LOGOUT:
        this.setState(defaultAuthState);
      break;
      default: break;
    }
    this.setState({
      isLoading: false,
      showStatusMessage: false,
    });
  }

  login = data => this.handleResponse(
    makeRequest(`${url.base_url}${url.login}`, 'POST', data),
    LOGIN,
  );

  logout = _ => this.handleResponse(
    makeRequest(`${url.base_url}${url.logout}`, 'POST', {}),
    LOGOUT,
  );

  loginAsGuest = _ => this.handleResponse(
    makeRequest(`${url.base_url}${url.login}`, 'POST', { isGuest: true }),
    LOGIN_AS_GUEST,
  );

  checkToken = _ => this.handleResponse(
    makeRequest(`${url.base_url}${url.check_tocken}`, 'GET'),
    CHECK_TOKEN,
  );

  showError(message) {
    this.setState({
      isLoading: false,
      showStatusMessage: true,
      statusMessage: { errorMessage: message },
    });
  }

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
          state,
          actions: {
            login,
            logout,
            loginAsGuest,
          },
        }}>
          {this.props.children}
        </AuthContext.Provider>
      </Fragment>
    );
  }
}

export { withAuth };

export default AuthProvider;
