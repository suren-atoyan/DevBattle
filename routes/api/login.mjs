import auth from '../../libs/auth';

export default async (req, res) => {
  const { pass: reqPass } = req.body;

  const password = await auth.getPassword();

  if (reqPass && reqPass === password) {
    const token = await auth.sign(password);
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
    res.send({ isAdmin: true });
  } else {
    res.status(401).send({ message: 'Authentication failed.' });
  }
}
