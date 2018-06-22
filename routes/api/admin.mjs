import auth from '../../libs/auth';
import { asyncWrapper, handleInvalidRequest } from '../../libs/utils';
import { updateAdminPassword } from '../../models/helpers';

import config from '../../config';

async function _changePassword(req, res) {
  const { body } = req;

  if (!body) return handleInvalidRequest(res, 400, 'no_data');

  const { password } = body;

  if (password.length < 6) return handleInvalidRequest(res, 400, 'short_password');

  const hash = await auth.genPassword(password);

  await updateAdminPassword(hash);
  res.status(200).send({});
}

const changePassword = asyncWrapper(_changePassword);

export { changePassword };
