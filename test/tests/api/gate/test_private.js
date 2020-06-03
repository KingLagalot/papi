
const request = require('supertest');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route('/gate');

require('should');

describe('API /gate', function () {
  let server;
  this.beforeEach(() => {
    server = app.listen();
  });
  afterEach(function() {
    server.close();
  });
  it('get /', function(done) {
    request(server)
      .get(`${route}`)
      .expect(200)
      .expect('ok', done);
  });
  it('get / - unauthenticated', function(done) {
    request(server)
      .get(`${route}`)
      .expect(404)
      .expect('ok', done);
  });
});
