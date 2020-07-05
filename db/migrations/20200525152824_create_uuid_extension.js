
const ON_UPDATE_UUID_EXTENSION = `
    CREATE EXTENSION pgcrypto;
    `;

const DROP_ON_UPDATE_UUID_EXTENSION = 'DROP EXTENSION pgcrypto';

exports.up = (knex) => knex.raw(ON_UPDATE_UUID_EXTENSION);
exports.down = (knex) => knex.raw(DROP_ON_UPDATE_UUID_EXTENSION);
