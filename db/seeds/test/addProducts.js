
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Delete Sll existing entries
    knex('products').del()
    // Inserts seed entries
      .then(function() {
        return knex('products').insert({
          name: `Chicken`,
          description: `British sourced whole chicken`,
          price: 1500
        });
      }).then(function() {
        return knex('products').insert({
          name: `Yoghurt`,
          description: `Organic greek style yoghurt`,
          price: 200
        });
      }).then(function() {
        return knex('products').insert({
          name: `Juice`,
          description: `Ribena squash black currant`,
          price: 150
        });
      })
  );
};
