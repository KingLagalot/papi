
exports.up = function(knex) {
  return knex.schema.createTable('auth_tokens', (t) => {
    t.string('token')
      .notNull();
    t.string('refresh_token')
      .notNull();
    t.integer('user_id')
        .unsigned()
        .notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('auth_tokens');
};
