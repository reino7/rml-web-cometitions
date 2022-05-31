// loads the defined variables from .env
require('dotenv').config();

const config = {
  app: {
    name: 'rml-web', // application name
    // port: parseInt(process.env.PORT), // port number to listen
    port: 3001, // port number to listen
  },
  db: {
    host: 'd72605.mysql.zonevs.eu', // database host
    port: 3306, // default MySQL port
    user: 'd72605_rmlwebtes', // database username
    password: 'l&MWm8&!A06ET1Fb1cNwv', // database password
    database: 'd72605_rmlwebtest', // database name
    multipleStatements: true,
  },
  listPerPage: 100,
};

module.exports = config;
