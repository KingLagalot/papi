'use strict';

const request = require('supertest');
const app = require('../../../../server');

require('should');

describe('API - Portfolios', function() {
  var server;
  this.beforeEach(function() {
    server = app.listen();
  });
  afterEach(function() {
    server.close();
  });
  it('file sanitizers', done => {
    request(server)
      .post('/upload')
      .send({ type: 'js' })
      .expect(200)
      .expect('ok', done);
  });
});
