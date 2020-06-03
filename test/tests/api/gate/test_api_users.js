
const request = require('supertest');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route('/gate/users');

require('should');

describe('API /gate/users', function () {
  let server;
  this.beforeEach(() => {
    server = app.listen();
  });
  afterEach(function() {
    server.close();
  });
  it('get', function(done) {
    request(server)
      .get(`${route}/${id}`)
      .expect(200)
      .expect('ok', done);
  });
  it('get - wrong id', function(done) {
    request(server)
      .get(`${route}/${id}`)
      .expect(404)
      .expect('ok', done);
  });
});
