const faker = require('faker');
const _ = require('underscore');
const user_factory = require('./user.factory');
const db = require('../../lib/db');

const _portfolio = {
  title: faker.lorem.word(),
  description: faker.lorem.sentences(),
  author_id: null,
  public: false,
};
exports.default = async (store_in_db, fields) => {
  const ret = _.extend({}, _portfolio, fields);
  if (!fields || !fields.author_id) {
    const user = await user_factory.user(true);
    ret.author_id = user.id;
  }
  if (store_in_db) {
    const ids = await db('portfolios').insert(ret).returning('id');
    ret.id = ids[0];
  }
  return ret;
};
