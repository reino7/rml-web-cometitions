const db = require('./db');
const helper = require('../helper');
const config = require('../config/config');
const moment = require('moment-timezone');

async function getMultiple() {
  const rows = await db.query(
    `SELECT sche_id, sche_date, sche_time, sche_name, sche_location, sche_umpire, sche_umpire_contact, sche_organizer, sche_organizer_contact, sche_created, sche_updated
    FROM schedule`
  );
  return rows;
}

async function create(schedule) {
  let timeStamp = moment().toJSON();
  const result = await db.query(
    `INSERT INTO schedule 
    (sche_date, sche_time, sche_name, sche_location, sche_umpire, sche_umpire_contact, sche_organizer, sche_organizer_contact, sche_created) 
    VALUES 
    ('${schedule.scheduleDate}',
     '${schedule.scheduleTime}',
     '${schedule.scheduleName}',
     '${schedule.scheduleLocation}',
     '${schedule.scheduleUmpire}',
     '${schedule.scheduleUmpireContact}',
     '${schedule.scheduleOranizer}',
     '${schedule.scheduleOranizerContact}',
     '${timeStamp}')`
  );

  let message = 'Error in creating competition';

  if (result.affectedRows) {
    message = 'Competition created successfully';
  }

  return { message };
}

async function update(id, schedule) {
  let timeStamp = moment().toJSON();

  const result = await db.query(
    `UPDATE schedule
    SET sche_date='${schedule.scheduleDate}', sche_time='${schedule.scheduleTime}', sche_name='${schedule.scheduleName}', sche_location='${schedule.scheduleLocation}', sche_umpire='${schedule.scheduleUmpire}', sche_umpire_contact='${schedule.scheduleUmpireContact}', sche_organizer='${schedule.scheduleOranizer}', sche_organizer_contact='${schedule.scheduleOranizerContact}', sche_updated='${timeStamp}'
    WHERE sche_id=${id}`
  );

  let message = 'Error in updating competition';

  if (result.affectedRows) {
    message = 'Competition updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM schedule WHERE id=${id}`
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
