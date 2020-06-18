
const request = require('supertest');
const fs = require('fs');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route('/gate/photos');
const user_factory = require('../../../factories/user.factory');
const jwt_factory = require('../../../factories/jwt.factory');
const photo_factory = require('../../../factories/photo.factory');

require('should');

describe('API /gate/photos', function () {
  var server;
  var user;
  var token;
  var photo;
  // Setup and teardown functions
  this.beforeEach(async () => {
    server = app.listen();
    user = await user_factory.default(true, {}, ['password']);
    token = jwt_factory.default(user.id);
    photo = await photo_factory.default(true, {author_id: user.id});
  });
  afterEach(function() {
    // Need to close server else mocha will hang open
    server.close();
  });

  it('get /{id}', function(done) {
    request(server)
      .get(`${route}/${photo.id}`)
      .set({'Token': token})
      .expect(200, done)
  });
  it('get / - photo not exist', function(done) {
    request(server)
      .get(`${route}/${photo.id +1}`)
      .set({'Token': token})
      .expect(404,done);
  });

  it('index /', function(done) {
    request(server)
      .get(`${route}`)
      .set({'Token': token})
      .expect(200, done)
  });
  it('update /{id}', function(done) {
    request(server)
      .put(`${route}/${photo.id}`)
      .set({'Token': token})
      .expect(200, done)
  });
  it('create /', function(done) {
    fs.closeSync(fs.openSync(`${__dirname}/test.png`, 'w'));
    request(server)
      .post(`${route}`)
      .attach('file', `${__dirname}/test.png`)
      .set({'Token': token})
      .expect(200)
      .end(function(err, res) {
        fs.unlinkSync(`${__dirname}/test.png`);
        done()
      });
  });
});
