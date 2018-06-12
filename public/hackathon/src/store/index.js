import React, { Component, Fragment } from 'react';
import { makeRequest } from 'utils';
import { url } from 'config';
import StatusMessage from 'components/StatusMessage';

const defaultState = {
  activeHackathon: null,
  isLoading: false,
};

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
  };

  getActiveHackathon = async _ => {
    const response = await makeRequest(`${url.base_url}${url.hackathons}`, 'GET');
    this.setState(response);
  };

  createHackathon = async data => {
    const response = await makeRequest(`${url.base_url}${url.hackathons}`, 'POST', data);
    this.setState(response);
  };

  createTeam = async data => {
    const response = await makeRequest(`${url.base_url}${url.create_team}`, 'POST', data);
    this.setState(response);
    return response.success;
  };

  sendChallengeAnswer = async data => {
    makeRequest(`${url.base_url}${url.challenge_answer}`, 'POST', data);
    // TODO ::: Add functionality for check challenge anwser
  }

  handleStatusMessageClose = _ => this.setState({ showStatusMessage: false });

  render() {

    const {
      state: { showStatusMessage, statusMessage },
      state,
      getActiveHackathon,
      createHackathon,
      handleStatusMessageClose,
      sendChallengeAnswer,
      createTeam,
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
          sendChallengeAnswer,
          createTeam,
        }}>
          {this.props.children}
        </AppContext.Provider>
      </Fragment>
    );
  }
}

export { withStore };

export default AppStateProvider;
