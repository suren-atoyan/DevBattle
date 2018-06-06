import figlet from 'figlet';

const connectMessage = _ => figlet.text('connect', (err, data) => {
  err && console.error(err); // TODO ::: Create ErrorHandler
  console.log(data);
});

const asyncWrapper = cb => (req, res, next) => cb(req, res, next).catch(next);

export {
  connectMessage,
  asyncWrapper,
};
