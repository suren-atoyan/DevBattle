import React, { PureComponent, Fragment } from 'react';
import { makeRequest } from 'utils';
import { url, messages } from 'config';

import { withAuth } from 'auth';

import {
  GET_ACTIVE_BATTLE,
  CREATE_BATTLE,
  SEND_CHALLENGE_ANSWER,
  CREATE_TEAM,
  DELETE_TEAM,
  START_BATTLE,
  FINISH_BATTLE,
  DELETE_BATTLE,
  GET_RESULTS,
} from 'constants/action-types/store';

import ws from './ws';

import StatusMessage from 'components/StatusMessage';

const defaultState = {
  activeBattle: null,
  isLoading: false,
};

const AppContext = React.createContext(defaultState);

const withStore = Component => props => (
  <AppContext.Consumer>
    {value => <Component
      {...props}
      store={value.state}
      storeActions={value.actions}
    />}
  </AppContext.Consumer>
);

class AppStateProvider extends PureComponent {
  state = {
    ...defaultState,
    showStatusMessage: false,
  };

  componentDidMount() {
    this.getActiveBattle();
    ws.onmessage = this.handleWsBroadcast;
  };

  reduce(payload, action) {
    switch(action) {
      case GET_ACTIVE_BATTLE:
      case CREATE_BATTLE:
        this.setState({ activeBattle: payload });
      break;
      case GET_RESULTS:
      case SEND_CHALLENGE_ANSWER:
        this.setState({
          activeBattle: {
            ...this.state.activeBattle,
            ...{
              results: {
                ...this.state.activeBattle.results,
                ...payload,
              },
            },
          },
        });
      break;
      case CREATE_TEAM:

        // TODO ::: About this case there is a todo in root/ws/uws-server.js
        if (this.state.activeBattle.teams.some(({ _id }) => _id === payload._id )) return;

        this.setState({
          activeBattle: {
            ...this.state.activeBattle,
            teams: [
              ...this.state.activeBattle.teams,
              payload,
            ],
          },
        });
      break;
      case DELETE_TEAM:
        this.setState({
          activeBattle: {
            ...this.state.activeBattle,
            ...payload.changes,
          },
        });
      break;
      case START_BATTLE:
        this.setState({
          activeBattle: {
            ...this.state.activeBattle,
            ...payload,
          },
        });
      break;
      case FINISH_BATTLE:
        this.setState({
          activeBattle: {
            ...this.state.activeBattle,
            ...payload,
          },
        });
      break;
      case DELETE_BATTLE:
        this.setState({ activeBattle: null });
      break;
      default: break;
    }
  }

  async handleResponse(request, action) {
    this.setState({ isLoading: true });
    const response = await request;

    if (response && response.errorMessage) {
      this.showError(response.errorMessage);
      return false;
    }

    this.reduce(response, action);

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

  getActiveBattle = async _ => this.handleResponse(
    makeRequest(`${url.base_url}${url.battles}`, 'GET'),
    GET_ACTIVE_BATTLE,
  );

  createBattle = async data => this.handleResponse(
    makeRequest(`${url.base_url}${url.battles}`, 'POST', data),
    CREATE_BATTLE,
  );

  createTeam = async data => this.handleResponse(
    makeRequest(`${url.base_url}${url.team}`, 'POST', data),
    CREATE_TEAM,
  );

  deleteTeam = async teamId => this.handleResponse(
    makeRequest(`${url.base_url}${url.team}/${teamId}`, 'DELETE'),
    DELETE_TEAM,
  );

  startBattle = async _ => this.handleResponse(
    makeRequest(`${url.base_url}${url.start_battle}`, 'POST'),
    START_BATTLE,
  );

  updateResults = async _ => this.handleResponse(
    makeRequest(`${url.base_url}${url.get_results}`, 'GET'),
    GET_RESULTS,
  );

  finishBattle = async _ => {
    if (!this.state.activeBattle.started) {
      this.showError('Bro You can\'t finish something that hasn\'t been started!');
      return false;
    }

    this.handleResponse(
      makeRequest(`${url.base_url}${url.finish_battle}`, 'POST'),
      FINISH_BATTLE,
    );
  };

  deleteBattle = async _ => {
    this.handleResponse(
      makeRequest(`${url.base_url}${url.battles}`, 'DELETE'),
      DELETE_BATTLE,
    );
  };

  sendChallengeAnswer = async data => {

    if (this.state.activeBattle.finished) {
      this.showError('Battle already has finished!');
      return false;
    }

    this.handleResponse(
      makeRequest(`${url.base_url}${url.challenge_answer}`, 'POST', data),
      SEND_CHALLENGE_ANSWER,
    );
  }

  handleWsBroadcast = ({ data }) => {
    const { type, payload } = JSON.parse(data);

    const {
      authState: {
        isTeamMember,
        isAdmin,
        team,
      },
      authActions: {
        logout,
      },
    } = this.props;

    switch (type) {
      case SEND_CHALLENGE_ANSWER:
        const broadcasterId = Object.keys(payload)[0];

        if ((isTeamMember && broadcasterId === team._id) || isAdmin) {
          this.updateResults();
          return;
        }
      break;
      case DELETE_TEAM:
        if (isTeamMember && team._id === payload.teamId) {
          logout();
          alert(messages.deletedTeamAlert);
        };
      break;
      default: break;
    }

    this.reduce(payload, type);
  };

  handleStatusMessageClose = _ => this.setState({ showStatusMessage: false });

  render() {

    const {
      state: { showStatusMessage, statusMessage },
      state,
      getActiveBattle,
      createBattle,
      handleStatusMessageClose,
      sendChallengeAnswer,
      createTeam,
      startBattle,
      finishBattle,
      deleteBattle,
      deleteTeam,
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
            getActiveBattle,
            createBattle,
            sendChallengeAnswer,
            createTeam,
            startBattle,
            finishBattle,
            deleteBattle,
            deleteTeam,
          },
        }}>
          {this.props.children}
        </AppContext.Provider>
      </Fragment>
    );
  }
}

export { withStore };

export default withAuth(AppStateProvider);
