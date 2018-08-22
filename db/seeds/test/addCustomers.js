exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('customers').del()

    // Inserts seed entries
    .then(function() {
      return knex('customers').insert({
        first_name: `Test Customer First Name 1`,
        last_name: `Test Customer Last Name 1`,
        email: 'TestCustomer1@email.com',
      });
    })
    .then(function() {
      return knex('customers').insert({
        first_name: `Test Customer First Name 2`,
        last_name: `Test Customer Last Name 2`,
        email: 'TestCustomer2@email.com',
      });
    })
    .then(function() {
      return knex('customers').insert({
        first_name: `Test Customer First Name 3`,
        last_name: `Test Customer Last Name 3`,
        email: 'TestCustomer3@email.com',
      });
    })
    .then(function() {
      return knex('customers').insert({
        first_name: `Test Customer First Name 4`,
        last_name: `Test Customer Last Name 4`,
        email: 'TestCustomer4@email.com',
      });
    })
    .then(function() {
      return knex('customers').insert({
        first_name: `Test Customer First Name 5`,
        last_name: `Test Customer Last Name 5`,
        email: 'TestCustomer5@email.com',
      });
    })
  );
};
