import auth from '../../libs/auth';
import db from '../../db/';
import { asyncWrapper, handleInvalidRequest } from '../../libs/utils';

const login = async (req, res) => {
  const { name, password, isGuest } = req.body;

  let token;
  let role;

  if (isGuest) {
    role = { isGuest: true };
    token = await auth.sign(role);
  } else {
    role = await auth.getRole(name, password);

    if (role) {
      token = await auth.sign(role);
    } else {
      return handleInvalidRequest(res, 401, 'auth_fail');
    }
  }

  res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
  res.send(role);
}

export default asyncWrapper(login);
