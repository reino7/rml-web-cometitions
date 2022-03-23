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

  let queryPart1 = "INSERT INTO registration (person_id, rate_order, rate_points, fam_name, first_name, birthdate, sex, comp_id, reg_created) VALUES ";

  /* builds the MySQL values syntax based on the length on array */
  /* TODO make it a service to reuse if needed*/  
  let queryPart2 = (regData) => {
    console.log('Andmeid arrays ' + regData.length)
    for (let i = 0; i < regData.length; i++) {
  
      queryBuild += `(${regData[i].personId}, ${regData[i].rateOrder}, ${regData[i].ratePoints}, '${regData[i].famName}', '${regData[i].firstName}', '${regData[i].birthdate}', '${regData[i].sex}', '${regData[i].compId}', '${timeStamp}'), `
  
      // console.log(queryBuild)
    }
    return queryBuild.slice(0, -2);  
  }
  
  let query = queryPart1 + queryPart2(registration);
  console.log(query);
  const result = await db.query(query);


  let message = 'Error in creating competition';

  if (result.affectedRows) {
    message = 'Competition created successfully';
  }

  return { message };
}


module.exports = {
  getMultiple,
  create,
};
