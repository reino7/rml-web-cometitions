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

let apiBaseUrl = `${getGurrentUrlProtocol}//lt-test.ristissaar.ee`;
const apiUrlPathForRegistration = '/api/v1/registration/';
const apiUrlPathForMatch = '/api/v1/match/';

if (getGurrentUrlHost == 'localhost') {
  apiBaseUrl = `${getGurrentUrlProtocol}//${getGurrentUrlHost}:${getGurrentUrlPort}`;
}

let apiUrlForRegistration = `${apiBaseUrl}${apiUrlPathForRegistration}${getGurrentUrlPathLastItem}`;
let apiUrlForMatch = `${apiBaseUrl}${apiUrlPathForMatch}${getGurrentUrlPathLastItem}`;

console.log('----- -----');
console.log('Võistluse Nimi: ' + localStorage.getItem('compName'));
console.log('Võistluse ID: ' + localStorage.getItem('compId'));
console.log('Võistluse ID from URL: ' + getGurrentUrlPathLastItem);
console.log('Reg API URL: ' + apiUrlForRegistration);
console.log('Match API URL: ' + apiUrlForMatch);
console.log('----- -----');

/* get  competitionName element from html and display compName from LocalStorage*/
const competitionName = document.getElementById('competitionName');
competitionName.innerText = localStorage.getItem('compName');

/* GET data from API-s */
function getData() {
  axios
    .all([axios.get(apiUrlForRegistration), axios.get(apiUrlForMatch)])
    .then(response => {
      console.table(response[0].data);
      console.table(response[1].data);
      /* Registration API Data*/
      const registrationData = response[0].data;
      /* Match API Data*/
      const matchData = response[1].data;

      insertTable(registrationData, matchData);
    })
    .catch(error => console.log(error));
}
getData();

function insertTable(registrationData, matchData) {
  const compGameTableBody = document.getElementById('compGameTableBody');
  compGameTableBody.innerHTML = '';
  for (let i = 0; i < matchData.length; i++) {
    if (matchData[i].player1 === null) {
      matchData[i].player1 = '';
    }
    if (matchData[i].player2 === null) {
      matchData[i].player2 = '';
    }
    if (matchData[i].match_id === null) {
      matchData[i].match_id = '';
    }

    compGameTableBody.innerHTML += `
    <tr id="${matchData[i].match_id}">
      <td class="text-center">${matchData[i].match_id}</td>
      <td id="${
        matchData[i].match_id + 'player1'
      }" data-bs-toggle="tooltip" data-bs-placement="top" title="ID"></td>
      <td id="${
        matchData[i].match_id + 'player2'
      }" data-bs-toggle="tooltip" data-bs-placement="top" title="ID "></td>
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
        <select id="${matchData[i].match_id}matchWinner" class="w-100">
          <option value="0" selected>&nbsp;</option>
          <option value="" label=""></option>
          <option value="" label=""></option>
        </select>
      </td>
      <td class="text-center">
        <select id="${matchData[i].match_id}matchWinnerScore">
          <option value="0" selected>&nbsp;</option>
          <option value="1">3:0</option>
          <option value="2">3:1</option>
          <option value="3">3:2</option>
          <option value="4">w:o</option>
        </select>
      </td>
      <td class="text-center">
        <ul class="m-0 p-0">
          <!-- <li class="list-inline-item">
            <button class="btn btn-outline-secondary btn-sm rounded-0" type="button" data-toggle="tooltip"
              data-placement="top" title="Muuda"><i class="fa fa-edit"></i></button>
          </li> -->
          <li class="list-inline-item">
            <a id="saveMatch${
              matchData[i].match_id
            }" class="btn btn-outline-secondary btn-sm rounded-0" data-toggle="tooltip"
              data-placement="top" title="Salvesta"><i class="fas fa-save"></i></a>
          </li>
        </ul>
      </td>
    </tr>
  `;
  }

  /* Game 101 -> 1 vs 16 */
  const g101player1Element = document.getElementById('101player1');
  const g101player2Element = document.getElementById('101player2');
  const g101matchWinnerElement = document.getElementById('101matchWinner');
  const g101Player1Id = registrationData[0].person_id;
  const g101Player2Id = registrationData[15].person_id;
  const g101Player1Name =
    registrationData[0].first_name + ' ' + registrationData[0].fam_name;
  const g101Player2Name =
    registrationData[15].first_name + ' ' + registrationData[15].fam_name;

  // set title as player id
  g101player1Element.title = g101Player1Id;
  g101player2Element.title = g101Player2Id;
  // set cell value to player first- and lastname
  g101player1Element.innerText = g101Player1Name;
  g101player2Element.innerText = g101Player2Name;
  // set dropdown options to player first- and lastname, add player id as value
  g101matchWinnerElement.options[1] = new Option(
    g101Player1Name,
    g101Player1Id,
    false,
    false
  );
  g101matchWinnerElement.options[2] = new Option(
    g101Player2Name,
    g101Player2Id,
    false,
    false
  );

  /* Game 102 -> 9 vs 8 */
  // set title as player id
  document.getElementById('102player1').title = registrationData[8].person_id;
  document.getElementById('102player2').title = registrationData[7].person_id;
  // set cell value to player first- and lastname
  document.getElementById('102player1').innerText =
    registrationData[8].first_name + ' ' + registrationData[8].fam_name;
  document.getElementById('102player2').innerText =
    registrationData[7].first_name + ' ' + registrationData[7].fam_name;
  // set dropdown options to player first- and lastname, add player id as value
  document.getElementById('102matchWinner').options[1] = new Option(
    registrationData[8].first_name + ' ' + registrationData[8].fam_name,
    registrationData[8].person_id,
    false,
    false
  );
  document.getElementById('102matchWinner').options[2] = new Option(
    registrationData[7].first_name + ' ' + registrationData[7].fam_name,
    registrationData[7].person_id,
    false,
    false
  );

  /* Game 103 -> 5 vs 12 */
  // set title as player id
  document.getElementById('103player1').title = registrationData[4].person_id;
  document.getElementById('103player2').title = registrationData[11].person_id;
  // set cell value to player first- and lastname
  document.getElementById('103player1').innerText =
    registrationData[4].first_name + ' ' + registrationData[4].fam_name;
  document.getElementById('103player2').innerText =
    registrationData[11].first_name + ' ' + registrationData[11].fam_name;
  // set dropdown options to player first- and lastname, add player id as value
  document.getElementById('103matchWinner').options[1] = new Option(
    registrationData[4].first_name + ' ' + registrationData[4].fam_name,
    registrationData[4].person_id,
    false,
    false
  );
  document.getElementById('103matchWinner').options[2] = new Option(
    registrationData[11].first_name + ' ' + registrationData[11].fam_name,
    registrationData[11].person_id,
    false,
    false
  );

  /* Game 104 -> 13 vs 4 */
  // set title as player id
  document.getElementById('104player1').title = registrationData[12].person_id;
  document.getElementById('104player2').title = registrationData[3].person_id;
  // set cell value to player first- and lastname
  document.getElementById('104player1').innerText =
    registrationData[12].first_name + ' ' + registrationData[12].fam_name;
  document.getElementById('104player2').innerText =
    registrationData[3].first_name + ' ' + registrationData[3].fam_name;
  // set dropdown options to player first- and lastname, add player id as value
  document.getElementById('104matchWinner').options[1] = new Option(
    registrationData[12].first_name + ' ' + registrationData[12].fam_name,
    registrationData[12].person_id,
    false,
    false
  );
  document.getElementById('104matchWinner').options[2] = new Option(
    registrationData[3].first_name + ' ' + registrationData[3].fam_name,
    registrationData[3].person_id,
    false,
    false
  );

  /* Game 105 -> 3 vs 14 */
  // set title as player id
  document.getElementById('105player1').title = registrationData[2].person_id;
  document.getElementById('105player2').title = registrationData[13].person_id;
  // set cell value to player first- and lastname
  document.getElementById('105player1').innerText =
    registrationData[2].first_name + ' ' + registrationData[2].fam_name;
  document.getElementById('105player2').innerText =
    registrationData[13].first_name + ' ' + registrationData[13].fam_name;
  // set dropdown options to player first- and lastname, add player id as value
  document.getElementById('105matchWinner').options[1] = new Option(
    registrationData[2].first_name + ' ' + registrationData[2].fam_name,
    registrationData[2].person_id,
    false,
    false
  );
  document.getElementById('105matchWinner').options[2] = new Option(
    registrationData[13].first_name + ' ' + registrationData[13].fam_name,
    registrationData[13].person_id,
    false,
    false
  );

  /* Game 106 -> 11 vs 6 */
  // set title as player id
  document.getElementById('106player1').title = registrationData[10].person_id;
  document.getElementById('106player2').title = registrationData[5].person_id;
  // set cell value to player first- and lastname
  document.getElementById('106player1').innerText =
    registrationData[10].first_name + ' ' + registrationData[10].fam_name;
  document.getElementById('106player2').innerText =
    registrationData[5].first_name + ' ' + registrationData[5].fam_name;
  // set dropdown options to player first- and lastname, add player id as value
  document.getElementById('106matchWinner').options[1] = new Option(
    registrationData[10].first_name + ' ' + registrationData[10].fam_name,
    registrationData[10].person_id,
    false,
    false
  );
  document.getElementById('106matchWinner').options[2] = new Option(
    registrationData[5].first_name + ' ' + registrationData[5].fam_name,
    registrationData[5].person_id,
    false,
    false
  );

  /* Game 107 -> 7 vs 10 */
  // set title as player id
  document.getElementById('107player1').title = registrationData[6].person_id;
  document.getElementById('107player2').title = registrationData[9].person_id;
  // set cell value to player first- and lastname
  document.getElementById('107player1').innerText =
    registrationData[6].first_name + ' ' + registrationData[6].fam_name;
  document.getElementById('107player2').innerText =
    registrationData[9].first_name + ' ' + registrationData[9].fam_name;
  // set dropdown options to player first- and lastname, add player id as value
  document.getElementById('107matchWinner').options[1] = new Option(
    registrationData[6].first_name + ' ' + registrationData[6].fam_name,
    registrationData[6].person_id,
    false,
    false
  );
  document.getElementById('107matchWinner').options[2] = new Option(
    registrationData[9].first_name + ' ' + registrationData[9].fam_name,
    registrationData[9].person_id,
    false,
    false
  );

  /* Game 108 -> 15 vs 2 */
  // set title as player id
  document.getElementById('108player1').title = registrationData[14].person_id;
  document.getElementById('108player2').title = registrationData[1].person_id;
  // set cell value to player first- and lastname
  document.getElementById('108player1').innerText =
    registrationData[14].first_name + ' ' + registrationData[14].fam_name;
  document.getElementById('108player2').innerText =
    registrationData[1].first_name + ' ' + registrationData[1].fam_name;
  // set dropdown options to player first- and lastname, add player id as value
  document.getElementById('108matchWinner').options[1] = new Option(
    registrationData[14].first_name + ' ' + registrationData[14].fam_name,
    registrationData[14].person_id,
    false,
    false
  );
  document.getElementById('108matchWinner').options[2] = new Option(
    registrationData[1].first_name + ' ' + registrationData[1].fam_name,
    registrationData[1].person_id,
    false,
    false
  );

  /* add addEventListener to save button */
  document.getElementById('saveMatch101').addEventListener('click', () => {
    let g101matchId = document.getElementById('101').cells[0].innerText;
    let g101matchWinnerFullName =
      g101matchWinnerElement.options[g101matchWinnerElement.selectedIndex]
        .label;
    let g101matchWinnerId = parseInt(
      g101matchWinnerElement.options[g101matchWinnerElement.selectedIndex].value
    );
    let g101gameLoserFullName = '';
    let g101gameLoserId = null;
    // let g101matchWinnerName = g101matchWinnerValue.split(' ');
    console.log(
      `GameID ${g101matchId} winner is ${g101matchWinnerFullName} ID ${g101matchWinnerId}`
    );

    /* Check Game 101 loser */
    if (
      g101matchWinnerId !== parseInt(g101matchWinnerElement.options[2].value)
    ) {
      g101gameLoserFullName = g101matchWinnerElement.options[2].label;
      g101gameLoserId = parseInt(g101matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g101matchId} loser is ${g101gameLoserFullName} ID ${g101gameLoserId}`
      );
    }
    if (
      g101matchWinnerId !== parseInt(g101matchWinnerElement.options[1].value)
    ) {
      g101gameLoserFullName = g101matchWinnerElement.options[1].label;
      g101gameLoserId = parseInt(g101matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g101matchId} loser is ${g101gameLoserFullName} ID ${g101gameLoserId}`
      );
    }

    /* Save */
    // match_id 104 save data
    matchData[0].player1 = g101Player1Id;
    matchData[0].player2 = g101Player2Id;
    matchData[0].winner = g101matchWinnerId;
    matchData[0].loser = g101gameLoserId;
    console.table(matchData);
  });
}

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
