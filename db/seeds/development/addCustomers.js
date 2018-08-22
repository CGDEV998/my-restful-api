
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('customers').del()

    // Inserts seed entries
    .then(function() {
      return knex('customers').insert({
        first_name: `Jimmy`,
        last_name: `Neutron`,
        email: 'JimmyNeutron@email.com',
      });
    })
    .then(function() {
      return knex('customers').insert({
        first_name: `David`,
        last_name: `Vague`,
        email: 'DavidVague@email.com',
      });
    })
    .then(function() {
      return knex('customers').insert({
        first_name: `Barry`,
        last_name: `Willis`,
        email: 'BarryWillis@email.com',
      });
    })
    .then(function() {
      return knex('customers').insert({
        first_name: `Henry`,
        last_name: `Downton`,
        email: 'HenryDownton@email.com',
      });
    })
    .then(function() {
      return knex('customers').insert({
        first_name: `Sophie`,
        last_name: `Fae`,
        email: 'SophieFae@email.com',
      });
    })
  );
};
