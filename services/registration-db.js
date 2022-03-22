const db = require('./db');
const moment = require('moment-timezone');


async function getMultiple() {
  const rows = await db.query(
    `SELECT reg_id, person_id, comp_id
    FROM registration`
  );
  return rows;
}


module.exports = {
  getMultiple,
};
