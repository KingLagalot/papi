'use strict';

const request = require('supertest');
const app = require('../server');

require('should');

describe('API - Images', function() {
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
      .attach('file', __dirname + '/test_checkFile.js')
      .attach('file1', __dirname + '/test_checkFile.js')
      .send({ type: 'js' })
      .expect(200)
      .expect('ok', done);
  });
});
