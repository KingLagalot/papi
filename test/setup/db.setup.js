/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable no-undef */
/* eslint-disable mocha/no-top-level-hooks */
/* eslint-disable mocha/no-mocha-arrows */
const knex = require('../../lib/db');
/**
 * Sets up test database, runs asll migrations up.
 */
before(done => {
  knex()
    .migrate.latest()
    .then(() => done());
});
/**
 * Shuts down test database, runs all migrations down.
 */
after(done => {
  knex()
    .migrate.rollback()
    .then(() => done());
});
