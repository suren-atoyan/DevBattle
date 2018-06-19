import React, { Component, Fragment } from 'react';
import { makeRequest } from 'utils';
import { url } from 'config';
import {
  GET_ACTIVE_HACKATHON,
  CREATE_HACKATHON,
  SEND_CHALLENGE_ANSWER,
  CREATE_TEAM,
  START_HACKATHON,
  FINISH_HACKATHON,
} from 'constants/action-types/store';
import StatusMessage from 'components/StatusMessage';

const defaultState = {
  activeHackathon: null,
  isLoading: false,
};

const AppContext = React.createContext(defaultState);

const withStore = Component => function WrappedComponent(props) {
  return (
    <AppContext.Consumer>
      {value => <Component
        {...props}
        store={value.state}
        storeActions={value.actions}
      />}
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

  async handleResponse(request, action) {
    this.setState({ isLoading: true });
    const response = await request;

    if (response && response.errorMessage) {
      this.showError(response.errorMessage);
      return false;
    }

    switch(action) {
      case GET_ACTIVE_HACKATHON:
      case CREATE_HACKATHON:
      case SEND_CHALLENGE_ANSWER:
        this.setState({ activeHackathon: response });
      break;
      case CREATE_TEAM:
        this.setState({
          activeHackathon: {
            ...this.state.activeHackathon,
            teams: [
              ...this.state.activeHackathon.teams,
              response,
            ],
          },
        });
        break;
      case START_HACKATHON:
        this.setState({
          activeHackathon: {
            ...this.state.activeHackathon,
            ...response,
          }
        });
      break;
      case FINISH_HACKATHON:
        this.setState({
          activeHackathon: {
            ...this.state.activeHackathon,
            ...response,
          }
        });
      break;
      default: break;
    }

    this.setState({
      isLoading: false,
      showStatusMessage: false,
    });
  }

  showError(message) {
    this.setState({
      isLoading: false,
      showStatusMessage: true,
      statusMessage: { errorMessage: message },
    });
  }

  getActiveHackathon = async _ => this.handleResponse(
    makeRequest(`${url.base_url}${url.hackathons}`, 'GET'),
    GET_ACTIVE_HACKATHON,
  );

  createHackathon = async data => this.handleResponse(
    makeRequest(`${url.base_url}${url.hackathons}`, 'POST', data),
    CREATE_HACKATHON,
  );

  createTeam = async data => this.handleResponse(
    makeRequest(`${url.base_url}${url.create_team}`, 'POST', data),
    CREATE_TEAM,
  );

  startHackathon = async _ => this.handleResponse(
    makeRequest(`${url.base_url}${url.start_hackathon}`, 'POST'),
    START_HACKATHON,
  );

  finishHackathon = async _ => {
    if (!this.state.activeHackathon.started) {
      this.showError('Bro You can\'t finish something that hasn\'t been started!');
      return false;
    }

    this.handleResponse(
      makeRequest(`${url.base_url}${url.finish_hackathon}`, 'POST'),
      FINISH_HACKATHON,
    );
  };

  sendChallengeAnswer = async data => {

    if (this.state.activeHackathon.finished) {
      this.showError('Hackathon already has finished!');
      return false;
    }

    this.handleResponse(
      makeRequest(`${url.base_url}${url.challenge_answer}`, 'POST', data),
      SEND_CHALLENGE_ANSWER,
    );
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
      startHackathon,
      finishHackathon,
    } = this;

    return(
      <Fragment>
        {showStatusMessage && <StatusMessage
          statusData={statusMessage}
          handleClose={handleStatusMessageClose}
        />}
        <AppContext.Provider value={{
          state,
          actions: {
            getActiveHackathon,
            createHackathon,
            sendChallengeAnswer,
            createTeam,
            startHackathon,
            finishHackathon,
          },
        }}>
          {this.props.children}
        </AppContext.Provider>
      </Fragment>
    );
  }
}

export { withStore };

export default AppStateProvider;
