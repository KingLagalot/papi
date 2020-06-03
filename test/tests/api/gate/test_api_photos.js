
const request = require('supertest');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route('/gate/photos');

require('should');

describe('API /gate/photos', function () {
  let server;

  // Setup and teardown functions
  this.beforeEach(() => {
    server = app.listen();
  });
  afterEach(function() {
    // Need to close server else mocha will hang open
    server.close();
  });

  it('get', function(done) {
    request(server)
      .get(`${route}/1`)
      .expect(200)
      .expect('ok', done);
  });
  it('get - photo not exist', function(done) {
    request(server)
      .get(`${route}/2`)
      .expect(404, done);
  });
});
