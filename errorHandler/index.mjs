export default (err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.send({ message: 'Something went wrong!' });
}