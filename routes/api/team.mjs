import { asyncWrapper } from '../../libs/utils';

import Team from '../../db/models/team';
import db from '../../db';
import auth from '../../libs/auth';

async function _createTeam(req, res) {
  const { body } = req;

  if (body && Team.__isValid(body)) {
    const team = new Team(body);
    team.password = await auth.genPassword(team.password);
    const result = await db.createNewTeam(team);
    if (result.success) {
      res.status(200).send(result.team);
    } else {
      res.status(422).send({ errorMessage: result.errorMessage });
    }
  } else {
    res.status(422).send({ errorMessage: 'Invalid Data' });
  }
}

const createTeam = asyncWrapper(_createTeam);
export { createTeam };
