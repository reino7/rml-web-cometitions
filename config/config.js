// loads the defined variables from .env
require('dotenv').config();

const config = {
  app: {
    name: 'rml-web', // application name
    port: parseInt(process.env.PORT), // port number to listen
  },
  db: {
    host: process.env.DB_HOST, // database host
    port: parseInt(process.env.DB_PORT), // default MySQL port
    user: process.env.DB_USER, // database username
    password: process.env.DB_PASSWORD, // database password
    database: process.env.DB_NAME, // database name
  },
  listPerPage: 100,
};

module.exports = config;
