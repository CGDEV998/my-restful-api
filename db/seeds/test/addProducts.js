
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Delete Sll existing entries
    knex('products').del()
    // Inserts seed entries
      .then(function() {
        return knex('products').insert({
          name: `Test Product 1`,
          description: `Test Description 1`,
          price: 1000
        });
      }).then(function() {
        return knex('products').insert({
          name: `Test Product 2`,
          description: `Test Description 2`,
          price: 2000
        });
      }).then(function() {
        return knex('products').insert({
          name: `Test Product 3`,
          description: `Test Description 3`,
          price: 3000
        });
      }).then(function() {
        return knex('products').insert({
          name: 'Test Product 4',
          description: 'Test Description 4',
          price: 4000
        });
      }).then(function() {
        return knex('products').insert({
          name: 'Test Product 5',
          description: 'Test Description 5',
          price: 5000
        });
      })
  );
};
