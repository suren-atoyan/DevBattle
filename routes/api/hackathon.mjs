import { asyncWrapper } from '../../libs/utils';

import Hackathon from '../../db/models/hackathon';
import hackathons from '../../db/collections/hackathons';
import db from '../../db';
import auth from '../../libs/auth';

async function _createHackathon(req, res) {
  const { cookies : { token }, body } = req;
  const role = await auth.getRoleByToken(token);

  if (role && role.isAdmin) {
    if (body && Hackathon.__isValid(body)) {
      const currentHackathon = new Hackathon(body);
      await hackathons.push(currentHackathon);
      await db.updateActiveHackathonId(currentHackathon._id);
      res.status(200).send(currentHackathon);
    } else {
      res.status(422).send({});
    }

  } else {
    res.status(401).send({ message: 'Authentication failed.' });
  }
}

async function _getHackathon(req, res) {
  res.status(200).send({
    activeHackathon: await db.getActiveHackathon(),
  });
}

const createHackathon = asyncWrapper(_createHackathon);
const getHackathon = asyncWrapper(_getHackathon);
export { createHackathon, getHackathon };
