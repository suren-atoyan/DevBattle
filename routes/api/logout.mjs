import auth from '../../libs/auth';

export default async (req, res) => {
  const { token } = req.cookies;
  await auth.unsign(token);

  res.send({});
}
