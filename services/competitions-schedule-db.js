const db = require('./db');
const helper = require('../helper');
const config = require('../config/config');
const moment = require('moment-timezone');
let timeStamp = moment().format();

async function getMultiple() {
  const rows = await db.query(
    `SELECT id, comp_date, comp_time, comp_name, comp_location, comp_umpire, comp_umpire_contact, comp_organizer, comp_organizer_contact, comp_created, comp_updated
    FROM competitions_schedule`
  );
  return rows;
}

async function create(competitionsSchedule) {
  const result = await db.query(
    `INSERT INTO competitions_schedule 
    (comp_date, comp_time, comp_name, comp_location, comp_umpire, comp_umpire_contact, comp_organizer, comp_organizer_contact, comp_created) 
    VALUES 
    ('${competitionsSchedule.competitionDate}',
     '${competitionsSchedule.competitionTime}',
     '${competitionsSchedule.competitionName}',
     '${competitionsSchedule.competitionLocation}',
     '${competitionsSchedule.competitionUmpire}',
     '${competitionsSchedule.competitionUmpireContact}',
     '${competitionsSchedule.competitionOranizer}',
     '${competitionsSchedule.competitionOranizerContact}',
     '${timeStamp}')`
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
    SET comp_date='${competitionsSchedule.competitionDate}', comp_time='${competitionsSchedule.competitionTime}', comp_name='${competitionsSchedule.competitionName}', comp_location='${competitionsSchedule.competitionLocation}', comp_umpire='${competitionsSchedule.competitionUmpire}', comp_umpire_contact='${competitionsSchedule.competitionUmpireContact}', comp_organizer='${competitionsSchedule.competitionOranizer}', comp_organizer_contact='${competitionsSchedule.competitionOranizerContact}', comp_updated='${timeStamp}'
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
