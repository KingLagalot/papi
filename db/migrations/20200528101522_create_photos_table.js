exports.up = function (knex) {
  return knex.schema.createTable('photos', (t) => {
    t.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.dateTime('created_at').nullable();
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('title').notNull();
    t.text('description').nullable();
    t.string('copyright').nullable();
    t.uuid('author_id')
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
