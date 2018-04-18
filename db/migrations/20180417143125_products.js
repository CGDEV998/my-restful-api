
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products',
   function(table) {
    table.increments('product_id').primary();
    table.string('name').notNull();
    table.text('description').notNull();
    table.integer('price').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
