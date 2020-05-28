exports.up = function(knex) {
  return knex.schema.createTable('users', function(t) {
    t.increments('id')
      .unsigned()
      .primary();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('display_name').nullable();
    t.string('first_name').notNull();
    t.string('last_name').notNull();
    t.string('photo_url').nullable();

    t.string('email').notNull();
    t.string('password').nullable();

    t.string('provider').nullable();
    t.string('provider_id').nullable();

    t.enu('account_type', ['admin', 'photographer', 'client']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
