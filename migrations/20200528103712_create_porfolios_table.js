exports.up = function(knex) {
  return knex.schema.createTable('portfolios', function(t) {
    t.increments('id')
      .unsigned()
      .primary();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('title').notNull();
    t.string('description').nullable();

    t.integer('author')
      .unsigned()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('portfolios');
};
