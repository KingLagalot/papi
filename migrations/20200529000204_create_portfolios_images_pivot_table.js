exports.up = function(knex) {
  return knex.schema.createTable('portfolios_images', function(t) {
    t.integer('portfolio_id')
      .unsigned()
      .notNull();
    t.integer('image_id')
      .unsigned()
      .notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('portfolios_images');
};
