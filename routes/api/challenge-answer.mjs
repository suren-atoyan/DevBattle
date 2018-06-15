import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';
import testRunner from '../../libs/test';

import { getActiveHackathon } from '../../models/helpers';

async function _challengeAnswer(req, res) {
  const { cookies : { token }, body: { challengeId, source } } = req;
  const role = await auth.getRoleByToken(token);

  if (role) {

    // TODO ::: Make testRunner function execution asynchronous.

    const currentHackathon = await getActiveHackathon();

    const currnetChallenge = currentHackathon.challenges.find(challenge => challenge._id === challengeId);

    if (currnetChallenge) {
      const result = testRunner(currnetChallenge.requirements, source);

      if (!role.isAdmin && (role.isGuest || role.isTeamMember)) {
        // TODO ::: Write logic for saving result in proper part of data base
      }

      res.status(200).send({ success: result }); // true/false will be calculated from line 8
    } else {
      res.status(422).send({ errorMessage: 'There is no challenge mentioned by you!' });
    }
  } else {
    res.status(401).send({ errorMessage: 'Authentication failed.' });
  }
}

const challengeAnswer = asyncWrapper(_challengeAnswer);

export default challengeAnswer;
