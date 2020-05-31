exports.route = () => {
    const { apiVersion } = require('../../config').server;
    return `/api/${apiVersion}`;
}