const path = require('path');
const fs = require('fs');
const download = require('download');
const moment = require('moment');
var xml2js = require('xml2js').parseString;
// var eyes = require('eyes'); // view json better in the output of the console
// let inspect = require('eyes').inspector({ maxLength: false });
const db = require('./db');
const config = require('../config/config');
const mysql = require('mysql2/promise');

async function downloadFile() {
  const eltlReitingsUrl =
    'https://www.lauatennis.ee/app_partner/app_eltlid_reitinguga_xml.php';
  console.log(
    moment().format() + ` File download started from ${eltlReitingsUrl}`
  );

  try {
    await Promise.all(
      [eltlReitingsUrl].map(eltlReitingsUrl =>
        download(eltlReitingsUrl, 'public')
      )
    );
  } catch (error) {
    console.log(error);
  }
  console.log(moment().format() + ` File saved to 'public' folder`);
  parseXML2JsonFile();
}

async function parseXML2JsonFile() {
  console.log(moment().format() + ' parseXML2JsonFile start');

  // set path to file
  const xmlFile = 'public/app_eltlid_reitinguga_xml.php';
  const xmlFileTest = 'public/test_sample_app_eltlid_reitinguga_xml.php';

  // read XML from a file
  console.log(moment().format() + ' Reading XML file');
  const xml = fs.readFileSync(xmlFile, 'utf-8');

  xml2js(xml, async function (err, result) {
    console.log(moment().format() + ' xml2js start');

    // console.dir(result);

    // save converted xml to json file
    let result2File = JSON.stringify(result, null, 2);
    fs.writeFileSync('public/app_eltlid_reitinguga.json', result2File);
    console.log(moment().format() + ' JSON data is saved to "public" folder');
  });
  console.log(moment().format() + ' xml2js and parseXML2JsonFile done');
  insert2Db();
}

async function insert2Db() {
  console.log(moment().format() + ' insert2Db start');

  // Clear eltl_reiting table
  console.log(moment().format() + ' Clear eltl_reiting table');
  let truncateQuery = 'TRUNCATE eltl_reiting';
  const truncate = await db.query(truncateQuery);
  console.log(truncate);

  // set path to file
  const jsonFile = 'public/app_eltlid_reitinguga.json';
  // read Json from file
  const json = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
  const jsonArray = json['PERSONS']['PERSON'];
  // console.log(json);
  // inspect(json);
  // console.log(JSON.parse(json));
  // console.log(json['PERSONS']['PERSON']);
  // console.log(jsonArray);
  // console.log(jsonArray.length);

  // MySQL query first part
  let queryCommand =
    'INSERT INTO eltl_reiting (person_id, fam_name, first_name, birthdate, sex, foreigner, clb_name, rate_date, rate_order, ratepl_pnts, rate_points, rate_weight, updated, created, value_created) VALUES ';
  let queryValues = '';

  // MySQL query second part
  let queryValue = () => {
    for (let i = 0; i < jsonArray.length; i++) {
      if (jsonArray[i]['RATEDATE'][0] === '') jsonArray[i]['RATEDATE'][0] = 0;
      if (jsonArray[i]['RATEORDER'][0] === '') jsonArray[i]['RATEORDER'][0] = 0;
      if (jsonArray[i]['RATEPLPNTS'][0] === '')
        jsonArray[i]['RATEPLPNTS'][0] = 0;
      if (jsonArray[i]['RATEPOINTS'][0] === '')
        jsonArray[i]['RATEPOINTS'][0] = 0;
      if (jsonArray[i]['RATEWEIGHT'][0] === '')
        jsonArray[i]['RATEWEIGHT'][0] = 0;

      queryValues += `(${jsonArray[i]['PERSONID'][0]}, "${jsonArray[i]['FAMNAME'][0]}", "${jsonArray[i]['FIRSTNAME'][0]}", "${jsonArray[i]['BIRTHDATE'][0]}", "${jsonArray[i]['SEX'][0]}", ${jsonArray[i]['FOREIGNER'][0]}, "${jsonArray[i]['CLBNAME'][0]}", "${jsonArray[i]['RATEDATE'][0]}", ${jsonArray[i]['RATEORDER'][0]}, ${jsonArray[i]['RATEPLPNTS'][0]}, ${jsonArray[i]['RATEPOINTS'][0]}, ${jsonArray[i]['RATEWEIGHT'][0]}, "${jsonArray[i]['UPDATED'][0]}", "${jsonArray[i]['CREATED'][0]}", CURRENT_TIMESTAMP()), `;

      // console.log(queryValues);
    }
    return queryValues;
  };

  // MySQL full query
  let query = (queryCommand + queryValue()).slice(0, -2) + ';';
  // fs.writeFileSync('public/query.txt', query);

  // console.log(query);
  const rows = await db.query(query);
  console.log(rows);
  console.log(moment().format() + ' insert2Db done');
}

module.exports = {
  downloadFile,
  parseXML2JsonFile,
  insert2Db,
};
