/* eslint-disable no-sequences */
import { existingRoutes } from 'config';
import Fetch from 'utils/fetch';

const getRouteTitle = location => {
  return location === '/' ? existingRoutes.default : location.split('/')[1].toUpperCase();
}

const omit = (obj, exclude) =>
  Object.keys(obj).reduce((acc, item) =>
    (!exclude.includes(item) && (acc[item] = obj[item]), acc), {});

const pick = (obj, picks) =>
  Object.keys(obj).reduce((acc, item) =>
    (picks.includes(item) && (acc[item] = obj[item]), acc), {});

async function makeRequest(url, method, data) {

  try {
    const response = await Fetch.request(url, method, data);

    return response.success
      ? omit(response, ['success'])
      : pick(response, ['errorMessage', 'status']);
  } catch(err) {
    console.warn(err);
    return { errorMessage: err };
  }
}

const removeItem = (arr, i) => {
  const res = arr.slice(0);
  res.splice(i, 1);
  return res;
}

export { getRouteTitle, omit, makeRequest, removeItem };
