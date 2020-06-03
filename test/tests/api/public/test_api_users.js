
const request = require('supertest');
const assert = require('assert');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route('/public/users');
const user_factory = require('../../../factories/user.factory');
const User = require('../../../../lib/models/user.model');

require('should');

describe('API /public/users', function() {
  let server;
  let user;

  beforeEach(async function() {
    server = app.listen();
    user = await user_factory.user(true);
  });
  afterEach(async function() {
    server.close();
  });


  // Gets user by id
  it('get /:id', function(done) {
    request(server)
      .get(`${route}/${user.id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        assert(response.body.id, user.id);
        assert(!response.body.password);
        done();
      });
  });
  // Gets user by id
  it('get /:id', function(done) {
    request(server)
      .get(`${route}/${user.id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        assert(response.body.id, user.id);
        assert(!response.body.password);
        done();
      });
  });

  // Gets user that doesn't exist
  it('get /:id - wrong id', function(done) {
    request(server)
      .get(`${route}/${user.id + 1}`)
      .expect(404, done);
  });

  // Gets public images of user
  it('index /:id/photos', function(done) {
    request(server)
      .get(`${route}/${user.id}/photos`)
      .expect(200, done);
  });

  // Gets public portfolios of user
  it('index /:id/portfolios', function(done) {
    request(server)
      .get(`${route}/${user.id}/portfolios`)
      .expect(200, done);
  });
});
