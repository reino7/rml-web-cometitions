const db = require('./db');
const moment = require('moment-timezone');

async function getMultiple() {
  const rows = await db.query(
    `SELECT reg_id, person_id, rate_order, rate_points, fam_name, first_name, birthdate, sex, comp_id, reg_created, reg_updated
    FROM registration`
  );
  return rows;
}

async function create(registration) {
  let timeStamp = moment().toJSON();
  let queryBuild = '';
  let queryBuild2 = '';

  let queryPart1 =
    'INSERT INTO `registration` (person_id, rate_order, rate_points, fam_name, first_name, birthdate, sex, comp_id, reg_created) VALUES ';

  /* builds the MySQL values syntax based on the length on array */
  /* TODO make it a service to reuse if needed*/
  let queryPart2 = regData => {
    // console.log('Data in array ' + regData.length);
    for (let i = 0; i < regData.length; i++) {
      queryBuild += `(${regData[i].personId}, ${regData[i].rateOrder}, ${regData[i].ratePoints}, '${regData[i].famName}', '${regData[i].firstName}', '${regData[i].birthdate}', '${regData[i].sex}', '${regData[i].compId}', '${timeStamp}'), `;

      // console.log(queryBuild)
    }
    return queryBuild.slice(0, -2);
  };

  let query2Part1 =
    'INSERT INTO `match` (match_id, player1, player2, comp_id, match_created) VALUES ';
  let query2Part2 = `(101, ${registration[0].personId}, ${registration[15].personId}, '${registration[0].compId}', '${timeStamp}'), (102, ${registration[8].personId}, ${registration[7].personId}, '${registration[0].compId}', '${timeStamp}'), (103, ${registration[4].personId}, ${registration[11].personId}, '${registration[0].compId}', '${timeStamp}'), (104, ${registration[12].personId}, ${registration[3].personId}, '${registration[0].compId}', '${timeStamp}'), (105, ${registration[2].personId}, ${registration[13].personId}, '${registration[0].compId}', '${timeStamp}'), (106, ${registration[10].personId}, ${registration[5].personId}, '${registration[0].compId}', '${timeStamp}'), (107, ${registration[6].personId}, ${registration[9].personId}, '${registration[0].compId}', '${timeStamp}'), (108, ${registration[14].personId}, ${registration[1].personId}, '${registration[0].compId}', '${timeStamp}')`;

  let query = queryPart1 + queryPart2(registration);
  let query2 = query2Part1 + query2Part2;
  console.log('----- -----');
  console.log(query);
  console.log('----- -----');
  console.log(query2);
  console.log('----- -----');
  const result = await db.query(query);
  const result2 = await db.query(query2);

  let message = 'Error in creating competition';

  if (result.affectedRows) {
    message = 'Competition created successfully';
  }
  if (result2.affectedRows) {
    message = 'Match created successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
};
