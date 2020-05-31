exports.up = function(knex) {
  return knex.schema.createTable('portfolios_images', function(t) {
    t.increments('portfolio_id')
      .unsigned()
      .notNull();
    t.increments('image_id')
      .unsigned()
      .notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('portfolios_images');
};
