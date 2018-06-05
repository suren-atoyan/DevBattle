import auth from '../../libs/auth';

import Hackathon from '../../db/models/hackathon';
import hackathons from '../../db/collections/hackathons';
import db from '../../db';

export default async (req, res) => {
  const { cookies : { token }, body: { body } } = req;

  const role = await auth.getRoleByToken(token);

  if (role && role.isAdmin) {

    if (Hackathon.__isValid(body)) {
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
