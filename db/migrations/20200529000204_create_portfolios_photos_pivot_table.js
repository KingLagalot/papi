exports.up = function (knex) {
  return knex.schema.createTable('portfolios_images', (t) => {
    t.integer('portfolio_id')
      .unsigned()
      .notNull();
    t.integer('photo_id')
      .unsigned()
      .notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('portfolios_images');
};
