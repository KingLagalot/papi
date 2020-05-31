exports.up = function(knex) {
  return knex.schema.createTable('images', function(t) {
    t.increments('id')
      .unsigned()
      .primary();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('title').notNull();
    t.string('description').nullable();
    t.string('copyright').nullable();
    t.integer('author')
      .unsigned()
      .notNull();
    t.string('photo_url').nullable();
    t.integer('focal_length').nullable();
    t.integer('iso').nullable();
    t.string('lens').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('images');
};
