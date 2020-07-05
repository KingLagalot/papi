exports.up = function (knex) {
  return knex.schema.createTable('portfolios_images', (t) => {
    t.uuid('portfolio_id')
      .notNull();
    t.uuid('photo_id')
      .notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('portfolios_images');
};
