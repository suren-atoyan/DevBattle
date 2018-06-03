/**
 * exclude-express-route middleware to exclude some url-s from express route
 * @module middleware
 * @version 1.0.1
 */

/**
 * @const exclude
 * @param {Object} exclude - excluded path
 * @param {function} middleware - middleware function
 * @returns {function} next | middleware
 */
const exclude = (exclude, middleware) => {

  return (req, res, next) => {
    if (exclude.some(item => req.path.includes(item))) {
      return next();
    }

    return middleware(req, res, next);
  }
}

export default exclude;
