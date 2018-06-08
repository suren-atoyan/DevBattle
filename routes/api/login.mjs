import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';

const login = async (req, res) => {
  const { pass, isGuest } = req.body;

  let token;
  let role;

  if (isGuest) {
    token = await auth.sign();
    role = { isGuest: true };
  } else {
    role = await auth.getRole(pass);

    if (role) {
      token = await auth.sign(pass);
    } else {
      res.status(401).send({ message: 'Authentication failed.' });
      return;
    }
  }

  res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
  res.send(role);
}

export default asyncWrapper(login);
