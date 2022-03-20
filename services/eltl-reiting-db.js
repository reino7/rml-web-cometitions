const db = require('./db');
const helper = require('../helper');
const config = require('../config/config');
const moment = require('moment-timezone');

async function getMultiple() {
  const rows = await db.query(
    `SELECT no, person_id, fam_name, first_name, birthdate, sex, foreigner, clb_name, rate_date, rate_order, ratepl_pnts, rate_points, rate_weight, updated, created, value_created
    FROM eltl_reiting ORDER BY rate_order desc, rate_points DESC`
  );
  return rows;
}

module.exports = {
  getMultiple,
};
