'use strict';

/* local Dev or Test srv URL */
let getGurrentUrlHost = window.location.hostname;
let getGurrentUrlPort = window.location.port;
let getGurrentUrlProtocol = window.location.protocol;
let apiUrlHost = 'lt-test.ristissaar.ee';
let apiUrlPath = '/api/competitions-games';
let apiUrl = `${getGurrentUrlProtocol}//${apiUrlHost}${apiUrlPath}`;

if (getGurrentUrlHost == 'localhost') {
  apiUrl = `${getGurrentUrlProtocol}//localhost:${getGurrentUrlPort}${apiUrlPath}`;
}
// GET competitions list from API
// fetch('http://localhost:3000/api/competitions-games')
fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (dataJson) {
    appendData2CompetitionGameTable(dataJson);
  })
  .catch(function (err) {
    console.log('error: ' + err);
  });

// Display data from API to HTML Tables
function appendData2CompetitionGameTable(data) {
  const competitionGameTableContainer = document.getElementById(
    'competitionGameTable'
  );

  for (let i = 0; i < data.length; i++) {
    competitionGameTableContainer.innerHTML += `<tr>
        <td class="text-center">${data[i].gameId}</td>
        <td>${data[i].player1}</td>
        <td>${data[i].player2}</td>
        <td class="text-center">
          <select id="compTables" disabled>
            <option value="0">&nbsp;</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </td>
        <td>
          <select name="compWinner" id="compWinner" class="w-100" disabled>
            <option value="0">&nbsp;</option>
            <option value="1" selected>${data[i].winner}</option>
            <option value="2">${data[i].player2}</option>
          </select>
        </td>
        <td class="text-center">
          <select name="compWinnerScore" id="compWinnerScore" disabled>
            <option value="0">&nbsp;</option>
            <option value="1" selected>3:0</option>
            <option value="2">3:1</option>
            <option value="3">3:2</option>
          </select>
        </td>
        <td class="text-center">
          <ul class="m-0 p-0">
            <li class="list-inline-item">
              <button class="btn btn-secondary btn-sm rounded-0" type="button" data-toggle="tooltip"
                data-placement="top" title="Muuda"><i class="fa fa-edit"></i></button>
            </li>
            <li class="list-inline-item">
              <button class="btn btn-secondary btn-sm rounded-0" type="button" data-toggle="tooltip"
                data-placement="top" title="Salvesta"><i class="fas fa-save"></i></button>
            </li>
          </ul>
        </td>
      </tr>`;
  }
}
