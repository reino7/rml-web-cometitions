'use strict';

/* local Dev or Test srv URL */
// const apiUrl = new URL('https://lt.ristissaar.ee/api/v1/match');
let getGurrentUrlHost = window.location.hostname;
let getGurrentUrlPort = window.location.port;
let getGurrentUrlProtocol = window.location.protocol;
let getGurrentUrlPath = window.location.pathname;
const getGurrentUrlPathLastItem = getGurrentUrlPath.substring(
  getGurrentUrlPath.lastIndexOf('/') + 1
);

let apiUrlHost = 'lt-test.ristissaar.ee';
let apiUrlPath = '/api/v1/match/';
let apiUrl = `${getGurrentUrlProtocol}//${apiUrlHost}${apiUrlPath}${getGurrentUrlPathLastItem}`;
if (getGurrentUrlHost == 'localhost') {
  apiUrl = `${getGurrentUrlProtocol}//localhost:${getGurrentUrlPort}${apiUrlPath}${getGurrentUrlPathLastItem}`;
}

console.log('----- -----');
console.log('Võistluse Nimi: ' + localStorage.getItem('compName'));
console.log('Võistluse ID: ' + localStorage.getItem('compId'));
console.log('Võistluse ID from URL: ' + getGurrentUrlPathLastItem);
console.log('API URL: ' + apiUrl);
console.log('----- -----');

/* get  competitionName element from html and display compName from LocalStorage*/
const competitionName = document.getElementById('competitionName');
competitionName.innerText = localStorage.getItem('compName');

/* GET data from API */
axios({
  method: 'get',
  url: apiUrl,
  responseType: 'json',
})
  .then(function (response) {
    console.log(response.statusText);
    console.log(response.status);
    console.table(response.data);
    return response;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function (response) {
    // always executed
    const compGameTableBody = document.getElementById('compGameTableBody');
    compGameTableBody.innerHTML = '';
    for (let i = 0; i < response.data.length; i++) {
      compGameTableBody.innerHTML += `
        <tr id="${response.data[i].match_id}">
          <td class="text-center">${response.data[i].match_id}</td>
          <td id="" data-bs-toggle="tooltip" data-bs-placement="top" title="ID">${response.data[i].player1}</td>
          <td id="" data-bs-toggle="tooltip" data-bs-placement="top" title="ID ">${response.data[i].player2}</td>
          <td class="text-center">
            <select id="gameTables">
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
            <select id="${response.data[i].match_id}gameWinner" class="w-100">
              <option value="0" selected>&nbsp;</option>
              <option value="${response.data[i].player1}" label="${response.data[i].player1}">${response.data[i].player1}</option>
              <option value="${response.data[i].player2}" label="${response.data[i].player2}">${response.data[i].player2}</option>
            </select>
          </td>
          <td class="text-center">
            <select id="${response.data[i].match_id}gameWinnerScore">
              <option value="0" selected>&nbsp;</option>
              <option value="3:0">3:0</option>
              <option value="3:1">3:1</option>
              <option value="3:2">3:2</option>
              <option value="w:o">w:o</option>
            </select>
          </td>
          <td class="text-center">
            <ul class="m-0 p-0">
              <!-- <li class="list-inline-item">
                <button class="btn btn-outline-secondary btn-sm rounded-0" type="button" data-toggle="tooltip"
                  data-placement="top" title="Muuda"><i class="fa fa-edit"></i></button>
              </li> -->
              <li class="list-inline-item">
                <a class="btn btn-outline-secondary btn-sm rounded-0" data-toggle="tooltip"
                  data-placement="top" title="Salvesta"><i class="fas fa-save" onclick="saveGameResults(${response.data[i].match_id})"></i></a>
              </li>
            </ul>
          </td>
        </tr>
      `;
    }
  });

// /* Creating Array of Object for Games*/
// let gamesData = [];
// let matchId = 100;
// let matchCount = 38;

// for (let i = 0; i < matchCount; i++) {
//   matchId = ++matchId;
//   gamesData[i] = {
//     matchId: matchId,
//     player1Id: null,
//     player1FistName: '',
//     player1FamName: '',
//     player2Id: null,
//     player2FistName: '',
//     player2FamName: '',
//     winner: null,
//     loser: null,
//     scoreId: null,
//     compId: '',
//     matchCreated: '',
//     matchUpdated: '',
//   };
// }

/* GET data from API */
// GET request for remote image in node.js
// axios({
//   method: 'get',
//   url: `http://localhost:3001/api/v1/registration/1648376664367-raplamaa-seeriavoistluse-1-etapp-kaiu-auhindadele`,
//   responseType: 'json',
// }).then(function (response) {
//   // console.log(response.statusText);
//   // console.log(response.status);
//   // console.table(response.data);
//   // return response.data
//   const registeredPlayerData = response.data;
//   registeredPlayerData.sort((a, b) => b.ratePoints - a.ratePoints);
//   console.table(registeredPlayerData);

//   /* Game 101 -> 1 vs 16 */
//   gamesData[0].player1Id = registeredPlayerData[0].person_id;
//   gamesData[0].player1FistName = registeredPlayerData[0].first_name;
//   gamesData[0].player1FamName = registeredPlayerData[0].fam_name;
//   gamesData[0].player2Id = registeredPlayerData[15].person_id;
//   gamesData[0].player2FistName = registeredPlayerData[15].first_name;
//   gamesData[0].player2FamName = registeredPlayerData[15].fam_name;
//   /* Game 102 -> 9 vs 8 */
//   gamesData[1].player1Id = registeredPlayerData[8].person_id;
//   gamesData[1].player1FistName = registeredPlayerData[8].first_name;
//   gamesData[1].player1FamName = registeredPlayerData[8].fam_name;
//   gamesData[1].player2Id = registeredPlayerData[7].person_id;
//   gamesData[1].player2FistName = registeredPlayerData[7].first_name;
//   gamesData[1].player2FamName = registeredPlayerData[7].fam_name;
//   /* Game 103 -> 5 vs 12 */
//   gamesData[2].player1Id = registeredPlayerData[4].person_id;
//   gamesData[2].player1FistName = registeredPlayerData[4].first_name;
//   gamesData[2].player1FamName = registeredPlayerData[4].fam_name;
//   gamesData[2].player2Id = registeredPlayerData[11].person_id;
//   gamesData[2].player2FistName = registeredPlayerData[11].first_name;
//   gamesData[2].player2FamName = registeredPlayerData[11].fam_name;
//   /* Game 104 -> 13 vs 4 */
//   gamesData[3].player1Id = registeredPlayerData[12].person_id;
//   gamesData[3].player1FistName = registeredPlayerData[12].first_name;
//   gamesData[3].player1FamName = registeredPlayerData[12].fam_name;
//   gamesData[3].player2Id = registeredPlayerData[3].person_id;
//   gamesData[3].player2FistName = registeredPlayerData[3].first_name;
//   gamesData[3].player2FamName = registeredPlayerData[3].fam_name;
//   /* Game 105 -> 3 vs 14 */
//   gamesData[4].player1Id = registeredPlayerData[2].person_id;
//   gamesData[4].player1FistName = registeredPlayerData[2].first_name;
//   gamesData[4].player1FamName = registeredPlayerData[2].fam_name;
//   gamesData[4].player2Id = registeredPlayerData[13].person_id;
//   gamesData[4].player2FistName = registeredPlayerData[13].first_name;
//   gamesData[4].player2FamName = registeredPlayerData[13].fam_name;
//   /* Game 106 -> 11 vs 6 */
//   gamesData[5].player1Id = registeredPlayerData[10].person_id;
//   gamesData[5].player1FistName = registeredPlayerData[10].first_name;
//   gamesData[5].player1FamName = registeredPlayerData[10].fam_name;
//   gamesData[5].player2Id = registeredPlayerData[5].person_id;
//   gamesData[5].player2FistName = registeredPlayerData[5].first_name;
//   gamesData[5].player2FamName = registeredPlayerData[5].fam_name;
//   /* Game 107 -> 7 vs 10 */
//   gamesData[6].player1Id = registeredPlayerData[6].person_id;
//   gamesData[6].player1FistName = registeredPlayerData[6].first_name;
//   gamesData[6].player1FamName = registeredPlayerData[6].fam_name;
//   gamesData[6].player2Id = registeredPlayerData[9].person_id;
//   gamesData[6].player2FistName = registeredPlayerData[9].first_name;
//   gamesData[6].player2FamName = registeredPlayerData[9].fam_name;
//   /* Game 108 -> 15 vs 2 */
//   gamesData[7].player1Id = registeredPlayerData[14].person_id;
//   gamesData[7].player1FistName = registeredPlayerData[14].first_name;
//   gamesData[7].player1FamName = registeredPlayerData[14].fam_name;
//   gamesData[7].player2Id = registeredPlayerData[2].person_id;
//   gamesData[7].player2FistName = registeredPlayerData[2].first_name;
//   gamesData[7].player2FamName = registeredPlayerData[2].fam_name;

//   insertGameTable();
//   console.table(gamesData);
// });

// function insertGameTable() {
//   const compGameTableBody = document.getElementById('compGameTableBody');
//   compGameTableBody.innerHTML = '';
//   for (let i = 0; i < gamesData.length; i++) {
//     compGameTableBody.innerHTML += `
//         <tr id="${gamesData[i].matchId}">
//           <td class="text-center">${gamesData[i].matchId}</td>
//           <td id="${gamesData[i].player1Id}" data-bs-toggle="tooltip" data-bs-placement="top" title="ID ${gamesData[i].player1Id}">${gamesData[i].player1FistName} ${gamesData[i].player1FamName}</td>
//           <td id="${gamesData[i].player2Id}" data-bs-toggle="tooltip" data-bs-placement="top" title="ID ${gamesData[i].player2Id}">${gamesData[i].player2FistName} ${gamesData[i].player2FamName}</td>
//           <td class="text-center">
//             <select id="gameTables">
//               <option value="0">&nbsp;</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//               <option value="6">6</option>
//               <option value="7">7</option>
//               <option value="8">8</option>
//               <option value="9">9</option>
//               <option value="10">10</option>
//             </select>
//           </td>
//           <td>
//             <select id="${gamesData[i].matchId}gameWinner" class="w-100">
//               <option value="0" selected>&nbsp;</option>
//               <option value="${gamesData[i].player1Id}" label="${gamesData[i].player1FistName} ${gamesData[i].player1FamName}">${gamesData[i].player1FistName} ${gamesData[i].player1FamName}</option>
//               <option value="${gamesData[i].player2Id}" label="${gamesData[i].player2FistName} ${gamesData[i].player2FamName}">${gamesData[i].player2FistName} ${gamesData[i].player2FamName}</option>
//             </select>
//           </td>
//           <td class="text-center">
//             <select id="${gamesData[i].matchId}gameWinnerScore">
//               <option value="0" selected>&nbsp;</option>
//               <option value="3:0">3:0</option>
//               <option value="3:1">3:1</option>
//               <option value="3:2">3:2</option>
//               <option value="w:o">w:o</option>
//             </select>
//           </td>
//           <td class="text-center">
//             <ul class="m-0 p-0">
//               <!-- <li class="list-inline-item">
//                 <button class="btn btn-outline-secondary btn-sm rounded-0" type="button" data-toggle="tooltip"
//                   data-placement="top" title="Muuda"><i class="fa fa-edit"></i></button>
//               </li> -->
//               <li class="list-inline-item">
//                 <a class="btn btn-outline-secondary btn-sm rounded-0" data-toggle="tooltip"
//                   data-placement="top" title="Salvesta"><i class="fas fa-save" onclick="saveGameResults(${gamesData[i].matchId})"></i></a>
//               </li>
//             </ul>
//           </td>
//         </tr>
//       `;
//   }
// }

// function saveGameResults(gameId) {
//   /* Game 101 -> 1 vs 16 results */
//   if (gameId === 101) {
//     let g101 = document.getElementById('101');
//     let g101Player1Id = g101.cells[1].id;
//     let g101Player1 = g101.cells[1].innerText;
//     let g101Player2Id = g101.cells[2].id;
//     let g101Player2 = g101.cells[2].innerText;

//     /* Check Game 101 winner */
//     let g101gameWinner = document.getElementById('101gameWinner');
//     let g101gameWinnerScore = document.getElementById('101gameWinnerScore');
//     let g101gameWinnerScoreValue =
//       g101gameWinnerScore.options[g101gameWinnerScore.selectedIndex].label;
//     let g101gameWinnerName =
//       g101gameWinner.options[g101gameWinner.selectedIndex].label;
//     let g101gameLoserName = '';
//     console.log('----- -----');
//     console.log(
//       `GameID ${gameId} winner is ${g101gameWinnerName} ID ${
//         g101gameWinner.options[g101gameWinner.selectedIndex].value
//       }`
//     );

//     /* Insert Data to object */
//     gamesData[0].winner = parseInt(
//       g101gameWinner.options[g101gameWinner.selectedIndex].value
//     );
//     gamesData[0].scoreId = g101gameWinnerScoreValue;

//     /* Check Game 101 loser */
//     if (g101gameWinnerName !== g101Player1) {
//       g101gameLoserName = g101Player1;
//       gamesData[0].loser = parseInt(g101Player1Id);
//       console.log(
//         `GameID ${gameId} loser is ${g101gameLoserName} ID ${g101Player1Id}`
//       );
//       console.log('----- -----');
//     }
//     if (g101gameWinnerName !== g101Player2) {
//       g101gameLoserName = g101Player2;
//       gamesData[0].loser = parseInt(g101Player2Id);
//       console.log(
//         `GameID ${gameId} loser is ${g101gameLoserName} ID ${g101Player2Id}`
//       );
//       console.log(`GameID ${gameId} score ${g101gameWinnerScoreValue}`);
//       console.log('----- -----');
//     }

//     /* Game 101 Winner -> Game 109 */
//     gamesData[8].player1Id = parseInt(
//       g101gameWinner.options[g101gameWinner.selectedIndex].value
//     );
//     let g101gameWinnerNameSplit = g101gameWinnerName.split(' ');
//     gamesData[8].player1FistName = g101gameWinnerNameSplit[0];
//     gamesData[8].player1FamName = g101gameWinnerNameSplit[1];

//     /* Game 101 Loser -> Game -101 */
//     gamesData[13].player2Id = gamesData[0].loser;
//     let g101gameLoserNameSplit = g101gameLoserName.split(' ');
//     gamesData[13].player2FistName = g101gameLoserNameSplit[0];
//     gamesData[13].player2FamName = g101gameLoserNameSplit[1];

//     insertGameTable();
//     console.table(gamesData);
//   }
// }

// GET competitions list from API
// fetch('http://localhost:3000/api/competitions-games')
// fetch(apiUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (dataJson) {
//     appendData2CompetitionGameTable(dataJson);
//   })
//   .catch(function (err) {
//     console.log('error: ' + err);
//   });

// // Display data from API to HTML Tables
// function appendData2CompetitionGameTable(data) {
//   const competitionGameTableContainer = document.getElementById(
//     'competitionGameTable'
//   );

//   for (let i = 0; i < data.length; i++) {
//     competitionGameTableContainer.innerHTML += `<tr>
//         <td class="text-center">${data[i].gameId}</td>
//         <td>${data[i].player1}</td>
//         <td>${data[i].player2}</td>
//         <td class="text-center">
//           <select id="compTables">
//             <option value="0">&nbsp;</option>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//             <option value="6">6</option>
//             <option value="7">7</option>
//             <option value="8">8</option>
//             <option value="9">9</option>
//             <option value="10">10</option>
//           </select>
//         </td>
//         <td>
//           <select name="compWinner" id="compWinner" class="w-100">
//             <option value="0" selected>&nbsp;</option>
//             <option value="1"></option>
//             <option value="2"></option>
//           </select>
//         </td>
//         <td class="text-center">
//           <select name="compWinnerScore" id="compWinnerScore">
//             <option value="0" selected>&nbsp;</option>
//             <option value="1">3:0</option>
//             <option value="2">3:1</option>
//             <option value="3">3:2</option>
//           </select>
//         </td>
//         <td class="text-center">
//           <ul class="m-0 p-0">
//             <li class="list-inline-item">
//               <button class="btn btn-secondary btn-sm rounded-0" type="button" data-toggle="tooltip"
//                 data-placement="top" title="Muuda"><i class="fa fa-edit"></i></button>
//             </li>
//             <li class="list-inline-item">
//               <button class="btn btn-secondary btn-sm rounded-0" type="button" data-toggle="tooltip"
//                 data-placement="top" title="Salvesta"><i class="fas fa-save"></i></button>
//             </li>
//           </ul>
//         </td>
//       </tr>`;
//   }
// }
