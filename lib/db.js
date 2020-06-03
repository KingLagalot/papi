const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

module.exports = (table) => {
  if (table) return require('knex')(config)(table);
  return require('knex')(config);
};
