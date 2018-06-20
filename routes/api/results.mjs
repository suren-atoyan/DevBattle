import { asyncWrapper } from '../../libs/utils';

import auth from '../../libs/auth';

import { getActiveHackathon } from '../../models/helpers';

const _getResults = async (req, res) => {
  const { cookies : { token } } = req;

  const role = await auth.getRoleByToken(token);

  const hackathon = await getActiveHackathon({ role });

  res.status(200).send(hackathon.results);
}

const getResults = asyncWrapper(_getResults);

export { getResults };
