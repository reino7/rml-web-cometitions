'use strict';

/* local Dev or Test srv URL */
let getGurrentUrlHost = window.location.hostname;
let getGurrentUrlPort = window.location.port;
let getGurrentUrlProtocol = window.location.protocol;
let getGurrentUrlPath = window.location.pathname;
const getGurrentUrlPathLastItem = getGurrentUrlPath.substring(
  getGurrentUrlPath.lastIndexOf('/') + 1
);
let apiUrlHost = 'lt-test.ristissaar.ee';
let apiUrlPath = '/api/competitions-games';
let apiUrl = `${getGurrentUrlProtocol}//${apiUrlHost}${apiUrlPath}`;
if (getGurrentUrlHost == 'localhost') {
  apiUrl = `${getGurrentUrlProtocol}//localhost:${getGurrentUrlPort}${apiUrlPath}`;
}

console.log('----- -----');
console.log('Võistluse Nimi: ' + localStorage.getItem('compName'))
console.log('Võistluse ID: ' + localStorage.getItem('compId'))
console.log('Võistluse ID from URL: ' + getGurrentUrlPathLastItem)
console.log('----- -----');

/* get  competitionName element from html and display compName from LocalStorage*/
const competitionName = document.getElementById('competitionName');
competitionName.innerText = localStorage.getItem('compName')

 /* GET data from API */
let registeredPlayerData = () => {
  // GET request for remote image in node.js
  axios({
    method: 'get',
    url: `http://localhost:3001/api/registration/1648127928219-raplamaa-seeriavoistluse-1-etapp-kaiu-auhindadele`,
    responseType: 'json',
  }).then(function (response) {
    // console.log(response.statusText);
    // console.log(response.status);
    // console.table(response.data);
    return response.data
  });
};
registeredPlayerData()

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
          <select id="compTables">
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
          <select name="compWinner" id="compWinner" class="w-100">
            <option value="0" selected>&nbsp;</option>
            <option value="1"></option>
            <option value="2"></option>
          </select>
        </td>
        <td class="text-center">
          <select name="compWinnerScore" id="compWinnerScore">
            <option value="0" selected>&nbsp;</option>
            <option value="1">3:0</option>
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
