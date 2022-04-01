const db = require('./db');
const moment = require('moment-timezone');

async function getMultiple() {
  const rows = await db.query(
    'SELECT match_id, player1, player2, winner, loser, score_id, comp_id, match_created, match_updated FROM `match`'
  );
  return rows;
}

async function update(match) {
  let timeStamp = moment().toJSON();
  let querypart1 = 'UPDATE `match` SET ';
  let querypart2 = `player1=${match.player1}, player2=${match.player2}, winner=${match.winner}, loser=${match.loser}, score_id=${match.score_id}, match_updated="${timeStamp}" WHERE match_id=${match.match_id} AND comp_id="${match.comp_id}"`;
  console.log(querypart1 + querypart2);
  const result = await db.query(querypart1 + querypart2);

  let message = 'Error in updating competition';

  if (result.affectedRows) {
    message = 'Match updated successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  update,
};
