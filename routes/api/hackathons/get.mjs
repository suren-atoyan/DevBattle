import { asyncWrapper } from '../../../libs/utils';

import { getActiveHackathon } from '../../../models/helpers';

async function getHackathon(req, res) {
  const result = {};

  try {
    result.activeHackathon = await getActiveHackathon();
    res.status(200).send(result);
  } catch(err) {
    console.error(err);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
}

export default asyncWrapper(getHackathon);
