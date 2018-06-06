import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';

const login = async (req, res) => {
  const { pass } = req.body;

  const role = await auth.getRole(pass);

  if (role) {
    const token = await auth.sign(pass);
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
    res.send(role);
  } else {
    res.status(401).send({ message: 'Authentication failed.' });
  }
}

export default asyncWrapper(login);
