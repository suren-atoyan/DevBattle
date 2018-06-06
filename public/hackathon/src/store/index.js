import React, { Component, Fragment } from 'react';
import { makeRequest } from 'utils';
import { url } from 'config';
import StatusMessage from 'components/StatusMessage';

const defaultState = {
  active_hackathon: {},
  isLoading: false,
}

const AppContext = React.createContext(defaultState);

const withStore = Component => function WrappedComponent(props) {
  return (
    <AppContext.Consumer>
      { state => <Component {...props} store={state} /> }
    </AppContext.Consumer>
  )
};

class AppStateProvider extends Component {
  state = {
    ...defaultState,
    showStatusMessage: false,
  };

  componentDidMount() {
    this.getActiveHackathon();
  }

  async makeRequest(url, method, data) {
    const response = await makeRequest(url, method, data, defaultState);
    this.setState({ activeHackathon: response });
  }

  getActiveHackathon = _ =>
    this.makeRequest(`${url.base_url}${url.hackathons}`, 'GET');

  createHackathon = data =>
    this.makeRequest(`${url.base_url}${url.hackathons}`, 'POST', data);

  handleStatusMessageClose = _ => this.setState({ showStatusMessage: false });

  render() {

    const {
      state: { showStatusMessage, statusMessage },
      state,
      getActiveHackathon,
      createHackathon,
      handleStatusMessageClose,
    } = this;

    return(
      <Fragment>
        {showStatusMessage && <StatusMessage
          statusData={statusMessage}
          handleClose={handleStatusMessageClose}
        />}
        <AppContext.Provider value={{
          ...state,
          getActiveHackathon,
          createHackathon,
        }}>
          {this.props.children}
        </AppContext.Provider>
      </Fragment>
    );
  }
}

export { withStore };

export default AppStateProvider;
