const faker = require('faker');
const _ = require('underscore');
const User = require('../../lib/models/user.model');

function _user() {
  return {
    display_name: faker.name.findName(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    photo_url: null,
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    provider: 'local',
    provider_id: null,
  };
}
exports.default = async (store_in_db, fields, return_fields) => {
  let ret = _.extend({}, _user(), fields);
  if (store_in_db) {
    ret = await User.create(ret, return_fields);
  }
  return ret;
};
exports.user = async (store_in_db, fields) => {
  const ret = _.extend({ account_type: 'photographer' }, fields);
  return await this.default(store_in_db, ret);
};
exports.admin = async (store_in_db, fields) => {
  const ret = _.extend({ account_type: 'admin' }, fields);
  return await this.default(store_in_db, ret);
};
