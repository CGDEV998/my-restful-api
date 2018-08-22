'use-strict';

const express = require('express');
const { Client } = require('pg');
const router = express.Router();
var db;

if(process.env.NODE_ENV === 'test') {
  db = process.env.TEST_DATABASE_URL; // Test environment database
} else {
  db = process.env.DATABASE_URL; // Development & production environemnt database
}

exports.create = (customer, cb) => {
  const response = [];
  const client = new Client(db);

  client.connect();

  if(Object.keys(customer).length === 0) {
    cb({
      code: 400,
      message: 'Please provide a valid customer creation object'
    }, null);
    return;
  } else if(!customer.first_name || !customer.last_name || !customer.email) {
    cb({
      code: 400,
      message: 'You have provided an invalid customer creation object. Please use properties: first_name, last_name, email'
    }, null);
    return;
  }

  const query = {
    text: 'INSERT INTO customers first_name=$1, last_name=$2, email=$3 returning customer_id',
    values: [customer.first_name, customer.last_name, customer.email]
  };

  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb({
        code: 500,
        message: `Failed to add customer: ${customer.first_name}`
      }, null);
    } else {
      cb(null, {
        code: 201,
        createdCustomerId: res.rows[0].customer_id
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
    dbQuery = 'SELECT * FROM customers';
  } else if (params.id) {
    if(isNaN(params.id)) {
      cb({
        code: 400,
        message: 'Please provide a valid customer id'
      }, null);
      return;
    }
    dbQuery = {
      text: 'SELECT * FROM customers WHERE customer_id=$1',
      values: [params.id]
    };
  } else if(queries.email) {
    dbQuery = {
      text: 'SELECT * FROM customers WHERE email=$1',
      values: [queries.email]
    };
  } else if(queries.first_name) {
    dbQuery = {
      text: 'SELECT * FROM customers WHERE first_name=$1',
      values: [queries.first_name]
    };
  } else if(queries.last_name) {
    dbQuery = {
      text: 'SELECT * FROM customers WHERE last_name=$1',
      values: [queries.last_name]
    };
  } else {
    cb({
      code: 400,
      message: 'Invalid customer search'
    }, null);
    return;
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
        message: 'Could not find that customer, please ensure you entered the correct id or email'
      }, null);
    } else {
      cb(null, {
        code: 200,
        customers: res.rows
      });
    }
  });
};

exports.update = (customerId, customer, allCustomers, cb) => {
  const client = new Client(db);

  client.connect();
  
  if(isNaN(customerId)) { // Check ID given is a numerical
    cb({
      code: 400,
      message: 'Please provide a valid customer id to update'
    }, null);
    return;
  } else if(Object.keys(customer).length === 0) { // Check client has sent an obejct to update the database
    cb({
      code: 400,
      message: 'Please provide a valid customer update object'
    }, null);
    return;
  } else if(!customer.first_name || !customer.last_name || !customer.email) { // Check update object contains the expected properties
    cb({
      code: 400,
      message: 'You have provided an invalid customer update object. Please use properties: first_name, last_name, email'
    }, null);
    return;
  } else if (customer.email) { // Check email provided is not already being used
    for(var i = 0; i < allCustomers.customers.length; i++) {
      if(Object.values(allCustomers.customers[i]).indexOf(customer.email) > -1) {
        cb({
          code: 400,
          message: 'Email already exists'
        }, null);
        return;
      }
    }
  }

  const dbQuery = {
    text: 'UPDATE customers SET first_name=$1, last_name=$2, email=$3 WHERE customer_id=$4',
    values: [customer.first_name, customer.last_name, customer.email, customerId]
  };

  client.query(dbQuery, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb({
        code: 500,
        message: `Failed To Update Customer ${ customerId }: ${ customer }'`
      });
    } else {
      cb(null, {
        code: 200,
      });
    }
  });
};

exports.remove = (customerId, cb) => {
  const client = new Client(db);

  client.connect();

  const query = {
    text: 'DELETE FROM customers WHERE customer_id=$1',
    values: [customerId]
  };

  client.query(query, (err) => {
    if (err) {
      console.log(err.stack);
      cb({
         code: 500,
         message: `Failed to delete customer (id: ${customer.id})`
      }, null);
    } else {
      cb(null, {
        code: 410,
      });
    }
  });
};
