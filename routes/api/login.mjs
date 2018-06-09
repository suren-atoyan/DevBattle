import auth from '../../libs/auth';
import db from '../../db/';
import { asyncWrapper } from '../../libs/utils';

const login = async (req, res) => {
  const { pass, isGuest } = req.body;

  let token;
  let role;

  if (isGuest) {
    role = { isGuest: true };
    token = await auth.sign(role);
  } else {
    role = await auth.getRole(pass);

    if (role) {
      token = await auth.sign(role);
    } else {
      res.status(401).send({ message: 'Authentication failed.' });
      return;
    }
  }

  res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
  res.send(role);
}

export default asyncWrapper(login);
