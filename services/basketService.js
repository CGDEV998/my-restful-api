'use strict';
const express = require('express');
const { Client } = require('pg');
const router = express.Router();

// function getUser (username) {
//   const client = new Client({
//     // connectionString: process.env.HEROKU_POSTGRESQL_PINK_URL
//     user: 'west_o',
//     host: 'localhost',
//     database: 'western_ostrich',
//     password: 'pxxg',
//     port: 5432,
//   });

//   client.connect();

//   return client.query(`
//     SELECT * FROM users
//     WHERE username = $1`, [username]);
// };

// module.exports = {
//   getUser: getUser
// };
