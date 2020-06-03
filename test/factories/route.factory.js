/**
 * @name route
 * @param {String} String to add to path before returning.
 * @returns {String} URI path with current api version.
 */
exports.route = (path) => {
  const ret = `/api/${require('../../config').server.apiVersion}`;
  return path ? ret + path : ret;
};
