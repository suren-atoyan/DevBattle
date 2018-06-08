import figlet from 'figlet';
import fs from './promisify-fs';

const connectMessage = _ => figlet.text('connect', (err, data) => {
  err && console.error(err); // TODO ::: Create ErrorHandler
  console.log(data);
});

const asyncWrapper = cb => (req, res, next) => cb(req, res, next).catch(next);

// As fs.exists() is deprecated.  See:: https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_exists_path_callback
// This function is created to safely read file, and if file does not exist return provided default value
const readFile = async (path, format = 'json', defaultValue = {}) => {
  try {
    const content = await fs.readFile(path, 'utf8');

    return format === 'json'
      ? JSON.parse(content)
      : content;
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
    return defaultValue;
  }
};

export {
  connectMessage,
  asyncWrapper,
  readFile,
};
