import schedule from 'node-schedule';

const delayExecution = (startTime, delay, callback) => {
  const time = startTime + delay;
  schedule.scheduleJob(time, callback);
};

export { delayExecution };
