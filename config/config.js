// loads the defined variables from .env
require('dotenv').config();

const config = {
  app: {
    name: 'rml-web', // application name
    port: parseInt(process.env.PORT), // port number to listen
  },
  db: {
    host: '', // database host
    port: '3306', // default MySQL port
    username: '', // database username
    password: '', // database password
    name: '', // database name
  },
};

module.exports = config;
