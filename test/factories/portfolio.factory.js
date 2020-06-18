const faker = require('faker');
const _ = require('underscore');
const user_factory = require('./user.factory');
const Portfolio = require('../../lib/models/portfolio.model');

const _portfolio = {
  title: faker.lorem.word(),
  description: faker.lorem.sentences(),
  author_id: null,
  public: false,
};
exports.default = async (store_in_db, fields) => {
  var ret = _.extend({}, _portfolio, fields);
  if (!fields || !fields.author_id) {
    const user = await user_factory.user(true);
    ret.author_id = user.id;
  }
  if (store_in_db) {
    ret = await Portfolio.create(ret);
  }else {
    ret = Portfolio.fromObject(ret);
  }
  return ret;
};
