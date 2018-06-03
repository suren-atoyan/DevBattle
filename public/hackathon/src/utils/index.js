import { existingRoutes } from 'config';

const getRouteTitle = location => {
  return location === '/' ? existingRoutes.default : location.split('/')[1].toUpperCase();
}

const omit = (obj, exclude) =>
  Object.keys(obj).reduce((acc, item) =>
    // eslint-disable-next-line
    (!exclude.includes(item) && (acc[item] = obj[item]), acc), {});

export { getRouteTitle, omit };
