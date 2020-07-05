exports.up = function (knex) {
  return knex.schema.createTable('photos', (t) => {
    t.increments('id')
      .unsigned()
      .primary();
    t.dateTime('created_at').nullable();
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('title').notNull();
    t.text('description').nullable();
    t.string('copyright').nullable();
    t.integer('author_id')
      .unsigned()
      .notNull();
    t.integer('focal_length').nullable();
    t.integer('iso').nullable();
    t.string('lens').nullable();
    t.boolean('processing')
      .defaultTo(true);
    t.boolean('public')
      .defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('photos');
};
