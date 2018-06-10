import { asyncWrapper } from '../../libs/utils';

import hackathon from '../../db/models/hackathon';
import db from '../../db';
import auth from '../../libs/auth';

async function _createHackathon(req, res) {
  const { cookies : { token }, body } = req;
  const role = await auth.getRoleByToken(token);

  if (role && role.isAdmin) {
    if (body) {
      const currentHackathon = hackathon.create(body);

      if (currentHackathon._error) {
        res.status(422).send({ errorMessage: currentHackathon._error });
      } else {
        await db.addNewHackathon(currentHackathon);
        await db.updateActiveHackathonId(currentHackathon._id);
        res.status(200).send(currentHackathon);
      }

    } else {
      res.status(422).send({ errorMessage: 'Data is not passed' });
    }

  } else {
    res.status(401).send({ errorMessage: 'Authentication failed.' });
  }
}

async function _getHackathon(req, res) {
  const result = {};

  try {
    result.activeHackathon = await db.getActiveHackathon();
    res.status(200).send(result);
  } catch(err) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
}

const createHackathon = asyncWrapper(_createHackathon);
const getHackathon = asyncWrapper(_getHackathon);
export { createHackathon, getHackathon };
