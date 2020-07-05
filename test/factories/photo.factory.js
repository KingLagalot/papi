const faker = require('faker');
const _ = require('underscore');
const user_factory = require('./user.factory');
var Jimp = require('jimp');
const Photo = require('../../lib/models/photo.model');

const _photo = {
  title: faker.lorem.word(),
  description: faker.lorem.sentences(),
  author_id: null,
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
  } else {
    ret = Photo.fromObject(ret);
  }
  return ret;
};

exports.createImageFile = async dir => {
  return await Jimp.read({
    url: 'https://picsum.photos/2048/2048',
  })
    .then(image => {
      var temp = image.write(`${dir}/test.jpg`, (err, val) => {
        return val;
      });
      return temp;
    })
    .catch(err => {
      console.error(err);
    });
};
