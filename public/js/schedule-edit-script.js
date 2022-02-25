'use strict';

/* local Dev or Test srv URL */
let getGurrentUrlHost = window.location.hostname;
let getGurrentUrlPort = window.location.port;
let getGurrentUrlProtocol = window.location.protocol;
let apiUrlHost = 'lt-test.ristissaar.ee';
let apiUrlPath = '/api/competitions-schedule';
let apiUrl = `${getGurrentUrlProtocol}//${apiUrlHost}${apiUrlPath}`;

if (getGurrentUrlHost == 'localhost') {
  apiUrl = `${getGurrentUrlProtocol}//localhost:${getGurrentUrlPort}${apiUrlPath}`;
}

/* GET competitions list from API */
// fetch('http://localhost:3000/api/competitions-schedule')
// fetch('https://lt-test.ristissaar.ee/api/competitions-schedule')
fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (dataJson) {
    appendData2CompetitionsTable(dataJson);
  })
  .catch(function (err) {
    console.log('error: ' + err);
  });

// Display data from API to HTML Tables
function appendData2CompetitionsTable(data) {
  const competitionsTableContainer = document.getElementById(
    'competitionsTableEdit'
  );

  for (let i = 0; i < data.length; i++) {
    competitionsTableContainer.innerHTML += `<tr>
      <td class="text-center">${parseDate(data[i].comp_date)}</td>
      <td>
      ${data[i].comp_name}
      </td>
      <td>${data[i].comp_location}</td>
      <td class="text-center">
        <ul class="m-0 p-0">
          <li class="list-inline-item">
            <a class="btn btn-secondary btn-sm rounded-0" href="/ajakava/muuda/${
              data[i].id
            }" data-toggle="tooltip"
              data-placement="top" title="Muuda"><i class="fa fa-edit"></i></a>
          </li>
        </ul>
      </td>
    </tr>`;
  }
}

function parseDate(dateString) {
  /* axios uses JSON.stringify for serialisation and it causes 
  the translation to UTC. This loses 2 hours for timezone difference.
  Adding 2 hours to correct this */
  // dateString = moment(dateString).add(2, 'hours').format();

  let dateComponents = dateString.split('T');
  let datePieces = dateComponents[0].split('-');
  let year = datePieces[0];
  let month = datePieces[1];
  let day = datePieces[2];

  let competitionDate = `${day}.${month}.${year}`;

  return competitionDate;
}

// function getMonth(monthNumber) {
//   let monthNames = [
//     'jaanuar',
//     'veebruar',
//     'märts',
//     'aprill',
//     'mai',
//     'juuni',
//     'juuli',
//     'august',
//     'september',
//     'oktoober',
//     'november',
//     'detsember',
//   ];

//   return monthNames[monthNumber - 1];
// }
