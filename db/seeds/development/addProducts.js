
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
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
          name: `Ribena Juice`,
          description: `ribena squash black currant`,
          price: 150
        });
      }).then(function() {
        return knex('products').insert({
          name: `White Wine`,
          description: `Torres Vina Sol`,
          price: 600
        });
      }).then(function() {
        return knex('products').insert({
          name: `Jack Daniel's Whisky`,
          description: `Jack Daniel's Original`,
          price: 2300
        });
      }).then(function() {
        return knex('products').insert({
          name: `Semi-Skimmed Milk`,
          description: `Cravendale Purefilter Semi Skimmed Milk`,
          price: 300
        });
      }).then(function() {
        return knex('products').insert({
          name: `Felix Cat Food`,
          description: `Felix Cat Food Mixed Selection In Jelly`,
          price: 900
        });
      }).then(function() {
        return knex('products').insert({
          name: `Chopped Tomatoes`,
          description: `Napolina Chopped Tomatoes`,
          price: 200
        });
      }).then(function() {
        return knex('products').insert({
          name: `Walkers Crips`,
          description: `Walkers Ready Salted Crisps`,
          price: 200
        });
      }).then(function() {
        return knex('products').insert({
          name: `Margherita Pizza`,
          description: `Pizza Express Margherita Pizza`,
          price: 300
        });
      }).then(function() {
        return knex('products').insert({
          name: `Water`,
          description: `Highland Spring Still Water`,
          price: 250
        });
      }).then(function() {
        return knex('products').insert({
          name: `Coke`,
          description: `Coca-Cola Zero`,
          price: 400
        });
      })
  );
};
