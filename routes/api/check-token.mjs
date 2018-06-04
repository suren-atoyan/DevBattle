import auth from '../../libs/auth';

export default async (req, res) => {
  const { token } = req.cookies;
  const decoded = await auth.verify(token);

  res.send({
    isAdmin: !!decoded,
  });
}
