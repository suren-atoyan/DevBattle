import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';
import db from '../../db';

import testRunner from '../../libs/test';

async function _challengeAnswer(req, res) {
  const { cookies : { token }, body: { challengeId, source, teamId: rTeamId }, body } = req;
  const role = await auth.getRoleByToken(token);

  if (role) {

    // TODO ::: Make testRunner function execution asynchronous.

    const currentHackathon = await db.getActiveHackathon();

    const currnetChallenge = currentHackathon.challenges.find(challenge => challenge._id === challengeId);

    if (currnetChallenge) {
      const result = testRunner(currnetChallenge, source);

      if (!role.isAdmin && (role.isGuest || role.isTeamMember)) {
        if (result.errorMessage) {
          res.status(422).send({ errorMessage: result.errorMessage });
        } else {
          if (role.isGuest && currentHackathon.results.guests) {
            const { guests } = currentHackathon.results;
            const existingSolution = guests.confirmedSolutions.some(solution => solution.challengeId === challengeId);
            if (existingSolution) {
              res.status(422).send({ errorMessage: 'This challenge have already solved by your team' });
            } else {
              guests.confirmedSolutions.push({ challengeId, source });
              guests.score++;
              await db.updateActiveHackathon(currentHackathon);
              res.status(200).send(currentHackathon);
            }
          } else {

            !currentHackathon.results[rTeamId] && (currentHackathon.results[rTeamId] = {
              confirmedSolutions: [],
            });

            const currentTeamResults = currentHackathon.results[rTeamId];

            const existingSolution = currentTeamResults.confirmedSolutions.some(solution => solution.challengeId === challengeId);
            currentTeamResults.confirmedSolutions.push({ challengeId, source });
            await db.updateActiveHackathon(currentHackathon);
            res.status(200).send(currentHackathon);
          }

          res.status(200).send({ success: true }); // true/false will be calculated from line 8
        }
      } else {
        if (role.isAdmin) {
          res.status(401).send({ errorMessage: 'Admin can\'t solve challenges' });
        } else {
          res.status(401).send({ errorMessage: 'Authentication failed.' });
        }
      }

    } else {
      res.status(422).send({ errorMessage: 'There is no challenge mentioned by you!' });
    }
  } else {
    res.status(401).send({ errorMessage: 'Authentication failed.' });
  }
}

const challengeAnswer = asyncWrapper(_challengeAnswer);

export default challengeAnswer;
