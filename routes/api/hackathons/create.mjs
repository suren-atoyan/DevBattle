import { asyncWrapper } from '../../../libs/utils';

import hackathon from '../../../models/hackathon';
import auth from '../../../libs/auth';
import {
  updateActiveHackathonId,
  addNewHackathon,
} from '../../../models/helpers';

async function createHackathon(req, res) {
  const { cookies : { token }, body } = req;
  const role = await auth.getRoleByToken(token);

  if (role && role.isAdmin) {
    if (body) {
    const currentHackathon = hackathon.create(body);

    if (currentHackathon._error) {
      res.status(422).send({ errorMessage: currentHackathon._error });
    } else {
      await addNewHackathon(currentHackathon);
      await updateActiveHackathonId(currentHackathon._id);
      res.status(200).send(currentHackathon);
    }

    } else {
      res.status(422).send({ errorMessage: 'Data is not passed' });
    }

  } else {
    res.status(401).send({ errorMessage: 'Authentication failed.' });
  }
}

export default asyncWrapper(createHackathon);
