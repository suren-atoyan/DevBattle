import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Typography from '@material-ui/core/Typography'

// Components
import Form from './Form';
import Challenges from './Challenges';
import Details from './Details';
import Settings from './Settings';

// Utils
import { removeItem } from 'utils/';

// Decorators
import { withStore } from 'store';

import './index.scss';

class Admin extends PureComponent {

  state = {
    challenges: [],
  }

  createBattle = data => {

    const { challenges } = this.state;

    const currentBattle = {
      ...data,
      challenges,
    }

    this.props.storeActions.createBattle(currentBattle);
  }

  addChallenge = challenge => this.setState({
    challenges: [ ...this.state.challenges, challenge ],
    isOpenAddChallengeDialog: false,
  });

  deleteChallenge = inx => this.setState({ challenges: removeItem(this.state.challenges, inx) });

  render() {

    const {
      store: {
        activeBattle,
        isLoading,
      },
      storeActions: {
        startBattle,
        finishBattle,
        deleteBattle,
        deleteTeam,
      },
    } = this.props;

    return (
      <div className="admin">
        <Settings />
        {
          activeBattle
          ? (
            <Details
              battle={activeBattle}
              startBattle={startBattle}
              finishBattle={finishBattle}
              deleteBattle={deleteBattle}
              deleteTeam={deleteTeam}
              isLoading={isLoading}
            />
          )
          : (
            <Fragment>
              <Typography variant="headline" component="h2">
                Create new battle
              </Typography>
              <Form
                submit={this.createBattle}
                canSubmit={!!this.state.challenges.length}
              />
              <Challenges
                challenges={this.state.challenges}
                addChallenge={this.addChallenge}
                deleteChallenge={this.deleteChallenge}
              />
            </Fragment>
          )
        }
      </div>
    );
  }
}

Admin.propTypes = {
  store: PropTypes.object.isRequired,
  storeActions: PropTypes.object.isRequired,
};

const DecoratedAdmin = withStore(Admin);

DecoratedAdmin.propTypes = {
  // This component doesn't expect any props from outside (until nowadays)
};

export default DecoratedAdmin;
