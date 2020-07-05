
const request = require('supertest');
const assert = require('assert');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route('/public/photos');
const photo_factory = require('../../../factories/photo.factory');

require('should');

describe('API /public/photos', function () {
  let server;
  let photo;
  let id;

  // Setup and teardown functions
  this.beforeEach(async () => {
    server = app.listen();
    photo = await photo_factory.default(true);
    id = photo.id;
  });
  afterEach(async function() {
    // Need to close server else mocha will hang open
    server.close();
  });

  it('get /:id', function(done) {
    request(server)
      .get(`${route}/${id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        assert(response.body.id, id);
        done();
      });
  });
  it('get /:id - photo not exist', function(done) {
    request(server)
      .get(`${route}/00000000-0000-0000-0000-000000000000`)
      .expect(404, done);
  });
  it('get /:id - photo is private', function(done) {
    request(server)
      .get(`${route}/${id}`)
      .expect(404, done);
  });
});
