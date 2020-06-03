
const request = require('supertest');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route('/gate/account');

require('should');

describe('API /gate/account', function () {
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
  it('update /', function(done) {
    request(server)
      .put(`${route}`)
      .expect(404)
      .expect('ok', done);
  });
});
