const db = require('./db');
const helper = require('../helper');
const config = require('../config/config');

async function getMultiple() {
  const rows = await db.query(
    `SELECT id, comp_date, comp_name, comp_location
    FROM competitions_schedule`
  );
  return rows;
}

async function create(competitionsSchedule) {
  const result = await db.query(
    `INSERT INTO competitions_schedule 
    (comp_date, comp_name, comp_location) 
    VALUES 
    ('${competitionsSchedule.comp_date}', '${competitionsSchedule.comp_name}', '${competitionsSchedule.comp_location}')`
  );

  let message = 'Error in creating competition';

  if (result.affectedRows) {
    message = 'Competition created successfully';
  }

  return { message };
}

async function update(id, competitionsSchedule) {
  const result = await db.query(
    `UPDATE competitions_schedule 
    SET comp_date='${competitionsSchedule.comp_date}', comp_name='${competitionsSchedule.comp_name}', comp_location='${competitionsSchedule.comp_location}'
    WHERE id=${id}`
  );

  let message = 'Error in updating competition';

  if (result.affectedRows) {
    message = 'Competition updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM competitions_schedule WHERE id=${id}`
  );

  let message = 'Error in deleting competition';

  if (result.affectedRows) {
    message = 'Competition deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
