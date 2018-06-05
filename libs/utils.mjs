import figlet from 'figlet';

export default _ => figlet.text('connect', (err, data) => {
  err && console.error(err); // TODO ::: Create ErrorHandler
  console.log(data);
});
