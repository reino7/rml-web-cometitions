const db = require('./db');
const config = require('../config/config');
const moment = require('moment-timezone');

async function getMultiple() {
  const rows = await db.query(
    'SELECT match_id, player1, player2, winner, loser, score_id, comp_id, match_created, match_updated FROM `match`'
  );
  return rows;
}

module.exports = {
  getMultiple,
};
