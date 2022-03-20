const db = require('./db');
const moment = require('moment-timezone');


async function getMultiple() {
  const rows = await db.query(
    `SELECT comp_id, comp_date, comp_time, comp_name, comp_location, comp_umpire, comp_umpire_contact, comp_organizer, comp_organizer_contact, comp_created, comp_updated
    FROM competition`
  );
  return rows;
}

async function create(competition) {
  let timeStamp = moment().toJSON();
  const result = await db.query(
    `INSERT INTO competition 
    (comp_id, comp_date, comp_time, comp_name, comp_location, comp_umpire, comp_umpire_contact, comp_organizer, comp_organizer_contact, comp_created) 
    VALUES 
    ('${competition.compId}',
      '${competition.compDate}',
      '${competition.compTime}',
      '${competition.compName}',
      '${competition.compLocation}',
      '${competition.compUmpire}',
      '${competition.compUmpireContact}',
      '${competition.compOranizer}',
      '${competition.compOranizerContact}',
      '${timeStamp}')`
  );

  let message = 'Error in creating competition';

  if (result.affectedRows) {
    message = 'Competition created successfully';
  }

  return { message };
}



module.exports = {
  getMultiple,
  create
};
