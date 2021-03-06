import auth from '../../libs/auth';
import { asyncWrapper, handleInvalidRequest } from '../../libs/utils';
import testRunner from '../../libs/test-runner';

import { getActiveBattle, updateActiveBattle } from '../../models/helpers';

import { broadcast } from '../../ws/helpers';
import config from '../../config';

import omit from 'lodash/omit';

const { action_types: { SEND_CHALLENGE_ANSWER } } = config.get('uws_server');

const sendSuccessfulResult = async (res, role) => {
  const battle = await getActiveBattle({ role });
  const currentTeamId = role.isGuest ? 'guests' : role.team._id;

  const result = battle.results[currentTeamId];

  const { confirmedSolutions } = result;

  const payload = { [currentTeamId]: result };

  const payloadForBroadcast = { [currentTeamId]: {
    ...result,
    confirmedSolutions: confirmedSolutions.map(solution => omit(solution, 'source')),
  } };

  res.status(200).send(payload);
  broadcast(SEND_CHALLENGE_ANSWER, payloadForBroadcast);
}

async function challengeAnswer(req, res) {
  const { cookies : { token }, body: { challengeId, source, teamId: rTeamId }, body } = req;
  const role = await auth.getRoleByToken(token);

  // TODO ::: Make testRunner asynchronous.

  const currentBattle = await getActiveBattle({
    withLodashWrapper: false,
    withPasswords: true,
  });

  if (!currentBattle) return handleInvalidRequest(res, 400, 'no_active');
  if (!currentBattle.started) return handleInvalidRequest(res, 400, 'challenge_not_started');

  const currnetChallenge = currentBattle
    .challenges
    .find(challenge => challenge._id === challengeId);

  if (!currnetChallenge) return handleInvalidRequest(res, 400, 'no_challenge');
  if (role.isAdmin) return handleInvalidRequest(res, 403, 'admin_challenge');

  const result = testRunner(currnetChallenge, source);

  if (result.hasOwnProperty('errorMessage')) return handleInvalidRequest(
    res, 400, result.errorMessage || 'unhandled exception'
  );

  const { guests } = currentBattle.results;

  if (rTeamId) {
    !currentBattle.results[rTeamId] && (currentBattle.results[rTeamId] = {
      confirmedSolutions: [],
      score: 0,
    });
  }

  const currentTeamResults = role.isGuest
    ? guests
    : currentBattle.results[rTeamId];

  const existingSolution = currentTeamResults
    .confirmedSolutions
    .find(solution => solution.challengeId === challengeId);

  if (existingSolution) {

    if (!currnetChallenge.points || !currnetChallenge.sourceLength) return handleInvalidRequest(res, 400, 'already_solved');
    if (result.points <= existingSolution.points) return handleInvalidRequest(res, 400, 'better_solution');

    // Update challenge points
    currentTeamResults.score += result.points - existingSolution.points;
    existingSolution.points = result.points;
    existingSolution.source = source;
    await updateActiveBattle(currentBattle);

    sendSuccessfulResult(res, role);

  } else {
    const currentSolution = { challengeId, source };

    if (result.points) {
      currentSolution.points = result.points;
      currentTeamResults.score += result.points;
    } else {
      currentTeamResults.score++;
    }

    currentTeamResults.confirmedSolutions.push(currentSolution);
    await updateActiveBattle(currentBattle);

    sendSuccessfulResult(res, role);
  }
}

export default asyncWrapper(challengeAnswer);
