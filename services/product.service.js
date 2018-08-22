'use-strict';

const express = require('express');
const { Client } = require('pg');
const router = express.Router();
var db;

if(process.env.NODE_ENV === 'test') {
  // Test environemnt database
  db = process.env.TEST_DATABASE_URL;
} else {
  //Development & production environemnt database
  db = process.env.DATABASE_URL;
}

exports.create = (product, cb) => {
  const response = [];
  const client = new Client(db);

  client.connect();

  if(Object.keys(product).length === 0) {
    cb({
      code: 400,
      message: 'Please provide a valid product creation object'
    }, null);
    return;
  } else if(!product.name || !product.description || !product.price) {
    cb({
      code: 400,
      message: 'You have provided an invalid product creation object. Please use properties: name, description, price'
    }, null);
    return;
  }

  const query = {
    text: 'INSERT INTO products(name, description, price) VALUES($1, $2, $3) RETURNING product_id',
    values: [product.name, product.description, product.price]
  };

  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb({
        code: 500,
        message: `Failed to add product: ${product.name}`
      }, null);
    } else {
      cb(null, {
        code: 201,
        createdProductId: res.rows[0].product_id
      });
    }
  });
};

exports.fetch = (queries, params, cb) => {
  const client = new Client(db);
  const noQueriesOrParamsCheck = Object.keys(queries).length + Object.keys(params).length;

  client.connect();

  var dbQuery;  

  if(noQueriesOrParamsCheck === 0) {
    dbQuery = 'SELECT * FROM products';
  } else if (params.id) {
    if(isNaN(params.id)) {
      cb({
        code: 400,
        message: 'Please provide a valid product id'
      }, null);
      return;
    }
    dbQuery = {
      text: 'SELECT * FROM products WHERE product_id=$1',
      values: [params.id]
    };
  } else if(queries.name) {
    dbQuery = {
      text: 'SELECT * FROM products WHERE name=$1',
      values: [queries.name]
    };
  } else {
    cb({
      code: 400,
      message: 'Invalid product search'
    }, null);
  }

  client.query(dbQuery, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb({
        code: 500,
        message: 'Failed to query database'
      }, null);
    } else if (res.rows.length === 0) {
      cb({
        code: 404,
        message: 'Could not find that product, please ensure you entered the correct id or name'
      }, null);
    } else {
      cb(null, {
        code: 200,
        products: res.rows
      });
    }
  });
};

exports.update = (productId, product, cb) => {
  const client = new Client(db);

  client.connect();

  if(isNaN(productId)) {
    cb({
      code: 400,
      message: 'Please provide a valid product id to update'
    }, null);
    return;
  } else if(Object.keys(product).length === 0) {
    cb({
      code: 400,
      message: 'Please provide a valid product update object'
    }, null);
    return;
  } else if(!product.name || !product.description || !product.price) {
    cb({
      code: 400,
      message: 'You have provided an invalid product update object. Please use properties: name, description, price'
    }, null);
    return;
  }

  const query = {
    text: 'UPDATE products SET name=$2, description=$3, price=$4 WHERE product_id=$1',
    values: [productId, product.name, product.description, product.price]
  };

  client.query(query, (err) => {
    if (err) {
      console.log(err.stack);
      cb({
        code: 500,
        message: `Failed To Update: product name '${product.name}'`
      });
    } else {
      cb(null, {
        code: 200,
      });
    }
  });
};

exports.remove = (productId, cb) => {
  const client = new Client(db);

  client.connect();

  const query = {
    text: 'DELETE FROM products WHERE product_id=$1',
    values: [productId]
  };

  client.query(query, (err) => {
    if (err) {
      console.log(err.stack);
      cb({
         code: 500,
         message: `Failed to delete product (id: ${product.id})`
      }, null);
    } else {
      cb(null, {
        code: 410,
      });
    }
  });
};
