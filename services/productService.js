'use-strict';

const express = require('express');
const { Client } = require('pg');
const router = express.Router();
var database;

if(process.env.NODE_ENV === 'test') {
  // Test environemnt database
  database = 'cayenne_test';
} else {
  //Development & production environemnt database
  database = 'cayenne';
}

exports.create = (product, cb) => {
  const response = [];
  const client = new Client({
    user: 'christopher.gordon',
    host: 'localhost',
    database: database,
    password: '',
    port: 5432,
  });

  client.connect();

  const query = {
    text: 'INSERT INTO products(name, description, price) VALUES($1, $2, $3) returning product_id',
    values: [product.name, product.description, product.price]
  };

  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb(`Failed to add product: ${product.name}`, null);
    } else {
      cb(null, 'successfully added product', res.rows[0].product_id);
    }
  });
};

exports.fetchAll = (cb) => {
  const client = new Client({
    user: 'christopher.gordon',
    host: 'localhost',
    database: database,
    password: '',
    port: 5432,
  });
  
  client.connect();

  client.query('SELECT * FROM products', (err, res) => {
    if (err) {
      console.log(err.stack);
      cb('Currently no products avaliable', null);
    } else {
      cb(null, res.rows);
    }
  });
};

exports.fetch = (searchTerm, cb) => {
  const client = new Client({
    user: 'christopher.gordon',
    host: 'localhost',
    database: database,
    password: '',
    port: 5432,
  });

  client.connect();

  var query;

  if (isNaN(searchTerm)) {
    query = {
      text: 'SELECT * FROM products WHERE name=$1',
      values: [searchTerm]
    };
  } else if (!isNaN(searchTerm)) {
    query = {
      text: 'SELECT * FROM products WHERE product_id=$1',
      values: [searchTerm]
    };
  } else {
    cb('Please provide a valid product Id or name to fetch', null);
  }

  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb('Something went wrong, please try again', null);
    } else if (res.rows.length === 0) {
      cb('Could not find that product, please ensure you entered the correct id or name', null);
    } else {
      cb(null, res.rows);
    }
  });
};

exports.update = (productId, product, cb) => {
  const client = new Client({
    connectionString: connectionString
  });

  client.connect();

  const query = {
    text: 'UPDATE products SET name=$2, description=$3, price=$4 WHERE id=$1',
    values: [productId, product.name, product.description, product.price]
  };

  client.query(query, (err) => {
    if (err) {
      console.log(err.stack);
      cb(`Failed To Update Product ${product.name}`, null);
    } else {
      cb(null, 'Product successfully updated');
    }
  });
};

exports.remove = (product, cb) => {
  const client = new Client({
    connectionString: connectionString
  });

  client.connect();

  const query = {
    text: 'DELETE FROM products WHERE id=$1',
    values: [product.id]
  };

  client.query(query, (err) => {
    if (err) {
      console.log(err.stack);
      cb(`Failed to delete product (id: ${product.id}), please make sure you're using the correct ID`, null);
    } else {
      cb(null, 'Successfully deleted product');
    }
  });
};
