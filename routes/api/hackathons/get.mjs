import { asyncWrapper } from '../../../libs/utils';

import { getActiveHackathon } from '../../../models/helpers';

async function getHackathon(req, res) {
  const result = {};

  result.activeHackathon = await getActiveHackathon();
  res.status(200).send(result);
}

export default asyncWrapper(getHackathon);
