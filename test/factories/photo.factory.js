const faker = require('faker');
const _ = require('underscore');
const user_factory = require('./user.factory');
const Photo = require('../../lib/models/photo.model');

const _photo = {
  title: faker.lorem.word(),
  description: faker.lorem.sentences(),
  copyright: faker.date.past().getFullYear(),
  author_id: null,
  focal_length: faker.random.number(300),
  iso: faker.random.arrayElement([50, 100, 200, 300, 400, 500, 600]),
  lens: faker.random.word(),
  public: false,
};
exports.default = async (store_in_db, fields) => {
  var ret = _.extend({}, _photo, fields);
  if (!fields || !fields.author_id) {
    const user = await user_factory.user(true);
    ret.author_id = user.id;
  }
  if (store_in_db) {
    ret = Photo.create(ret);
  }else {
    ret = Photo.fromObject(ret);
  }
  return ret;
};
