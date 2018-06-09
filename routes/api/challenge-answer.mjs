import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';

import testRunner from '../../libs/test';

async function _challengeAnswer(req, res) {
  const { cookies : { token }, body: { challengeId, source } } = req;
  const role = await auth.getRoleByToken(token);

  if (role) {

    // Just Sample

    const requirements = {
      tests: [
        {
          input: [2],
          output: 4,
        },
        {
          input: [4],
          output: 16,
        },
        {
          input: [8],
          output: 64,
        },
      ],

      name: 'test',
    };

    // find challenge by challengeId from body
    // and get challenge requirements
    // execute source and check it here

    // TODO ::: Make testRunner function execution asynchronous.

    const result = testRunner(requirements, source);

    if (!role.isAdmin && (role.isGuest || role.isTeamMember)) {
      // TODO ::: Write logic for saving result in proper part of data base
    }

    res.status(200).send({ success: result }); // true/false will be calculated from line 8
  } else {
    res.status(401).send({ errorMessage: 'Authentication failed.' });
  }
}

const challengeAnswer = asyncWrapper(_challengeAnswer);

export default challengeAnswer;
