import { promisify } from 'util';
import fs from 'fs';

const promisifiedFs = Object.keys(fs).reduce(
  (acc, key) =>
    ((!key.includes('Sync') && typeof fs[key] === 'function') && (acc[key] = promisify(fs[key])), acc),
  {}
);

export default promisifiedFs;
