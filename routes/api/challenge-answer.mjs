import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';
import testRunner from '../../libs/test';

import { getActiveHackathon, updateActiveHackathon } from '../../models/helpers';

async function _challengeAnswer(req, res) {
  const { cookies : { token }, body: { challengeId, source, teamId: rTeamId }, body } = req;
  const role = await auth.getRoleByToken(token);

  if (role) {

    // TODO ::: Make testRunner function execution asynchronous.

    const currentHackathon = await getActiveHackathon(false, true);

    const currnetChallenge = currentHackathon.challenges.find(challenge => challenge._id === challengeId);

    if (currnetChallenge) {
      const result = testRunner(currnetChallenge, source);

      if (!role.isAdmin && (role.isGuest || role.isTeamMember)) {
        if (result.errorMessage) {
          res.status(422).send({ errorMessage: result.errorMessage });
        } else {
          const { guests } = currentHackathon.results;

          if (rTeamId) {
            !currentHackathon.results[rTeamId] && (currentHackathon.results[rTeamId] = {
              confirmedSolutions: [],
              score: 0,
            });
          }

          const currentTeam = role.isGuest
            ? guests
            : currentHackathon.results[rTeamId];

          const existingSolution = currentTeam.confirmedSolutions.find(solution => solution.challengeId === challengeId);

          if (existingSolution) {
            if (currnetChallenge.points) {
              if (result.points > existingSolution.points) {
                // Update challenge points
                currentTeam.score += result.points - existingSolution.points;
                existingSolution.points = result.points;
                existingSolution.source = source;
                await updateActiveHackathon(currentHackathon);
                const currentHackathonWithoutPasswords = await getActiveHackathon();
                res.status(200).send(currentHackathonWithoutPasswords);
              } else {
                res.status(422).send({ errorMessage: 'The previus version of your team is better' })
              }
            } else {
              res.status(422).send({ errorMessage: 'This challenge have already solved by your team' });
            }
          } else {
            const currentSolution = { challengeId, source };

            if (result.points) {
              currentSolution.points = result.points;
              currentTeam.score += result.points;
            } else {
              currentTeam.score++;
            }

            currentTeam.confirmedSolutions.push(currentSolution);
            await updateActiveHackathon(currentHackathon);
            const currentHackathonWithoutPasswords = await getActiveHackathon();
            res.status(200).send(currentHackathonWithoutPasswords);
          }
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
