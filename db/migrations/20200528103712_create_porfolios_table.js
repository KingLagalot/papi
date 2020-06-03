exports.up = function (knex) {
  return knex.schema.createTable('portfolios', (t) => {
    t.increments('id')
      .unsigned()
      .primary();
    t.dateTime('created_at').nullable();
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('title').notNull();
    t.text('description').nullable();

    t.integer('author_id')
      .unsigned()
      .notNullable();
    t.boolean('public')
      .defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('portfolios');
};
