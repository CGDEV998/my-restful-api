exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('customers', function(table) {
      table.increments('customer_id').primary();
      table.string('first_name').notNull();
      table.string('last_name').notNull();
      table.string('email').unique().notNull();
    }).then(function() {
      return knex.raw(`alter table public.customers
      add column created_at timestamp with time zone not null default now()`);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
