import { asyncWrapper } from '../../libs/utils';

import team from '../../models/team';
import auth from '../../libs/auth';
import { createNewTeam } from '../../models/helpers';

async function _createTeam(req, res) {
  const { body } = req;

  if (body) {
    const currentTeam = team.create(body);

    if (currentTeam._error) {
      res.status(422).send({ errorMessage: currentTeam._error });
    } else {
      currentTeam.password = await auth.genPassword(currentTeam.password);
      const result = await createNewTeam(currentTeam);
      
      if (result.success) {
        res.status(200).send(result.team);
      } else {
        res.status(422).send({ errorMessage: result.errorMessage });
      }
    }
  } else {
    res.status(422).send({ errorMessage: 'Invalid Data' });
  }
}

const createTeam = asyncWrapper(_createTeam);
export { createTeam };
