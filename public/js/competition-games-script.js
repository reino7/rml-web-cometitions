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

/* Second Navigation URL paths */
let secondNavLinkPath = '/voistlus/';
let secondNavLinkPathInfo = 'info/';
let secondNavLinkPathPlacement = 'paigutus/';
let secondNavLinkPathTable = 'tabel/';
let secondNavLinkPathMatches = 'mangud/';
let secondNavLinkPathResults = 'tulemused/';
let secondNavLinkPathAwards = 'auhinnad/';
document.getElementById(
  'linkInfo'
).href = `${secondNavLinkPath}${secondNavLinkPathInfo}${getGurrentUrlPathLastItem}`;
document.getElementById(
  'linkPaigutus'
).href = `${secondNavLinkPath}${secondNavLinkPathPlacement}${getGurrentUrlPathLastItem}`;
document.getElementById(
  'linkTabel'
).href = `${secondNavLinkPath}${secondNavLinkPathTable}${getGurrentUrlPathLastItem}`;
document.getElementById(
  'linkMangud'
).href = `${secondNavLinkPath}${secondNavLinkPathMatches}${getGurrentUrlPathLastItem}`;
document.getElementById(
  'linkTulemused'
).href = `${secondNavLinkPath}${secondNavLinkPathResults}${getGurrentUrlPathLastItem}`;
document.getElementById(
  'linkAuhinnad'
).href = `${secondNavLinkPath}${secondNavLinkPathAwards}${getGurrentUrlPathLastItem}`;

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
  // eslint-disable-next-line no-undef
  axios
    // eslint-disable-next-line no-undef
    .all([axios.get(apiUrlForRegistration), axios.get(apiUrlForMatch)])
    .then(response => {
      console.table(response[0].data);
      // console.table(response[1].data);
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
      matchData[i].player1 = null;
    }
    if (matchData[i].player2 === null) {
      matchData[i].player2 = null;
    }
    if (matchData[i].match_id === null) {
      matchData[i].match_id = null;
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
        <select id="${matchData[i].match_id}gameTable">
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
        <select id="${matchData[i].match_id}matchScore">
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

  /*****         *****/
  /* Game 101 -> 1 vs 16 */
  /*****         *****/
  const g101player1Element = document.getElementById('101player1');
  const g101player2Element = document.getElementById('101player2');
  const g101gameTableElement = document.getElementById('101gameTable');
  const g101matchWinnerElement = document.getElementById('101matchWinner');
  const g101matchScoreElement = document.getElementById('101matchScore');
  const g101Player1Id = registrationData[0].person_id;
  const g101Player2Id = registrationData[15].person_id;

  // set title as player id
  g101player1Element.title = g101Player1Id;
  g101player2Element.title = g101Player2Id;
  // set cell value to player first- and lastname
  g101player1Element.innerText = findPlayer(
    g101Player1Id,
    registrationData
  ).fullName;
  g101player2Element.innerText = findPlayer(
    g101Player2Id,
    registrationData
  ).fullName;
  // set dropdown options to player first- and lastname, add player id as value
  g101matchWinnerElement.options[1] = new Option(
    findPlayer(g101Player1Id, registrationData).fullName,
    g101Player1Id,
    false,
    false
  );
  g101matchWinnerElement.options[2] = new Option(
    findPlayer(g101Player2Id, registrationData).fullName,
    g101Player2Id,
    false,
    false
  );
  // if winner available in API, select winner in dropdown
  if (
    matchData[0].winner === parseInt(g101matchWinnerElement.options[1].value)
  ) {
    g101matchWinnerElement.options[1].selected = true;
    g101matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  if (
    matchData[0].winner === parseInt(g101matchWinnerElement.options[2].value)
  ) {
    g101matchWinnerElement.options[2].selected = true;
    g101matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  // match_id 101 save data Object
  matchData[0].player1 = g101Player1Id;
  matchData[0].player2 = g101Player2Id;

  /* add addEventListener to match 101 save button */
  document.getElementById('saveMatch101').addEventListener('click', () => {
    let g101matchId = document.getElementById('101').cells[0].innerText;
    let g101matchWinnerFullName =
      g101matchWinnerElement.options[g101matchWinnerElement.selectedIndex]
        .label;
    let g101matchWinnerId = parseInt(
      g101matchWinnerElement.options[g101matchWinnerElement.selectedIndex].value
    );
    let g101matchScore = parseInt(
      g101matchScoreElement.options[g101matchScoreElement.selectedIndex].value
    );
    let g101gameLoserFullName = '';
    let g101gameLoserId = null;
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
    // match_id 101 save match results
    matchData[0].winner = g101matchWinnerId;
    matchData[0].loser = g101gameLoserId;
    matchData[0].score_id = g101matchScore;
    // clear gameTable selection to 0
    g101gameTableElement.options[0].selected = true;
    // send match_id 101 to API
    saveMatch(matchData[0]);

    /* Move match 101 Winner to new match 109 as player 1*/
    // save to Object
    matchData[8].player1 = g101matchWinnerId;
    // set cell value to player first- and lastname
    g109player1Element.innerText = findPlayer(
      g101matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g109matchWinnerElement.options[1] = new Option(
      findPlayer(g101matchWinnerId, registrationData).fullName,
      g101matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[8]);

    /* Move match 101 Loser to new match 114 as player 2 */
    // save to Object
    matchData[13].player2 = g101gameLoserId;
    // set cell value to player first- and lastname
    g114player2Element.innerText = findPlayer(
      g101gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g114matchWinnerElement.options[1] = new Option(
      findPlayer(g101gameLoserId, registrationData).fullName,
      g101gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[13]);

    console.table(matchData);
  });

  /*****         *****/
  /* Game 102 -> 9 vs 8 */
  /*****         *****/
  const g102player1Element = document.getElementById('102player1');
  const g102player2Element = document.getElementById('102player2');
  const g102gameTableElement = document.getElementById('102gameTable');
  const g102matchWinnerElement = document.getElementById('102matchWinner');
  const g102matchScoreElement = document.getElementById('102matchScore');
  const g102Player1Id = registrationData[8].person_id;
  const g102Player2Id = registrationData[7].person_id;

  // set title as player id
  g102player1Element.title = g102Player1Id;
  g102player2Element.title = g102Player2Id;
  // set cell value to player first- and lastname
  g102player1Element.innerText = findPlayer(
    g102Player1Id,
    registrationData
  ).fullName;
  g102player2Element.innerText = findPlayer(
    g102Player2Id,
    registrationData
  ).fullName;
  // set dropdown options to player first- and lastname, add player id as value
  g102matchWinnerElement.options[1] = new Option(
    findPlayer(g102Player1Id, registrationData).fullName,
    g102Player1Id,
    false,
    false
  );
  g102matchWinnerElement.options[2] = new Option(
    findPlayer(g102Player2Id, registrationData).fullName,
    g102Player2Id,
    false,
    false
  );
  // if winner available in API, select winner in dropdown
  if (
    matchData[1].winner === parseInt(g102matchWinnerElement.options[1].value)
  ) {
    g102matchWinnerElement.options[1].selected = true;
    g102matchScoreElement.options[matchData[1].score_id].selected = true;
  }

  if (
    matchData[1].winner === parseInt(g102matchWinnerElement.options[2].value)
  ) {
    g102matchWinnerElement.options[2].selected = true;
    g102matchScoreElement.options[matchData[1].score_id].selected = true;
  }

  // match_id 102 save data Object
  matchData[1].player1 = g102Player1Id;
  matchData[1].player2 = g102Player2Id;

  /* add addEventListener to match 102 save button */
  document.getElementById('saveMatch102').addEventListener('click', () => {
    let g102matchId = document.getElementById('102').cells[0].innerText;
    let g102matchWinnerFullName =
      g102matchWinnerElement.options[g102matchWinnerElement.selectedIndex]
        .label;
    let g102matchWinnerId = parseInt(
      g102matchWinnerElement.options[g102matchWinnerElement.selectedIndex].value
    );
    let g102matchScore = parseInt(
      g102matchScoreElement.options[g102matchScoreElement.selectedIndex].value
    );
    let g102gameLoserFullName = '';
    let g102gameLoserId = null;
    // let g102matchWinnerName = g102matchWinnerValue.split(' ');
    console.log(
      `GameID ${g102matchId} winner is ${g102matchWinnerFullName} ID ${g102matchWinnerId}`
    );

    /* Check Game 102 loser */
    if (
      g102matchWinnerId !== parseInt(g102matchWinnerElement.options[2].value)
    ) {
      g102gameLoserFullName = g102matchWinnerElement.options[2].label;
      g102gameLoserId = parseInt(g102matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g102matchId} loser is ${g102gameLoserFullName} ID ${g102gameLoserId}`
      );
    }
    if (
      g102matchWinnerId !== parseInt(g102matchWinnerElement.options[1].value)
    ) {
      g102gameLoserFullName = g102matchWinnerElement.options[1].label;
      g102gameLoserId = parseInt(g102matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g102matchId} loser is ${g102gameLoserFullName} ID ${g102gameLoserId}`
      );
    }

    /* Save */
    // match_id 102 save match results
    matchData[1].winner = g102matchWinnerId;
    matchData[1].loser = g102gameLoserId;
    matchData[1].score_id = g102matchScore;
    // clear gameTable selection to 0
    g102gameTableElement.options[0].selected = true;
    // send match_id 102 to API
    saveMatch(matchData[1]);

    /* Move match 102 Winner to new match 109 as player 2*/
    // save to Object
    matchData[8].player2 = g102matchWinnerId;
    // set cell value to player first- and lastname
    g109player2Element.innerText = findPlayer(
      g102matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g109matchWinnerElement.options[2] = new Option(
      findPlayer(g102matchWinnerId, registrationData).fullName,
      g102matchWinnerId,
      false,
      false
    );

    // send player data to API
    saveMatch(matchData[8]);
    /* Move match 102 Loser to new match 114 as player 1 */
    matchData[13].player1 = g102gameLoserId;
    g114player1Element.innerText = findPlayer(
      g102gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g114matchWinnerElement.options[2] = new Option(
      findPlayer(g102gameLoserId, registrationData).fullName,
      g102gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[13]);

    console.table(matchData);
  });

  /*****         *****/
  /* Game 103 -> 5 vs 12 */
  /*****         *****/
  const g103player1Element = document.getElementById('103player1');
  const g103player2Element = document.getElementById('103player2');
  const g103gameTableElement = document.getElementById('103gameTable');
  const g103matchWinnerElement = document.getElementById('103matchWinner');
  const g103matchScoreElement = document.getElementById('103matchScore');
  const g103Player1Id = registrationData[4].person_id;
  const g103Player2Id = registrationData[11].person_id;

  // set title as player id
  g103player1Element.title = g103Player1Id;
  g103player2Element.title = g103Player2Id;
  // set cell value to player first- and lastname
  g103player1Element.innerText = findPlayer(
    g103Player1Id,
    registrationData
  ).fullName;
  g103player2Element.innerText = findPlayer(
    g103Player2Id,
    registrationData
  ).fullName;
  // set dropdown options to player first- and lastname, add player id as value
  g103matchWinnerElement.options[1] = new Option(
    findPlayer(g103Player1Id, registrationData).fullName,
    g103Player1Id,
    false,
    false
  );
  g103matchWinnerElement.options[2] = new Option(
    findPlayer(g103Player2Id, registrationData).fullName,
    g103Player2Id,
    false,
    false
  );
  // if winner available in API, select winner in dropdown
  if (
    matchData[2].winner === parseInt(g103matchWinnerElement.options[1].value)
  ) {
    g103matchWinnerElement.options[1].selected = true;
    g103matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  if (
    matchData[2].winner === parseInt(g103matchWinnerElement.options[2].value)
  ) {
    g103matchWinnerElement.options[2].selected = true;
    g103matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  // match_id 103 save data Object
  matchData[2].player1 = g103Player1Id;
  matchData[2].player2 = g103Player2Id;

  /* add addEventListener to match 103 save button */
  document.getElementById('saveMatch103').addEventListener('click', () => {
    let g103matchId = document.getElementById('103').cells[0].innerText;
    let g103matchWinnerFullName =
      g103matchWinnerElement.options[g103matchWinnerElement.selectedIndex]
        .label;
    let g103matchWinnerId = parseInt(
      g103matchWinnerElement.options[g103matchWinnerElement.selectedIndex].value
    );
    let g103matchScore = parseInt(
      g103matchScoreElement.options[g103matchScoreElement.selectedIndex].value
    );
    let g103gameLoserFullName = '';
    let g103gameLoserId = null;
    console.log(
      `GameID ${g103matchId} winner is ${g103matchWinnerFullName} ID ${g103matchWinnerId}`
    );

    /* Check Game 103 loser */
    if (
      g103matchWinnerId !== parseInt(g103matchWinnerElement.options[2].value)
    ) {
      g103gameLoserFullName = g103matchWinnerElement.options[2].label;
      g103gameLoserId = parseInt(g103matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g103matchId} loser is ${g103gameLoserFullName} ID ${g103gameLoserId}`
      );
    }
    if (
      g103matchWinnerId !== parseInt(g103matchWinnerElement.options[1].value)
    ) {
      g103gameLoserFullName = g103matchWinnerElement.options[1].label;
      g103gameLoserId = parseInt(g103matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g103matchId} loser is ${g103gameLoserFullName} ID ${g103gameLoserId}`
      );
    }

    /* Save */
    // match_id 103 save match results
    matchData[2].winner = g103matchWinnerId;
    matchData[2].loser = g103gameLoserId;
    matchData[2].score_id = g103matchScore;
    // clear gameTable selection to 0
    g103gameTableElement.options[0].selected = true;
    // send match_id 103 to API
    saveMatch(matchData[2]);

    /* Move match 103 Winner to new match 110 as player 1*/
    // save to Object
    matchData[9].player1 = g103matchWinnerId;
    // set cell value to player first- and lastname
    g110player1Element.innerText = findPlayer(
      g103matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g110matchWinnerElement.options[1] = new Option(
      findPlayer(g103matchWinnerId, registrationData).fullName,
      g103matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[9]);

    /* Move match 103 Loser to new match 113 as player 2 */
    // save to Object
    matchData[12].player2 = g103gameLoserId;
    // set cell value to player first- and lastname
    g113player2Element.innerText = findPlayer(
      g103gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g113matchWinnerElement.options[2] = new Option(
      findPlayer(g103gameLoserId, registrationData).fullName,
      g103gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[12]);

    console.table(matchData);
  });

  /*****         *****/
  /* Game 104 -> 13 vs 4 */
  /*****         *****/
  const g104player1Element = document.getElementById('104player1');
  const g104player2Element = document.getElementById('104player2');
  const g104gameTableElement = document.getElementById('104gameTable');
  const g104matchWinnerElement = document.getElementById('104matchWinner');
  const g104matchScoreElement = document.getElementById('104matchScore');
  const g104Player1Id = registrationData[12].person_id;
  const g104Player2Id = registrationData[3].person_id;

  // set title as player id
  g104player1Element.title = g104Player1Id;
  g104player2Element.title = g104Player2Id;
  // set cell value to player first- and lastname
  g104player1Element.innerText = findPlayer(
    g104Player1Id,
    registrationData
  ).fullName;
  g104player2Element.innerText = findPlayer(
    g104Player2Id,
    registrationData
  ).fullName;
  // set dropdown options to player first- and lastname, add player id as value
  g104matchWinnerElement.options[1] = new Option(
    findPlayer(g104Player1Id, registrationData).fullName,
    g104Player1Id,
    false,
    false
  );
  g104matchWinnerElement.options[2] = new Option(
    findPlayer(g104Player2Id, registrationData).fullName,
    g104Player2Id,
    false,
    false
  );
  // if winner available in API, select winner in dropdown
  if (
    matchData[3].winner === parseInt(g104matchWinnerElement.options[1].value)
  ) {
    g104matchWinnerElement.options[1].selected = true;
    g104matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  if (
    matchData[3].winner === parseInt(g104matchWinnerElement.options[2].value)
  ) {
    g104matchWinnerElement.options[2].selected = true;
    g104matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  // match_id 104 save data Object
  matchData[3].player1 = g104Player1Id;
  matchData[3].player2 = g104Player2Id;

  /* add addEventListener to match 104 save button */
  document.getElementById('saveMatch104').addEventListener('click', () => {
    let g104matchId = document.getElementById('104').cells[0].innerText;
    let g104matchWinnerFullName =
      g104matchWinnerElement.options[g104matchWinnerElement.selectedIndex]
        .label;
    let g104matchWinnerId = parseInt(
      g104matchWinnerElement.options[g104matchWinnerElement.selectedIndex].value
    );
    let g104matchScore = parseInt(
      g104matchScoreElement.options[g104matchScoreElement.selectedIndex].value
    );
    let g104gameLoserFullName = '';
    let g104gameLoserId = null;
    console.log(
      `GameID ${g104matchId} winner is ${g104matchWinnerFullName} ID ${g104matchWinnerId}`
    );

    /* Check Game 104 loser */
    if (
      g104matchWinnerId !== parseInt(g104matchWinnerElement.options[2].value)
    ) {
      g104gameLoserFullName = g104matchWinnerElement.options[2].label;
      g104gameLoserId = parseInt(g104matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g104matchId} loser is ${g104gameLoserFullName} ID ${g104gameLoserId}`
      );
    }
    if (
      g104matchWinnerId !== parseInt(g104matchWinnerElement.options[1].value)
    ) {
      g104gameLoserFullName = g104matchWinnerElement.options[1].label;
      g104gameLoserId = parseInt(g104matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g104matchId} loser is ${g104gameLoserFullName} ID ${g104gameLoserId}`
      );
    }

    /* Save */
    // match_id 104 save match results
    matchData[3].winner = g104matchWinnerId;
    matchData[3].loser = g104gameLoserId;
    matchData[3].score_id = g104matchScore;
    // clear gameTable selection to 0
    g104gameTableElement.options[0].selected = true;
    // send match_id 104 to API
    saveMatch(matchData[3]);

    /* Move match 104 Winner to new match 110 as player 2*/
    // save to Object
    matchData[9].player2 = g104matchWinnerId;
    // set cell value to player first- and lastname
    g110player2Element.innerText = findPlayer(
      g104matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g110matchWinnerElement.options[2] = new Option(
      findPlayer(g104matchWinnerId, registrationData).fullName,
      g104matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[9]);

    /* Move match 104 Loser to new match 113 as player 1 */
    // save to Object
    matchData[12].player1 = g104gameLoserId;
    // set cell value to player first- and lastname
    g113player1Element.innerText = findPlayer(
      g104gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g113matchWinnerElement.options[1] = new Option(
      findPlayer(g104gameLoserId, registrationData).fullName,
      g104gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[12]);

    console.table(matchData);
  });

  /*****         *****/
  /* Game 105 -> 3 vs 14 */
  /*****         *****/
  const g105player1Element = document.getElementById('105player1');
  const g105player2Element = document.getElementById('105player2');
  const g105gameTableElement = document.getElementById('105gameTable');
  const g105matchWinnerElement = document.getElementById('105matchWinner');
  const g105matchScoreElement = document.getElementById('105matchScore');
  const g105Player1Id = registrationData[2].person_id;
  const g105Player2Id = registrationData[13].person_id;

  // set title as player id
  g105player1Element.title = g105Player1Id;
  g105player2Element.title = g105Player2Id;
  // set cell value to player first- and lastname
  g105player1Element.innerText = findPlayer(
    g105Player1Id,
    registrationData
  ).fullName;
  g105player2Element.innerText = findPlayer(
    g105Player2Id,
    registrationData
  ).fullName;
  // set dropdown options to player first- and lastname, add player id as value
  g105matchWinnerElement.options[1] = new Option(
    findPlayer(g105Player1Id, registrationData).fullName,
    g105Player1Id,
    false,
    false
  );
  g105matchWinnerElement.options[2] = new Option(
    findPlayer(g105Player2Id, registrationData).fullName,
    g105Player2Id,
    false,
    false
  );
  // if winner available in API, select winner in dropdown
  if (
    matchData[4].winner === parseInt(g105matchWinnerElement.options[1].value)
  ) {
    g105matchWinnerElement.options[1].selected = true;
    g105matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  if (
    matchData[4].winner === parseInt(g105matchWinnerElement.options[2].value)
  ) {
    g105matchWinnerElement.options[2].selected = true;
    g105matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  // match_id 105 save data Object
  matchData[4].player1 = g105Player1Id;
  matchData[4].player2 = g105Player2Id;

  /* add addEventListener to match 105 save button */
  document.getElementById('saveMatch105').addEventListener('click', () => {
    let g105matchId = document.getElementById('105').cells[0].innerText;
    let g105matchWinnerFullName =
      g105matchWinnerElement.options[g105matchWinnerElement.selectedIndex]
        .label;
    let g105matchWinnerId = parseInt(
      g105matchWinnerElement.options[g105matchWinnerElement.selectedIndex].value
    );
    let g105matchScore = parseInt(
      g105matchScoreElement.options[g105matchScoreElement.selectedIndex].value
    );
    let g105gameLoserFullName = '';
    let g105gameLoserId = null;
    console.log(
      `GameID ${g105matchId} winner is ${g105matchWinnerFullName} ID ${g105matchWinnerId}`
    );

    /* Check Game 105 loser */
    if (
      g105matchWinnerId !== parseInt(g105matchWinnerElement.options[2].value)
    ) {
      g105gameLoserFullName = g105matchWinnerElement.options[2].label;
      g105gameLoserId = parseInt(g105matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g105matchId} loser is ${g105gameLoserFullName} ID ${g105gameLoserId}`
      );
    }
    if (
      g105matchWinnerId !== parseInt(g105matchWinnerElement.options[1].value)
    ) {
      g105gameLoserFullName = g105matchWinnerElement.options[1].label;
      g105gameLoserId = parseInt(g105matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g105matchId} loser is ${g105gameLoserFullName} ID ${g105gameLoserId}`
      );
    }

    /* Save */
    // match_id 105 save match results
    matchData[4].winner = g105matchWinnerId;
    matchData[4].loser = g105gameLoserId;
    matchData[4].score_id = g105matchScore;
    // clear gameTable selection to 0
    g105gameTableElement.options[0].selected = true;
    // send match_id 105 to API
    saveMatch(matchData[4]);

    /* Move match 105 Winner to new match 111 as player 1*/
    // save to Object
    matchData[10].player1 = g105matchWinnerId;
    // set cell value to player first- and lastname
    g111player1Element.innerText = findPlayer(
      g105matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g111matchWinnerElement.options[1] = new Option(
      findPlayer(g105matchWinnerId, registrationData).fullName,
      g105matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[10]);

    /* Move match 105 Loser to new match 116 as player 2 */
    // save to Object
    matchData[15].player2 = g105gameLoserId;
    // set cell value to player first- and lastname
    g116player2Element.innerText = findPlayer(
      g105gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g116matchWinnerElement.options[2] = new Option(
      findPlayer(g105gameLoserId, registrationData).fullName,
      g105gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[15]);

    console.table(matchData);
  });

  /*****         *****/
  /* Game 106 -> 11 vs 6 */
  /*****         *****/
  const g106player1Element = document.getElementById('106player1');
  const g106player2Element = document.getElementById('106player2');
  const g106gameTableElement = document.getElementById('106gameTable');
  const g106matchWinnerElement = document.getElementById('106matchWinner');
  const g106matchScoreElement = document.getElementById('106matchScore');
  const g106Player1Id = registrationData[10].person_id;
  const g106Player2Id = registrationData[5].person_id;

  // set title as player id
  g106player1Element.title = g106Player1Id;
  g106player2Element.title = g106Player2Id;
  // set cell value to player first- and lastname
  g106player1Element.innerText = findPlayer(
    g106Player1Id,
    registrationData
  ).fullName;
  g106player2Element.innerText = findPlayer(
    g106Player2Id,
    registrationData
  ).fullName;
  // set dropdown options to player first- and lastname, add player id as value
  g106matchWinnerElement.options[1] = new Option(
    findPlayer(g106Player1Id, registrationData).fullName,
    g106Player1Id,
    false,
    false
  );
  g106matchWinnerElement.options[2] = new Option(
    findPlayer(g106Player2Id, registrationData).fullName,
    g106Player2Id,
    false,
    false
  );
  // if winner available in API, select winner in dropdown
  if (
    matchData[5].winner === parseInt(g106matchWinnerElement.options[1].value)
  ) {
    g106matchWinnerElement.options[1].selected = true;
    g106matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  if (
    matchData[5].winner === parseInt(g106matchWinnerElement.options[2].value)
  ) {
    g106matchWinnerElement.options[2].selected = true;
    g106matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  // match_id 106 save data Object
  matchData[5].player1 = g106Player1Id;
  matchData[5].player2 = g106Player2Id;

  /* add addEventListener to match 106 save button */
  document.getElementById('saveMatch106').addEventListener('click', () => {
    let g106matchId = document.getElementById('106').cells[0].innerText;
    let g106matchWinnerFullName =
      g106matchWinnerElement.options[g106matchWinnerElement.selectedIndex]
        .label;
    let g106matchWinnerId = parseInt(
      g106matchWinnerElement.options[g106matchWinnerElement.selectedIndex].value
    );
    let g106matchScore = parseInt(
      g106matchScoreElement.options[g106matchScoreElement.selectedIndex].value
    );
    let g106gameLoserFullName = '';
    let g106gameLoserId = null;
    console.log(
      `GameID ${g106matchId} winner is ${g106matchWinnerFullName} ID ${g106matchWinnerId}`
    );

    /* Check Game 106 loser */
    if (
      g106matchWinnerId !== parseInt(g106matchWinnerElement.options[2].value)
    ) {
      g106gameLoserFullName = g106matchWinnerElement.options[2].label;
      g106gameLoserId = parseInt(g106matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g106matchId} loser is ${g106gameLoserFullName} ID ${g106gameLoserId}`
      );
    }
    if (
      g106matchWinnerId !== parseInt(g106matchWinnerElement.options[1].value)
    ) {
      g106gameLoserFullName = g106matchWinnerElement.options[1].label;
      g106gameLoserId = parseInt(g106matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g106matchId} loser is ${g106gameLoserFullName} ID ${g106gameLoserId}`
      );
    }

    // match_id 106 save match results
    /* Save */
    // match_id 106 save match results
    matchData[5].winner = g106matchWinnerId;
    matchData[5].loser = g106gameLoserId;
    matchData[5].score_id = g106matchScore;
    // clear gameTable selection to 0
    g106gameTableElement.options[0].selected = true;
    // send match_id 106 to API
    saveMatch(matchData[5]);

    /* Move match 106 Winner to new match 111 as player 2 */
    // save to Object
    matchData[10].player2 = g106matchWinnerId;
    // set cell value to player first- and lastname
    g111player2Element.innerText = findPlayer(
      g106matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g111matchWinnerElement.options[2] = new Option(
      findPlayer(g106matchWinnerId, registrationData).fullName,
      g106matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[10]);

    /* Move match 106 Loser to new match 116 as player 1 */
    // save to Object
    matchData[15].player1 = g106gameLoserId;
    // set cell value to player first- and lastname
    g116player1Element.innerText = findPlayer(
      g106gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g116matchWinnerElement.options[1] = new Option(
      findPlayer(g106gameLoserId, registrationData).fullName,
      g106gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[15]);

    console.table(matchData);
  });

  /*****         *****/
  /* Game 107 -> 7 vs 10 */
  /*****         *****/
  const g107player1Element = document.getElementById('107player1');
  const g107player2Element = document.getElementById('107player2');
  const g107gameTableElement = document.getElementById('107gameTable');
  const g107matchWinnerElement = document.getElementById('107matchWinner');
  const g107matchScoreElement = document.getElementById('107matchScore');
  const g107Player1Id = registrationData[6].person_id;
  const g107Player2Id = registrationData[9].person_id;

  // set title as player id
  g107player1Element.title = g107Player1Id;
  g107player2Element.title = g107Player2Id;
  // set cell value to player first- and lastname
  g107player1Element.innerText = findPlayer(
    g107Player1Id,
    registrationData
  ).fullName;
  g107player2Element.innerText = findPlayer(
    g107Player2Id,
    registrationData
  ).fullName;
  // set dropdown options to player first- and lastname, add player id as value
  g107matchWinnerElement.options[1] = new Option(
    findPlayer(g107Player1Id, registrationData).fullName,
    g107Player1Id,
    false,
    false
  );
  g107matchWinnerElement.options[2] = new Option(
    findPlayer(g107Player2Id, registrationData).fullName,
    g107Player2Id,
    false,
    false
  );
  // if winner available in API, select winner in dropdown
  if (
    matchData[6].winner === parseInt(g107matchWinnerElement.options[1].value)
  ) {
    g107matchWinnerElement.options[1].selected = true;
    g107matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  if (
    matchData[6].winner === parseInt(g107matchWinnerElement.options[2].value)
  ) {
    g107matchWinnerElement.options[2].selected = true;
    g107matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  // match_id 107 save data Object
  matchData[6].player1 = g107Player1Id;
  matchData[6].player2 = g107Player2Id;

  /* add addEventListener to match 107 save button */
  document.getElementById('saveMatch107').addEventListener('click', () => {
    let g107matchId = document.getElementById('107').cells[0].innerText;
    let g107matchWinnerFullName =
      g107matchWinnerElement.options[g107matchWinnerElement.selectedIndex]
        .label;
    let g107matchWinnerId = parseInt(
      g107matchWinnerElement.options[g107matchWinnerElement.selectedIndex].value
    );
    let g107matchScore = parseInt(
      g107matchScoreElement.options[g107matchScoreElement.selectedIndex].value
    );
    let g107gameLoserFullName = '';
    let g107gameLoserId = null;
    console.log(
      `GameID ${g107matchId} winner is ${g107matchWinnerFullName} ID ${g107matchWinnerId}`
    );

    /* Check Game 107 loser */
    if (
      g107matchWinnerId !== parseInt(g107matchWinnerElement.options[2].value)
    ) {
      g107gameLoserFullName = g107matchWinnerElement.options[2].label;
      g107gameLoserId = parseInt(g107matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g107matchId} loser is ${g107gameLoserFullName} ID ${g107gameLoserId}`
      );
    }
    if (
      g107matchWinnerId !== parseInt(g107matchWinnerElement.options[1].value)
    ) {
      g107gameLoserFullName = g107matchWinnerElement.options[1].label;
      g107gameLoserId = parseInt(g107matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g107matchId} loser is ${g107gameLoserFullName} ID ${g107gameLoserId}`
      );
    }

    /* Save */
    // match_id 107 save match results
    matchData[6].winner = g107matchWinnerId;
    matchData[6].loser = g107gameLoserId;
    matchData[6].score_id = g107matchScore;
    // clear gameTable selection to 0
    g107gameTableElement.options[0].selected = true;
    // send match_id 107 to API
    saveMatch(matchData[6]);

    /* Move match 107 Winner to new match 112 as player 1 */
    // save to Object
    matchData[11].player1 = g107matchWinnerId;
    // set cell value to player first- and lastname
    g112player1Element.innerText = findPlayer(
      g107matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g112matchWinnerElement.options[1] = new Option(
      findPlayer(g107matchWinnerId, registrationData).fullName,
      g107matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[11]);

    /* Move match 107 Loser to new match 115 as player 2 */
    // save to Object
    matchData[14].player2 = g107gameLoserId;
    // set cell value to player first- and lastname
    g115player2Element.innerText = findPlayer(
      g107gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g115matchWinnerElement.options[2] = new Option(
      findPlayer(g107gameLoserId, registrationData).fullName,
      g107gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[14]);

    console.table(matchData);
  });

  /*****         *****/
  /* Game 108 -> 15 vs 2 */
  /*****         *****/
  const g108player1Element = document.getElementById('108player1');
  const g108player2Element = document.getElementById('108player2');
  const g108gameTableElement = document.getElementById('108gameTable');
  const g108matchWinnerElement = document.getElementById('108matchWinner');
  const g108matchScoreElement = document.getElementById('108matchScore');
  const g108Player1Id = registrationData[14].person_id;
  const g108Player2Id = registrationData[1].person_id;

  // set title as player id
  g108player1Element.title = g108Player1Id;
  g108player2Element.title = g108Player2Id;
  // set cell value to player first- and lastname
  g108player1Element.innerText = findPlayer(
    g108Player1Id,
    registrationData
  ).fullName;
  g108player2Element.innerText = findPlayer(
    g108Player2Id,
    registrationData
  ).fullName;
  // set dropdown options to player first- and lastname, add player id as value
  g108matchWinnerElement.options[1] = new Option(
    findPlayer(g108Player1Id, registrationData).fullName,
    g108Player1Id,
    false,
    false
  );
  g108matchWinnerElement.options[2] = new Option(
    findPlayer(g108Player2Id, registrationData).fullName,
    g108Player2Id,
    false,
    false
  );
  // if winner available in API, select winner in dropdown
  if (
    matchData[7].winner === parseInt(g108matchWinnerElement.options[1].value)
  ) {
    g108matchWinnerElement.options[1].selected = true;
    g108matchScoreElement.options[matchData[7].score_id].selected = true;
  }

  if (
    matchData[7].winner === parseInt(g108matchWinnerElement.options[2].value)
  ) {
    g108matchWinnerElement.options[2].selected = true;
    g108matchScoreElement.options[matchData[7].score_id].selected = true;
  }

  // match_id 108 save data Object
  matchData[7].player1 = g108Player1Id;
  matchData[7].player2 = g108Player2Id;

  /* add addEventListener to match 108 save button */
  document.getElementById('saveMatch108').addEventListener('click', () => {
    let g108matchId = document.getElementById('108').cells[0].innerText;
    let g108matchWinnerFullName =
      g108matchWinnerElement.options[g108matchWinnerElement.selectedIndex]
        .label;
    let g108matchWinnerId = parseInt(
      g108matchWinnerElement.options[g108matchWinnerElement.selectedIndex].value
    );
    let g108matchScore = parseInt(
      g108matchScoreElement.options[g108matchScoreElement.selectedIndex].value
    );
    let g108gameLoserFullName = '';
    let g108gameLoserId = null;
    console.log(
      `GameID ${g108matchId} winner is ${g108matchWinnerFullName} ID ${g108matchWinnerId}`
    );

    /* Check Game 108 loser */
    if (
      g108matchWinnerId !== parseInt(g108matchWinnerElement.options[2].value)
    ) {
      g108gameLoserFullName = g108matchWinnerElement.options[2].label;
      g108gameLoserId = parseInt(g108matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g108matchId} loser is ${g108gameLoserFullName} ID ${g108gameLoserId}`
      );
    }
    if (
      g108matchWinnerId !== parseInt(g108matchWinnerElement.options[1].value)
    ) {
      g108gameLoserFullName = g108matchWinnerElement.options[1].label;
      g108gameLoserId = parseInt(g108matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g108matchId} loser is ${g108gameLoserFullName} ID ${g108gameLoserId}`
      );
    }

    /* Save */
    // match_id 108 save match results
    matchData[7].winner = g108matchWinnerId;
    matchData[7].loser = g108gameLoserId;
    matchData[7].score_id = g108matchScore;
    // clear gameTable selection to 0
    g108gameTableElement.options[0].selected = true;
    // send match_id 108 to API
    saveMatch(matchData[7]);

    /* Move match 108 Winner to new match 112 as player 2*/
    // save to Object
    matchData[11].player2 = g108matchWinnerId;
    // set cell value to player first- and lastname
    g112player2Element.innerText = findPlayer(
      g108matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g112matchWinnerElement.options[2] = new Option(
      findPlayer(g108matchWinnerId, registrationData).fullName,
      g108matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[11]);

    /* Move match 108 Loser to new match 115 as player 1 */
    // save to Object
    matchData[14].player1 = g108gameLoserId;
    // set cell value to player first- and lastname
    g115player1Element.innerText = findPlayer(
      g108gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g115matchWinnerElement.options[1] = new Option(
      findPlayer(g108gameLoserId, registrationData).fullName,
      g108gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[14]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 109  ***/
  /*****         *****/
  const g109player1Element = document.getElementById('109player1');
  const g109player2Element = document.getElementById('109player2');
  const g109gameTableElement = document.getElementById('109gameTable');
  const g109matchWinnerElement = document.getElementById('109matchWinner');
  const g109matchScoreElement = document.getElementById('109matchScore');
  const g109Player1Id = matchData[8].player1;
  const g109Player2Id = matchData[8].player2;

  if (typeof g109Player1Id !== 'number' && typeof g109Player2Id !== 'number') {
    g109player1Element.innerText = '';
    g109player1Element.title = '';
    g109matchWinnerElement.options[1] = new Option('', '', false, false);
    g109player2Element.innerText = '';
    g109player2Element.title = '';
    g109matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g109Player1Id === 'number' && typeof g109Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g109player1Element.innerText = findPlayer(
      g109Player1Id,
      registrationData
    ).fullName;
    g109player1Element.title = g109Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g109matchWinnerElement.options[1] = new Option(
      findPlayer(g109Player1Id, registrationData).fullName,
      g109Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g109player2Element.innerText = findPlayer(
      g109Player2Id,
      registrationData
    ).fullName;
    g109player2Element.title = g109Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g109matchWinnerElement.options[2] = new Option(
      findPlayer(g109Player2Id, registrationData).fullName,
      g109Player2Id,
      false,
      false
    );
    if (g109Player1Id === matchData[8].winner) {
      // if player 1 winner, then select it from dropdown menu
      g109matchWinnerElement.options[1].selected = true;
      g109matchScoreElement.options[matchData[8].score_id].selected = true;
    }

    if (g109Player2Id === matchData[8].winner) {
      // if player 2 winner, then select it from dropdown menu
      g109matchWinnerElement.options[2].selected = true;
      g109matchScoreElement.options[matchData[8].score_id].selected = true;
    }
  }

  /* add addEventListener to match 109 save button */
  document.getElementById('saveMatch109').addEventListener('click', () => {
    let g109matchId = document.getElementById('109').cells[0].innerText;
    let g109matchWinnerFullName =
      g109matchWinnerElement.options[g109matchWinnerElement.selectedIndex]
        .label;
    let g109matchWinnerId = parseInt(
      g109matchWinnerElement.options[g109matchWinnerElement.selectedIndex].value
    );
    let g109matchScore = parseInt(
      g109matchScoreElement.options[g109matchScoreElement.selectedIndex].value
    );
    let g109gameLoserFullName = '';
    let g109gameLoserId = null;
    console.log(
      `GameID ${g109matchId} winner is ${g109matchWinnerFullName} ID ${g109matchWinnerId}`
    );

    /* Check Game 109 loser */
    if (
      g109matchWinnerId !== parseInt(g109matchWinnerElement.options[2].value)
    ) {
      g109gameLoserFullName = g109matchWinnerElement.options[2].label;
      g109gameLoserId = parseInt(g109matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g109matchId} loser is ${g109gameLoserFullName} ID ${g109gameLoserId}`
      );
    }
    if (
      g109matchWinnerId !== parseInt(g109matchWinnerElement.options[1].value)
    ) {
      g109gameLoserFullName = g109matchWinnerElement.options[1].label;
      g109gameLoserId = parseInt(g109matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g109matchId} loser is ${g109gameLoserFullName} ID ${g109gameLoserId}`
      );
    }

    /* Save */
    // match_id 109 save match results
    matchData[8].winner = g109matchWinnerId;
    matchData[8].loser = g109gameLoserId;
    matchData[8].score_id = g109matchScore;
    // clear gameTable selection to 0
    g109gameTableElement.options[0].selected = true;
    // send match_id 109 to API
    saveMatch(matchData[8]);

    /* Move match 109 Winner to new match 117 as player 1*/
    // save to Object
    matchData[16].player1 = g109matchWinnerId;
    // set cell value to player first- and lastname
    g117player1Element.innerText = findPlayer(
      g109matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g117matchWinnerElement.options[1] = new Option(
      findPlayer(g109matchWinnerId, registrationData).fullName,
      g109matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[16]);

    /* Move match 109 Loser to new match 122 as player 2 */
    // save to Object
    matchData[21].player2 = g109gameLoserId;
    // set cell value to player first- and lastname
    g122player2Element.innerText = findPlayer(
      g109gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g122matchWinnerElement.options[2] = new Option(
      findPlayer(g109gameLoserId, registrationData).fullName,
      g109gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[21]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 110  ***/
  /*****         *****/
  const g110player1Element = document.getElementById('110player1');
  const g110player2Element = document.getElementById('110player2');
  const g110gameTableElement = document.getElementById('110gameTable');
  const g110matchWinnerElement = document.getElementById('110matchWinner');
  const g110matchScoreElement = document.getElementById('110matchScore');
  const g110Player1Id = matchData[9].player1;
  const g110Player2Id = matchData[9].player2;

  if (typeof g110Player1Id !== 'number' && typeof g110Player2Id !== 'number') {
    g110player1Element.innerText = '';
    g110player1Element.title = '';
    g110matchWinnerElement.options[1] = new Option('', '', false, false);
    g110player2Element.innerText = '';
    g110player2Element.title = '';
    g110matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g110Player1Id === 'number' && typeof g110Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g110player1Element.innerText = findPlayer(
      g110Player1Id,
      registrationData
    ).fullName;
    g110player1Element.title = g110Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g110matchWinnerElement.options[1] = new Option(
      findPlayer(g110Player1Id, registrationData).fullName,
      g110Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g110player2Element.innerText = findPlayer(
      g110Player2Id,
      registrationData
    ).fullName;
    g110player2Element.title = g110Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g110matchWinnerElement.options[2] = new Option(
      findPlayer(g110Player2Id, registrationData).fullName,
      g110Player2Id,
      false,
      false
    );
    if (g110Player1Id === matchData[9].winner) {
      // if player 1 winner, then select it from dropdown menu
      g110matchWinnerElement.options[1].selected = true;
      g110matchScoreElement.options[matchData[9].score_id].selected = true;
    }

    if (g110Player2Id === matchData[9].winner) {
      // if player 2 winner, then select it from dropdown menu
      g110matchWinnerElement.options[2].selected = true;
      g110matchScoreElement.options[matchData[9].score_id].selected = true;
    }
  }
  /* add addEventListener to match 110 save button */
  document.getElementById('saveMatch110').addEventListener('click', () => {
    let g110matchId = document.getElementById('110').cells[0].innerText;
    let g110matchWinnerFullName =
      g110matchWinnerElement.options[g110matchWinnerElement.selectedIndex]
        .label;
    let g110matchWinnerId = parseInt(
      g110matchWinnerElement.options[g110matchWinnerElement.selectedIndex].value
    );
    let g110matchScore = parseInt(
      g110matchScoreElement.options[g110matchScoreElement.selectedIndex].value
    );
    let g110gameLoserFullName = '';
    let g110gameLoserId = null;
    console.log(
      `GameID ${g110matchId} winner is ${g110matchWinnerFullName} ID ${g110matchWinnerId}`
    );

    /* Check Game 110 loser */
    if (
      g110matchWinnerId !== parseInt(g110matchWinnerElement.options[2].value)
    ) {
      g110gameLoserFullName = g110matchWinnerElement.options[2].label;
      g110gameLoserId = parseInt(g110matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g110matchId} loser is ${g110gameLoserFullName} ID ${g110gameLoserId}`
      );
    }
    if (
      g110matchWinnerId !== parseInt(g110matchWinnerElement.options[1].value)
    ) {
      g110gameLoserFullName = g110matchWinnerElement.options[1].label;
      g110gameLoserId = parseInt(g110matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g110matchId} loser is ${g110gameLoserFullName} ID ${g110gameLoserId}`
      );
    }

    /* Save */
    // match_id 110 save match results
    matchData[9].winner = g110matchWinnerId;
    matchData[9].loser = g110gameLoserId;
    matchData[9].score_id = g110matchScore;
    // clear gameTable selection to 0
    g110gameTableElement.options[0].selected = true;
    // send match_id 110 to API
    saveMatch(matchData[9]);

    /* Move match 110 Winner to new match 117 as player 2*/
    // save to Object
    matchData[16].player2 = g110matchWinnerId;
    // set cell value to player first- and lastname
    g117player2Element.innerText = findPlayer(
      g110matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g117matchWinnerElement.options[2] = new Option(
      findPlayer(g110matchWinnerId, registrationData).fullName,
      g110matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[16]);

    /* Move match 110 Loser to new match 121 as player 2 */
    // save to Object
    matchData[20].player2 = g110gameLoserId;
    // set cell value to player first- and lastname
    g121player2Element.innerText = findPlayer(
      g110gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g121matchWinnerElement.options[2] = new Option(
      findPlayer(g110gameLoserId, registrationData).fullName,
      g110gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[20]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 111  ***/
  /*****         *****/
  const g111player1Element = document.getElementById('111player1');
  const g111player2Element = document.getElementById('111player2');
  const g111gameTableElement = document.getElementById('111gameTable');
  const g111matchWinnerElement = document.getElementById('111matchWinner');
  const g111matchScoreElement = document.getElementById('111matchScore');
  const g111Player1Id = matchData[10].player1;
  const g111Player2Id = matchData[10].player2;

  if (typeof g111Player1Id !== 'number' && typeof g111Player2Id !== 'number') {
    g111player1Element.innerText = '';
    g111player1Element.title = '';
    g111matchWinnerElement.options[1] = new Option('', '', false, false);
    g111player2Element.innerText = '';
    g111player2Element.title = '';
    g111matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g111Player1Id === 'number' && typeof g111Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g111player1Element.innerText = findPlayer(
      g111Player1Id,
      registrationData
    ).fullName;
    g111player1Element.title = g111Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g111matchWinnerElement.options[1] = new Option(
      findPlayer(g111Player1Id, registrationData).fullName,
      g111Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g111player2Element.innerText = findPlayer(
      g111Player2Id,
      registrationData
    ).fullName;
    g111player2Element.title = g111Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g111matchWinnerElement.options[2] = new Option(
      findPlayer(g111Player2Id, registrationData).fullName,
      g111Player2Id,
      false,
      false
    );
    if (g111Player1Id === matchData[10].winner) {
      // if player 1 winner, then select it from dropdown menu
      g111matchWinnerElement.options[1].selected = true;
      g111matchScoreElement.options[matchData[10].score_id].selected = true;
    }

    if (g111Player2Id === matchData[10].winner) {
      // if player 2 winner, then select it from dropdown menu
      g111matchWinnerElement.options[2].selected = true;
      g111matchScoreElement.options[matchData[10].score_id].selected = true;
    }
  }

  /* add addEventListener to match 111 save button */
  document.getElementById('saveMatch111').addEventListener('click', () => {
    let g111matchId = document.getElementById('111').cells[0].innerText;
    let g111matchWinnerFullName =
      g111matchWinnerElement.options[g111matchWinnerElement.selectedIndex]
        .label;
    let g111matchWinnerId = parseInt(
      g111matchWinnerElement.options[g111matchWinnerElement.selectedIndex].value
    );
    let g111matchScore = parseInt(
      g111matchScoreElement.options[g111matchScoreElement.selectedIndex].value
    );
    let g111gameLoserFullName = '';
    let g111gameLoserId = null;
    console.log(
      `GameID ${g111matchId} winner is ${g111matchWinnerFullName} ID ${g111matchWinnerId}`
    );

    /* Check Game 111 loser */
    if (
      g111matchWinnerId !== parseInt(g111matchWinnerElement.options[2].value)
    ) {
      g111gameLoserFullName = g111matchWinnerElement.options[2].label;
      g111gameLoserId = parseInt(g111matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g111matchId} loser is ${g111gameLoserFullName} ID ${g111gameLoserId}`
      );
    }
    if (
      g111matchWinnerId !== parseInt(g111matchWinnerElement.options[1].value)
    ) {
      g111gameLoserFullName = g111matchWinnerElement.options[1].label;
      g111gameLoserId = parseInt(g111matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g111matchId} loser is ${g111gameLoserFullName} ID ${g111gameLoserId}`
      );
    }

    /* Save */
    // match_id 111 save match results
    matchData[10].winner = g111matchWinnerId;
    matchData[10].loser = g111gameLoserId;
    matchData[10].score_id = g111matchScore;
    // clear gameTable selection to 0
    g111gameTableElement.options[0].selected = true;
    // send match_id 111 to API
    saveMatch(matchData[10]);

    /* Move match 111 Winner to new match 118 as player 1*/
    // save to Object
    matchData[17].player1 = g111matchWinnerId;
    // set cell value to player first- and lastname
    g118player1Element.innerText = findPlayer(
      g111matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g118matchWinnerElement.options[1] = new Option(
      findPlayer(g111matchWinnerId, registrationData).fullName,
      g111matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[17]);

    /* Move match 111 Loser to new match 120 as player 2 */
    // save to Object
    matchData[19].player2 = g111gameLoserId;
    // set cell value to player first- and lastname
    g120player2Element.innerText = findPlayer(
      g111gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g120matchWinnerElement.options[2] = new Option(
      findPlayer(g111gameLoserId, registrationData).fullName,
      g111gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[19]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 112  ***/
  /*****         *****/
  const g112player1Element = document.getElementById('112player1');
  const g112player2Element = document.getElementById('112player2');
  const g112gameTableElement = document.getElementById('112gameTable');
  const g112matchWinnerElement = document.getElementById('112matchWinner');
  const g112matchScoreElement = document.getElementById('112matchScore');
  const g112Player1Id = matchData[11].player1;
  const g112Player2Id = matchData[11].player2;

  if (typeof g112Player1Id !== 'number' && typeof g112Player2Id !== 'number') {
    g112player1Element.innerText = '';
    g112player1Element.title = '';
    g112matchWinnerElement.options[1] = new Option('', '', false, false);
    g112player2Element.innerText = '';
    g112player2Element.title = '';
    g112matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g112Player1Id === 'number' && typeof g112Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g112player1Element.innerText = findPlayer(
      g112Player1Id,
      registrationData
    ).fullName;
    g112player1Element.title = g112Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g112matchWinnerElement.options[1] = new Option(
      findPlayer(g112Player1Id, registrationData).fullName,
      g112Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g112player2Element.innerText = findPlayer(
      g112Player2Id,
      registrationData
    ).fullName;
    g112player2Element.title = g112Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g112matchWinnerElement.options[2] = new Option(
      findPlayer(g112Player2Id, registrationData).fullName,
      g112Player2Id,
      false,
      false
    );
    if (g112Player1Id === matchData[11].winner) {
      // if player 1 winner, then select it from dropdown menu
      g112matchWinnerElement.options[1].selected = true;
      g112matchScoreElement.options[matchData[11].score_id].selected = true;
    }

    if (g112Player2Id === matchData[11].winner) {
      // if player 2 winner, then select it from dropdown menu
      g112matchWinnerElement.options[2].selected = true;
      g112matchScoreElement.options[matchData[11].score_id].selected = true;
    }
  }

  /* add addEventListener to match 112 save button */
  document.getElementById('saveMatch112').addEventListener('click', () => {
    let g112matchId = document.getElementById('112').cells[0].innerText;
    let g112matchWinnerFullName =
      g112matchWinnerElement.options[g112matchWinnerElement.selectedIndex]
        .label;
    let g112matchWinnerId = parseInt(
      g112matchWinnerElement.options[g112matchWinnerElement.selectedIndex].value
    );
    let g112matchScore = parseInt(
      g112matchScoreElement.options[g112matchScoreElement.selectedIndex].value
    );
    let g112gameLoserFullName = '';
    let g112gameLoserId = null;
    console.log(
      `GameID ${g112matchId} winner is ${g112matchWinnerFullName} ID ${g112matchWinnerId}`
    );

    /* Check Game 112 loser */
    if (
      g112matchWinnerId !== parseInt(g112matchWinnerElement.options[2].value)
    ) {
      g112gameLoserFullName = g112matchWinnerElement.options[2].label;
      g112gameLoserId = parseInt(g112matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g112matchId} loser is ${g112gameLoserFullName} ID ${g112gameLoserId}`
      );
    }
    if (
      g112matchWinnerId !== parseInt(g112matchWinnerElement.options[1].value)
    ) {
      g112gameLoserFullName = g112matchWinnerElement.options[1].label;
      g112gameLoserId = parseInt(g112matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g112matchId} loser is ${g112gameLoserFullName} ID ${g112gameLoserId}`
      );
    }

    /* Save */
    // match_id 112 save match results
    matchData[11].winner = g112matchWinnerId;
    matchData[11].loser = g112gameLoserId;
    matchData[11].score_id = g112matchScore;
    // clear gameTable selection to 0
    g112gameTableElement.options[0].selected = true;
    // send match_id 112 to API
    saveMatch(matchData[11]);

    /* Move match 112 Winner to new match 118 as player 2 */
    // save to Object
    matchData[17].player2 = g112matchWinnerId;
    // set cell value to player first- and lastname
    g118player2Element.innerText = findPlayer(
      g112matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g118matchWinnerElement.options[2] = new Option(
      findPlayer(g112matchWinnerId, registrationData).fullName,
      g112matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[17]);

    /* Move match 112 Loser to new match 119 as player 2 */
    // save to Object
    matchData[18].player2 = g112gameLoserId;
    // set cell value to player first- and lastname
    g119player2Element.innerText = findPlayer(
      g112gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g119matchWinnerElement.options[2] = new Option(
      findPlayer(g112gameLoserId, registrationData).fullName,
      g112gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[18]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 113  ***/
  /*****         *****/
  const g113player1Element = document.getElementById('113player1');
  const g113player2Element = document.getElementById('113player2');
  const g113gameTableElement = document.getElementById('113gameTable');
  const g113matchWinnerElement = document.getElementById('113matchWinner');
  const g113matchScoreElement = document.getElementById('113matchScore');
  const g113Player1Id = matchData[12].player1;
  const g113Player2Id = matchData[12].player2;

  if (typeof g113Player1Id !== 'number' && typeof g113Player2Id !== 'number') {
    g113player1Element.innerText = '';
    g113player1Element.title = '';
    g113matchWinnerElement.options[1] = new Option('', '', false, false);
    g113player2Element.innerText = '';
    g113player2Element.title = '';
    g113matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g113Player1Id === 'number' && typeof g113Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g113player1Element.innerText = findPlayer(
      g113Player1Id,
      registrationData
    ).fullName;
    g113player1Element.title = g113Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g113matchWinnerElement.options[1] = new Option(
      findPlayer(g113Player1Id, registrationData).fullName,
      g113Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g113player2Element.innerText = findPlayer(
      g113Player2Id,
      registrationData
    ).fullName;
    g113player2Element.title = g113Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g113matchWinnerElement.options[2] = new Option(
      findPlayer(g113Player2Id, registrationData).fullName,
      g113Player2Id,
      false,
      false
    );
    if (g113Player1Id === matchData[12].winner) {
      // if player 1 winner, then select it from dropdown menu
      g113matchWinnerElement.options[1].selected = true;
      g113matchScoreElement.options[matchData[12].score_id].selected = true;
    }

    if (g113Player2Id === matchData[12].winner) {
      // if player 2 winner, then select it from dropdown menu
      g113matchWinnerElement.options[2].selected = true;
      g113matchScoreElement.options[matchData[12].score_id].selected = true;
    }
  }

  /* add addEventListener to match 113 save button */
  document.getElementById('saveMatch113').addEventListener('click', () => {
    let g113matchId = document.getElementById('113').cells[0].innerText;
    let g113matchWinnerFullName =
      g113matchWinnerElement.options[g113matchWinnerElement.selectedIndex]
        .label;
    let g113matchWinnerId = parseInt(
      g113matchWinnerElement.options[g113matchWinnerElement.selectedIndex].value
    );
    let g113matchScore = parseInt(
      g113matchScoreElement.options[g113matchScoreElement.selectedIndex].value
    );
    let g113gameLoserFullName = '';
    let g113gameLoserId = null;
    console.log(
      `GameID ${g113matchId} winner is ${g113matchWinnerFullName} ID ${g113matchWinnerId}`
    );

    /* Check Game 113 loser */
    if (
      g113matchWinnerId !== parseInt(g113matchWinnerElement.options[2].value)
    ) {
      g113gameLoserFullName = g113matchWinnerElement.options[2].label;
      g113gameLoserId = parseInt(g113matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g113matchId} loser is ${g113gameLoserFullName} ID ${g113gameLoserId}`
      );
    }
    if (
      g113matchWinnerId !== parseInt(g113matchWinnerElement.options[1].value)
    ) {
      g113gameLoserFullName = g113matchWinnerElement.options[1].label;
      g113gameLoserId = parseInt(g113matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g113matchId} loser is ${g113gameLoserFullName} ID ${g113gameLoserId}`
      );
    }

    /* Save */
    // match_id 113 save match results
    matchData[12].winner = g113matchWinnerId;
    matchData[12].loser = g113gameLoserId;
    matchData[12].score_id = g113matchScore;
    // clear gameTable selection to 0
    g113gameTableElement.options[0].selected = true;
    // send match_id 113 to API
    saveMatch(matchData[12]);

    /* Move match 113 Winner to new match 119 as player 1*/
    // save to Object
    matchData[18].player1 = g113matchWinnerId;
    // set cell value to player first- and lastname
    g119player1Element.innerText = findPlayer(
      g113matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g119matchWinnerElement.options[1] = new Option(
      findPlayer(g113matchWinnerId, registrationData).fullName,
      g113matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[18]);

    /* Move match 113 Loser to new match 123 as player 1 */
    // save to Object
    matchData[22].player1 = g113gameLoserId;
    // set cell value to player first- and lastname
    g123player1Element.innerText = findPlayer(
      g113gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g123matchWinnerElement.options[1] = new Option(
      findPlayer(g113gameLoserId, registrationData).fullName,
      g113gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[22]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 114  ***/
  /*****         *****/
  const g114player1Element = document.getElementById('114player1');
  const g114player2Element = document.getElementById('114player2');
  const g114gameTableElement = document.getElementById('114gameTable');
  const g114matchWinnerElement = document.getElementById('114matchWinner');
  const g114matchScoreElement = document.getElementById('114matchScore');
  const g114Player1Id = matchData[13].player1;
  const g114Player2Id = matchData[13].player2;

  if (typeof g114Player1Id !== 'number' && typeof g114Player2Id !== 'number') {
    g114player1Element.innerText = '';
    g114player1Element.title = '';
    g114matchWinnerElement.options[1] = new Option('', '', false, false);
    g114player2Element.innerText = '';
    g114player2Element.title = '';
    g114matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g114Player1Id === 'number' && typeof g114Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g114player1Element.innerText = findPlayer(
      g114Player1Id,
      registrationData
    ).fullName;
    g114player1Element.title = g114Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g114matchWinnerElement.options[1] = new Option(
      findPlayer(g114Player1Id, registrationData).fullName,
      g114Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g114player2Element.innerText = findPlayer(
      g114Player2Id,
      registrationData
    ).fullName;
    g114player2Element.title = g114Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g114matchWinnerElement.options[2] = new Option(
      findPlayer(g114Player2Id, registrationData).fullName,
      g114Player2Id,
      false,
      false
    );
    if (g114Player1Id === matchData[13].winner) {
      // if player 1 winner, then select it from dropdown menu
      g114matchWinnerElement.options[1].selected = true;
      g114matchScoreElement.options[matchData[13].score_id].selected = true;
    }

    if (g114Player2Id === matchData[13].winner) {
      // if player 2 winner, then select it from dropdown menu
      g114matchWinnerElement.options[2].selected = true;
      g114matchScoreElement.options[matchData[13].score_id].selected = true;
    }
  }
  /* add addEventListener to match 114 save button */
  document.getElementById('saveMatch114').addEventListener('click', () => {
    let g114matchId = document.getElementById('114').cells[0].innerText;
    let g114matchWinnerFullName =
      g114matchWinnerElement.options[g114matchWinnerElement.selectedIndex]
        .label;
    let g114matchWinnerId = parseInt(
      g114matchWinnerElement.options[g114matchWinnerElement.selectedIndex].value
    );
    let g114matchScore = parseInt(
      g114matchScoreElement.options[g114matchScoreElement.selectedIndex].value
    );
    let g114gameLoserFullName = '';
    let g114gameLoserId = null;
    console.log(
      `GameID ${g114matchId} winner is ${g114matchWinnerFullName} ID ${g114matchWinnerId}`
    );

    /* Check Game 114 loser */
    if (
      g114matchWinnerId !== parseInt(g114matchWinnerElement.options[2].value)
    ) {
      g114gameLoserFullName = g114matchWinnerElement.options[2].label;
      g114gameLoserId = parseInt(g114matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g114matchId} loser is ${g114gameLoserFullName} ID ${g114gameLoserId}`
      );
    }
    if (
      g114matchWinnerId !== parseInt(g114matchWinnerElement.options[1].value)
    ) {
      g114gameLoserFullName = g114matchWinnerElement.options[1].label;
      g114gameLoserId = parseInt(g114matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g114matchId} loser is ${g114gameLoserFullName} ID ${g114gameLoserId}`
      );
    }

    /* Save */
    // match_id 114 save match results
    matchData[13].winner = g114matchWinnerId;
    matchData[13].loser = g114gameLoserId;
    matchData[13].score_id = g114matchScore;
    // clear gameTable selection to 0
    g114gameTableElement.options[0].selected = true;
    // send match_id 114 to API
    saveMatch(matchData[13]);

    /* Move match 114 Winner to new match 120 as player 1*/
    // save to Object
    matchData[19].player1 = g114matchWinnerId;
    // set cell value to player first- and lastname
    g120player1Element.innerText = findPlayer(
      g114matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g120matchWinnerElement.options[1] = new Option(
      findPlayer(g114matchWinnerId, registrationData).fullName,
      g114matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[19]);

    /* Move match 114 Loser to new match 123 as player 2 */
    // save to Object
    matchData[22].player2 = g114gameLoserId;
    // set cell value to player first- and lastname
    g123player2Element.innerText = findPlayer(
      g114gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g123matchWinnerElement.options[2] = new Option(
      findPlayer(g114gameLoserId, registrationData).fullName,
      g114gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[22]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 115  ***/
  /*****         *****/
  const g115player1Element = document.getElementById('115player1');
  const g115player2Element = document.getElementById('115player2');
  const g115gameTableElement = document.getElementById('115gameTable');
  const g115matchWinnerElement = document.getElementById('115matchWinner');
  const g115matchScoreElement = document.getElementById('115matchScore');
  const g115Player1Id = matchData[14].player1;
  const g115Player2Id = matchData[14].player2;

  if (typeof g115Player1Id !== 'number' && typeof g115Player2Id !== 'number') {
    g115player1Element.innerText = '';
    g115player1Element.title = '';
    g115matchWinnerElement.options[1] = new Option('', '', false, false);
    g115player2Element.innerText = '';
    g115player2Element.title = '';
    g115matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g115Player1Id === 'number' && typeof g115Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g115player1Element.innerText = findPlayer(
      g115Player1Id,
      registrationData
    ).fullName;
    g115player1Element.title = g115Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g115matchWinnerElement.options[1] = new Option(
      findPlayer(g115Player1Id, registrationData).fullName,
      g115Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g115player2Element.innerText = findPlayer(
      g115Player2Id,
      registrationData
    ).fullName;
    g115player2Element.title = g115Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g115matchWinnerElement.options[2] = new Option(
      findPlayer(g115Player2Id, registrationData).fullName,
      g115Player2Id,
      false,
      false
    );
    if (g115Player1Id === matchData[14].winner) {
      // if player 1 winner, then select it from dropdown menu
      g115matchWinnerElement.options[1].selected = true;
      g115matchScoreElement.options[matchData[14].score_id].selected = true;
    }

    if (g115Player2Id === matchData[14].winner) {
      // if player 2 winner, then select it from dropdown menu
      g115matchWinnerElement.options[2].selected = true;
      g115matchScoreElement.options[matchData[14].score_id].selected = true;
    }
  }

  /* add addEventListener to match 115 save button */
  document.getElementById('saveMatch115').addEventListener('click', () => {
    let g115matchId = document.getElementById('115').cells[0].innerText;
    let g115matchWinnerFullName =
      g115matchWinnerElement.options[g115matchWinnerElement.selectedIndex]
        .label;
    let g115matchWinnerId = parseInt(
      g115matchWinnerElement.options[g115matchWinnerElement.selectedIndex].value
    );
    let g115matchScore = parseInt(
      g115matchScoreElement.options[g115matchScoreElement.selectedIndex].value
    );
    let g115gameLoserFullName = '';
    let g115gameLoserId = null;
    console.log(
      `GameID ${g115matchId} winner is ${g115matchWinnerFullName} ID ${g115matchWinnerId}`
    );

    /* Check Game 115 loser */
    if (
      g115matchWinnerId !== parseInt(g115matchWinnerElement.options[2].value)
    ) {
      g115gameLoserFullName = g115matchWinnerElement.options[2].label;
      g115gameLoserId = parseInt(g115matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g115matchId} loser is ${g115gameLoserFullName} ID ${g115gameLoserId}`
      );
    }
    if (
      g115matchWinnerId !== parseInt(g115matchWinnerElement.options[1].value)
    ) {
      g115gameLoserFullName = g115matchWinnerElement.options[1].label;
      g115gameLoserId = parseInt(g115matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g115matchId} loser is ${g115gameLoserFullName} ID ${g115gameLoserId}`
      );
    }

    /* Save */
    // match_id 115 save match results
    matchData[14].winner = g115matchWinnerId;
    matchData[14].loser = g115gameLoserId;
    matchData[14].score_id = g115matchScore;
    // clear gameTable selection to 0
    g115gameTableElement.options[0].selected = true;
    // send match_id 115 to API
    saveMatch(matchData[14]);

    /* Move match 115 Winner to new match 121 as player 1*/
    // save to Object
    matchData[20].player1 = g115matchWinnerId;
    // set cell value to player first- and lastname
    g121player1Element.innerText = findPlayer(
      g115matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g121matchWinnerElement.options[1] = new Option(
      findPlayer(g115matchWinnerId, registrationData).fullName,
      g115matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[20]);

    /* Move match 115 Loser to new match 124 as player 1 */
    // save to Object
    matchData[23].player1 = g115gameLoserId;
    // set cell value to player first- and lastname
    g124player2Element.innerText = findPlayer(
      g115gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g124matchWinnerElement.options[1] = new Option(
      findPlayer(g115gameLoserId, registrationData).fullName,
      g115gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[23]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 116  ***/
  /*****         *****/
  const g116player1Element = document.getElementById('116player1');
  const g116player2Element = document.getElementById('116player2');
  const g116gameTableElement = document.getElementById('116gameTable');
  const g116matchWinnerElement = document.getElementById('116matchWinner');
  const g116matchScoreElement = document.getElementById('116matchScore');
  const g116Player1Id = matchData[15].player1;
  const g116Player2Id = matchData[15].player2;

  if (typeof g116Player1Id !== 'number' && typeof g116Player2Id !== 'number') {
    g116player1Element.innerText = '';
    g116player1Element.title = '';
    g116matchWinnerElement.options[1] = new Option('', '', false, false);
    g116player2Element.innerText = '';
    g116player2Element.title = '';
    g116matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g116Player1Id === 'number' && typeof g116Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g116player1Element.innerText = findPlayer(
      g116Player1Id,
      registrationData
    ).fullName;
    g116player1Element.title = g116Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g116matchWinnerElement.options[1] = new Option(
      findPlayer(g116Player1Id, registrationData).fullName,
      g116Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g116player2Element.innerText = findPlayer(
      g116Player2Id,
      registrationData
    ).fullName;
    g116player2Element.title = g116Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g116matchWinnerElement.options[2] = new Option(
      findPlayer(g116Player2Id, registrationData).fullName,
      g116Player2Id,
      false,
      false
    );
    if (g116Player1Id === matchData[15].winner) {
      // if player 1 winner, then select it from dropdown menu
      g116matchWinnerElement.options[1].selected = true;
      g116matchScoreElement.options[matchData[15].score_id].selected = true;
    }

    if (g116Player2Id === matchData[15].winner) {
      // if player 2 winner, then select it from dropdown menu
      g116matchWinnerElement.options[2].selected = true;
      g116matchScoreElement.options[matchData[15].score_id].selected = true;
    }
  }

  /* add addEventListener to match 116 save button */
  document.getElementById('saveMatch116').addEventListener('click', () => {
    let g116matchId = document.getElementById('116').cells[0].innerText;
    let g116matchWinnerFullName =
      g116matchWinnerElement.options[g116matchWinnerElement.selectedIndex]
        .label;
    let g116matchWinnerId = parseInt(
      g116matchWinnerElement.options[g116matchWinnerElement.selectedIndex].value
    );
    let g116matchScore = parseInt(
      g116matchScoreElement.options[g116matchScoreElement.selectedIndex].value
    );
    let g116gameLoserFullName = '';
    let g116gameLoserId = null;
    console.log(
      `GameID ${g116matchId} winner is ${g116matchWinnerFullName} ID ${g116matchWinnerId}`
    );

    /* Check Game 116 loser */
    if (
      g116matchWinnerId !== parseInt(g116matchWinnerElement.options[2].value)
    ) {
      g116gameLoserFullName = g116matchWinnerElement.options[2].label;
      g116gameLoserId = parseInt(g116matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g116matchId} loser is ${g116gameLoserFullName} ID ${g116gameLoserId}`
      );
    }
    if (
      g116matchWinnerId !== parseInt(g116matchWinnerElement.options[1].value)
    ) {
      g116gameLoserFullName = g116matchWinnerElement.options[1].label;
      g116gameLoserId = parseInt(g116matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g116matchId} loser is ${g116gameLoserFullName} ID ${g116gameLoserId}`
      );
    }

    /* Save */
    // match_id 116 save match results
    matchData[15].winner = g116matchWinnerId;
    matchData[15].loser = g116gameLoserId;
    matchData[15].score_id = g116matchScore;
    // clear gameTable selection to 0
    g116gameTableElement.options[0].selected = true;
    // send match_id 116 to API
    saveMatch(matchData[15]);

    /* Move match 116 Winner to new match 122 as player 1 */
    // save to Object
    matchData[21].player1 = g116matchWinnerId;
    // set cell value to player first- and lastname
    g122player1Element.innerText = findPlayer(
      g116matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g122matchWinnerElement.options[1] = new Option(
      findPlayer(g116matchWinnerId, registrationData).fullName,
      g116matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[21]);

    /* Move match 116 Loser to new match 124 as player 2 */
    // save to Object
    matchData[23].player2 = g116gameLoserId;
    // set cell value to player first- and lastname
    g124player2Element.innerText = findPlayer(
      g116gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g124matchWinnerElement.options[2] = new Option(
      findPlayer(g116gameLoserId, registrationData).fullName,
      g116gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[23]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 117  ***/
  /*****         *****/
  const g117player1Element = document.getElementById('117player1');
  const g117player2Element = document.getElementById('117player2');
  const g117gameTableElement = document.getElementById('117gameTable');
  const g117matchWinnerElement = document.getElementById('117matchWinner');
  const g117matchScoreElement = document.getElementById('117matchScore');
  const g117Player1Id = matchData[16].player1;
  const g117Player2Id = matchData[16].player2;

  if (typeof g117Player1Id !== 'number' && typeof g117Player2Id !== 'number') {
    g117player1Element.innerText = '';
    g117player1Element.title = '';
    g117matchWinnerElement.options[1] = new Option('', '', false, false);
    g117player2Element.innerText = '';
    g117player2Element.title = '';
    g117matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g117Player1Id === 'number' && typeof g117Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g117player1Element.innerText = findPlayer(
      g117Player1Id,
      registrationData
    ).fullName;
    g117player1Element.title = g117Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g117matchWinnerElement.options[1] = new Option(
      findPlayer(g117Player1Id, registrationData).fullName,
      g117Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g117player2Element.innerText = findPlayer(
      g117Player2Id,
      registrationData
    ).fullName;
    g117player2Element.title = g117Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g117matchWinnerElement.options[2] = new Option(
      findPlayer(g117Player2Id, registrationData).fullName,
      g117Player2Id,
      false,
      false
    );
    if (g117Player1Id === matchData[16].winner) {
      // if player 1 winner, then select it from dropdown menu
      g117matchWinnerElement.options[1].selected = true;
      g117matchScoreElement.options[matchData[16].score_id].selected = true;
    }

    if (g117Player2Id === matchData[8].winner) {
      // if player 2 winner, then select it from dropdown menu
      g117matchWinnerElement.options[2].selected = true;
      g117matchScoreElement.options[matchData[16].score_id].selected = true;
    }
  }

  /* add addEventListener to match 117 save button */
  document.getElementById('saveMatch117').addEventListener('click', () => {
    let g117matchId = document.getElementById('117').cells[0].innerText;
    let g117matchWinnerFullName =
      g117matchWinnerElement.options[g117matchWinnerElement.selectedIndex]
        .label;
    let g117matchWinnerId = parseInt(
      g117matchWinnerElement.options[g117matchWinnerElement.selectedIndex].value
    );
    let g117matchScore = parseInt(
      g117matchScoreElement.options[g117matchScoreElement.selectedIndex].value
    );
    let g117gameLoserFullName = '';
    let g117gameLoserId = null;
    console.log(
      `GameID ${g117matchId} winner is ${g117matchWinnerFullName} ID ${g117matchWinnerId}`
    );

    /* Check Game 117 loser */
    if (
      g117matchWinnerId !== parseInt(g117matchWinnerElement.options[2].value)
    ) {
      g117gameLoserFullName = g117matchWinnerElement.options[2].label;
      g117gameLoserId = parseInt(g117matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g117matchId} loser is ${g117gameLoserFullName} ID ${g117gameLoserId}`
      );
    }
    if (
      g117matchWinnerId !== parseInt(g117matchWinnerElement.options[1].value)
    ) {
      g117gameLoserFullName = g117matchWinnerElement.options[1].label;
      g117gameLoserId = parseInt(g117matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g117matchId} loser is ${g117gameLoserFullName} ID ${g117gameLoserId}`
      );
    }

    /* Save */
    // match_id 117 save match results
    matchData[16].winner = g117matchWinnerId;
    matchData[16].loser = g117gameLoserId;
    matchData[16].score_id = g117matchScore;
    // clear gameTable selection to 0
    g117gameTableElement.options[0].selected = true;
    // send match_id 117 to API
    saveMatch(matchData[16]);

    /* Move match 117 Winner to new match 131 as player 1 */
    // save to Object
    matchData[30].player1 = g117matchWinnerId;
    // set cell value to player first- and lastname
    g131player1Element.innerText = findPlayer(
      g117matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g131matchWinnerElement.options[1] = new Option(
      findPlayer(g117matchWinnerId, registrationData).fullName,
      g117matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[30]);

    /* Move match 117 Loser to new match 129 as player 1 */
    // save to Object
    matchData[28].player1 = g117gameLoserId;
    // set cell value to player first- and lastname
    g129player1Element.innerText = findPlayer(
      g117gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g129matchWinnerElement.options[1] = new Option(
      findPlayer(g117gameLoserId, registrationData).fullName,
      g117gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[28]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 118  ***/
  /*****         *****/
  const g118player1Element = document.getElementById('118player1');
  const g118player2Element = document.getElementById('118player2');
  const g118gameTableElement = document.getElementById('118gameTable');
  const g118matchWinnerElement = document.getElementById('118matchWinner');
  const g118matchScoreElement = document.getElementById('118matchScore');
  const g118Player1Id = matchData[17].player1;
  const g118Player2Id = matchData[17].player2;

  if (typeof g118Player1Id !== 'number' && typeof g118Player2Id !== 'number') {
    g118player1Element.innerText = '';
    g118player1Element.title = '';
    g118matchWinnerElement.options[1] = new Option('', '', false, false);
    g118player2Element.innerText = '';
    g118player2Element.title = '';
    g118matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g118Player1Id === 'number' && typeof g118Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g118player1Element.innerText = findPlayer(
      g118Player1Id,
      registrationData
    ).fullName;
    g118player1Element.title = g118Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g118matchWinnerElement.options[1] = new Option(
      findPlayer(g118Player1Id, registrationData).fullName,
      g118Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g118player2Element.innerText = findPlayer(
      g118Player2Id,
      registrationData
    ).fullName;
    g118player2Element.title = g118Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g118matchWinnerElement.options[2] = new Option(
      findPlayer(g118Player2Id, registrationData).fullName,
      g118Player2Id,
      false,
      false
    );
    if (g118Player1Id === matchData[17].winner) {
      // if player 1 winner, then select it from dropdown menu
      g118matchWinnerElement.options[1].selected = true;
      g118matchScoreElement.options[matchData[17].score_id].selected = true;
    }

    if (g118Player2Id === matchData[17].winner) {
      // if player 2 winner, then select it from dropdown menu
      g118matchWinnerElement.options[2].selected = true;
      g118matchScoreElement.options[matchData[17].score_id].selected = true;
    }
  }

  /* add addEventListener to match 118 save button */
  document.getElementById('saveMatch118').addEventListener('click', () => {
    let g118matchId = document.getElementById('118').cells[0].innerText;
    let g118matchWinnerFullName =
      g118matchWinnerElement.options[g118matchWinnerElement.selectedIndex]
        .label;
    let g118matchWinnerId = parseInt(
      g118matchWinnerElement.options[g118matchWinnerElement.selectedIndex].value
    );
    let g118matchScore = parseInt(
      g118matchScoreElement.options[g118matchScoreElement.selectedIndex].value
    );
    let g118gameLoserFullName = '';
    let g118gameLoserId = null;
    console.log(
      `GameID ${g118matchId} winner is ${g118matchWinnerFullName} ID ${g118matchWinnerId}`
    );

    /* Check Game 118 loser */
    if (
      g118matchWinnerId !== parseInt(g118matchWinnerElement.options[2].value)
    ) {
      g118gameLoserFullName = g118matchWinnerElement.options[2].label;
      g118gameLoserId = parseInt(g118matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g118matchId} loser is ${g118gameLoserFullName} ID ${g118gameLoserId}`
      );
    }
    if (
      g118matchWinnerId !== parseInt(g118matchWinnerElement.options[1].value)
    ) {
      g118gameLoserFullName = g118matchWinnerElement.options[1].label;
      g118gameLoserId = parseInt(g118matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g118matchId} loser is ${g118gameLoserFullName} ID ${g118gameLoserId}`
      );
    }

    /* Save */
    // match_id 118 save match results
    matchData[17].winner = g118matchWinnerId;
    matchData[17].loser = g118gameLoserId;
    matchData[17].score_id = g118matchScore;
    // clear gameTable selection to 0
    g118gameTableElement.options[0].selected = true;
    // send match_id 118 to API
    saveMatch(matchData[17]);

    /* Move match 118 Winner to new match 131 as player 2 */
    // save to Object
    matchData[30].player2 = g118matchWinnerId;
    // set cell value to player first- and lastname
    g131player2Element.innerText = findPlayer(
      g118matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g131matchWinnerElement.options[2] = new Option(
      findPlayer(g118matchWinnerId, registrationData).fullName,
      g118matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[30]);

    /* Move match 118 Loser to new match 130 as player 1 */
    // save to Object
    matchData[29].player1 = g118gameLoserId;
    // set cell value to player first- and lastname
    g130player1Element.innerText = findPlayer(
      g118gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g130matchWinnerElement.options[1] = new Option(
      findPlayer(g118gameLoserId, registrationData).fullName,
      g118gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[29]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 119  ***/
  /*****         *****/
  const g119player1Element = document.getElementById('119player1');
  const g119player2Element = document.getElementById('119player2');
  const g119gameTableElement = document.getElementById('119gameTable');
  const g119matchWinnerElement = document.getElementById('119matchWinner');
  const g119matchScoreElement = document.getElementById('119matchScore');
  const g119Player1Id = matchData[18].player1;
  const g119Player2Id = matchData[18].player2;

  if (typeof g119Player1Id !== 'number' && typeof g119Player2Id !== 'number') {
    g119player1Element.innerText = '';
    g119player1Element.title = '';
    g119matchWinnerElement.options[1] = new Option('', '', false, false);
    g119player2Element.innerText = '';
    g119player2Element.title = '';
    g119matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g119Player1Id === 'number' && typeof g119Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g119player1Element.innerText = findPlayer(
      g119Player1Id,
      registrationData
    ).fullName;
    g119player1Element.title = g119Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g119matchWinnerElement.options[1] = new Option(
      findPlayer(g119Player1Id, registrationData).fullName,
      g119Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g119player2Element.innerText = findPlayer(
      g119Player2Id,
      registrationData
    ).fullName;
    g119player2Element.title = g119Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g119matchWinnerElement.options[2] = new Option(
      findPlayer(g119Player2Id, registrationData).fullName,
      g119Player2Id,
      false,
      false
    );
    if (g119Player1Id === matchData[18].winner) {
      // if player 1 winner, then select it from dropdown menu
      g119matchWinnerElement.options[1].selected = true;
      g119matchScoreElement.options[matchData[18].score_id].selected = true;
    }

    if (g119Player2Id === matchData[18].winner) {
      // if player 2 winner, then select it from dropdown menu
      g119matchWinnerElement.options[2].selected = true;
      g119matchScoreElement.options[matchData[18].score_id].selected = true;
    }
  }

  /* add addEventListener to match 119 save button */
  document.getElementById('saveMatch119').addEventListener('click', () => {
    let g119matchId = document.getElementById('119').cells[0].innerText;
    let g119matchWinnerFullName =
      g119matchWinnerElement.options[g119matchWinnerElement.selectedIndex]
        .label;
    let g119matchWinnerId = parseInt(
      g119matchWinnerElement.options[g119matchWinnerElement.selectedIndex].value
    );
    let g119matchScore = parseInt(
      g119matchScoreElement.options[g119matchScoreElement.selectedIndex].value
    );
    let g119gameLoserFullName = '';
    let g119gameLoserId = null;
    console.log(
      `GameID ${g119matchId} winner is ${g119matchWinnerFullName} ID ${g119matchWinnerId}`
    );

    /* Check Game 119 loser */
    if (
      g119matchWinnerId !== parseInt(g119matchWinnerElement.options[2].value)
    ) {
      g119gameLoserFullName = g119matchWinnerElement.options[2].label;
      g119gameLoserId = parseInt(g119matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g119matchId} loser is ${g119gameLoserFullName} ID ${g119gameLoserId}`
      );
    }
    if (
      g119matchWinnerId !== parseInt(g119matchWinnerElement.options[1].value)
    ) {
      g119gameLoserFullName = g119matchWinnerElement.options[1].label;
      g119gameLoserId = parseInt(g119matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g119matchId} loser is ${g119gameLoserFullName} ID ${g119gameLoserId}`
      );
    }

    /* Save */
    // match_id 119 save match results
    matchData[18].winner = g119matchWinnerId;
    matchData[18].loser = g119gameLoserId;
    matchData[18].score_id = g119matchScore;
    // clear gameTable selection to 0
    g119gameTableElement.options[0].selected = true;
    // send match_id 119 to API
    saveMatch(matchData[18]);

    /* Move match 119 Winner to new match 125 as player 1 */
    // save to Object
    matchData[24].player1 = g119matchWinnerId;
    // set cell value to player first- and lastname
    g125player1Element.innerText = findPlayer(
      g119matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g125matchWinnerElement.options[1] = new Option(
      findPlayer(g119matchWinnerId, registrationData).fullName,
      g119matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[24]);

    /* Move match 119 Loser to new match 127 as player 1 */
    // save to Object
    matchData[26].player1 = g119gameLoserId;
    // set cell value to player first- and lastname
    g127player1Element.innerText = findPlayer(
      g119gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g127matchWinnerElement.options[1] = new Option(
      findPlayer(g119gameLoserId, registrationData).fullName,
      g119gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[26]);

    console.table(matchData);
  });

  /*****         *****/
  /***  Match 120  ***/
  /*****         *****/
  const g120player1Element = document.getElementById('120player1');
  const g120player2Element = document.getElementById('120player2');
  const g120gameTableElement = document.getElementById('120gameTable');
  const g120matchWinnerElement = document.getElementById('120matchWinner');
  const g120matchScoreElement = document.getElementById('120matchScore');
  const g120Player1Id = matchData[19].player1;
  const g120Player2Id = matchData[19].player2;

  if (typeof g120Player1Id !== 'number' && typeof g120Player2Id !== 'number') {
    g120player1Element.innerText = '';
    g120player1Element.title = '';
    g120matchWinnerElement.options[1] = new Option('', '', false, false);
    g120player2Element.innerText = '';
    g120player2Element.title = '';
    g120matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g120Player1Id === 'number' && typeof g120Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g120player1Element.innerText = findPlayer(
      g120Player1Id,
      registrationData
    ).fullName;
    g120player1Element.title = g120Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g120matchWinnerElement.options[1] = new Option(
      findPlayer(g120Player1Id, registrationData).fullName,
      g120Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g120player2Element.innerText = findPlayer(
      g120Player2Id,
      registrationData
    ).fullName;
    g120player2Element.title = g120Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g120matchWinnerElement.options[2] = new Option(
      findPlayer(g120Player2Id, registrationData).fullName,
      g120Player2Id,
      false,
      false
    );
    if (g120Player1Id === matchData[19].winner) {
      // if player 1 winner, then select it from dropdown menu
      g120matchWinnerElement.options[1].selected = true;
      g120matchScoreElement.options[matchData[19].score_id].selected = true;
    }

    if (g120Player2Id === matchData[19].winner) {
      // if player 2 winner, then select it from dropdown menu
      g120matchWinnerElement.options[2].selected = true;
      g120matchScoreElement.options[matchData[19].score_id].selected = true;
    }
  }

  /* add addEventListener to match 120 save button */
  document.getElementById('saveMatch120').addEventListener('click', () => {
    let g120matchId = document.getElementById('120').cells[0].innerText;
    let g120matchWinnerFullName =
      g120matchWinnerElement.options[g120matchWinnerElement.selectedIndex]
        .label;
    let g120matchWinnerId = parseInt(
      g120matchWinnerElement.options[g120matchWinnerElement.selectedIndex].value
    );
    let g120matchScore = parseInt(
      g120matchScoreElement.options[g120matchScoreElement.selectedIndex].value
    );
    let g120gameLoserFullName = '';
    let g120gameLoserId = null;
    console.log(
      `GameID ${g120matchId} winner is ${g120matchWinnerFullName} ID ${g120matchWinnerId}`
    );

    /* Check Game 120 loser */
    if (
      g120matchWinnerId !== parseInt(g120matchWinnerElement.options[2].value)
    ) {
      g120gameLoserFullName = g120matchWinnerElement.options[2].label;
      g120gameLoserId = parseInt(g120matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g120matchId} loser is ${g120gameLoserFullName} ID ${g120gameLoserId}`
      );
    }
    if (
      g120matchWinnerId !== parseInt(g120matchWinnerElement.options[1].value)
    ) {
      g120gameLoserFullName = g120matchWinnerElement.options[1].label;
      g120gameLoserId = parseInt(g120matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g120matchId} loser is ${g120gameLoserFullName} ID ${g120gameLoserId}`
      );
    }

    /* Save */
    // match_id 120 save match results
    matchData[19].winner = g120matchWinnerId;
    matchData[19].loser = g120gameLoserId;
    matchData[19].score_id = g120matchScore;
    // clear gameTable selection to 0
    g120gameTableElement.options[0].selected = true;
    // send match_id 120 to API
    saveMatch(matchData[19]);

    /* Move match 120 Winner to new match 125 as player 2 */
    // save to Object
    matchData[24].player2 = g120matchWinnerId;
    // set cell value to player first- and lastname
    g125player2Element.innerText = findPlayer(
      g120matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g125matchWinnerElement.options[2] = new Option(
      findPlayer(g120matchWinnerId, registrationData).fullName,
      g120matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[24]);

    /* Move match 120 Loser to new match 127 as player 2 */
    // save to Object
    matchData[26].player2 = g120gameLoserId;
    // set cell value to player first- and lastname
    g127player2Element.innerText = findPlayer(
      g120gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g127matchWinnerElement.options[2] = new Option(
      findPlayer(g120gameLoserId, registrationData).fullName,
      g120gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[26]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 121  ***/
  /*****   *****/
  const g121player1Element = document.getElementById('121player1');
  const g121player2Element = document.getElementById('121player2');
  const g121gameTableElement = document.getElementById('121gameTable');
  const g121matchWinnerElement = document.getElementById('121matchWinner');
  const g121matchScoreElement = document.getElementById('121matchScore');
  const g121Player1Id = matchData[20].player1;
  const g121Player2Id = matchData[20].player2;

  if (typeof g121Player1Id !== 'number' && typeof g121Player2Id !== 'number') {
    g121player1Element.innerText = '';
    g121player1Element.title = '';
    g121matchWinnerElement.options[1] = new Option('', '', false, false);
    g121player2Element.innerText = '';
    g121player2Element.title = '';
    g121matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g121Player1Id === 'number' && typeof g121Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g121player1Element.innerText = findPlayer(
      g121Player1Id,
      registrationData
    ).fullName;
    g121player1Element.title = g121Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g121matchWinnerElement.options[1] = new Option(
      findPlayer(g121Player1Id, registrationData).fullName,
      g121Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g121player2Element.innerText = findPlayer(
      g121Player2Id,
      registrationData
    ).fullName;
    g121player2Element.title = g121Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g121matchWinnerElement.options[2] = new Option(
      findPlayer(g121Player2Id, registrationData).fullName,
      g121Player2Id,
      false,
      false
    );
    if (g121Player1Id === matchData[20].winner) {
      // if player 1 winner, then select it from dropdown menu
      g121matchWinnerElement.options[1].selected = true;
      g121matchScoreElement.options[matchData[20].score_id].selected = true;
    }

    if (g121Player2Id === matchData[20].winner) {
      // if player 2 winner, then select it from dropdown menu
      g121matchWinnerElement.options[2].selected = true;
      g121matchScoreElement.options[matchData[20].score_id].selected = true;
    }
  }

  /* add addEventListener to match 121 save button */
  document.getElementById('saveMatch121').addEventListener('click', () => {
    let g121matchId = document.getElementById('121').cells[0].innerText;
    let g121matchWinnerFullName =
      g121matchWinnerElement.options[g121matchWinnerElement.selectedIndex]
        .label;
    let g121matchWinnerId = parseInt(
      g121matchWinnerElement.options[g121matchWinnerElement.selectedIndex].value
    );
    let g121matchScore = parseInt(
      g121matchScoreElement.options[g121matchScoreElement.selectedIndex].value
    );
    let g121gameLoserFullName = '';
    let g121gameLoserId = null;
    console.log(
      `GameID ${g121matchId} winner is ${g121matchWinnerFullName} ID ${g121matchWinnerId}`
    );

    /* Check Game 121 loser */
    if (
      g121matchWinnerId !== parseInt(g121matchWinnerElement.options[2].value)
    ) {
      g121gameLoserFullName = g121matchWinnerElement.options[2].label;
      g121gameLoserId = parseInt(g121matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g121matchId} loser is ${g121gameLoserFullName} ID ${g121gameLoserId}`
      );
    }
    if (
      g121matchWinnerId !== parseInt(g121matchWinnerElement.options[1].value)
    ) {
      g121gameLoserFullName = g121matchWinnerElement.options[1].label;
      g121gameLoserId = parseInt(g121matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g121matchId} loser is ${g121gameLoserFullName} ID ${g121gameLoserId}`
      );
    }

    /* Save */
    // match_id 121 save match results
    matchData[20].winner = g121matchWinnerId;
    matchData[20].loser = g121gameLoserId;
    matchData[20].score_id = g121matchScore;
    // clear gameTable selection to 0
    g121gameTableElement.options[0].selected = true;
    // send match_id 121 to API
    saveMatch(matchData[20]);

    /* Move match 121 Winner to new match 126 as player 1*/
    // save to Object
    matchData[25].player1 = g121matchWinnerId;
    // set cell value to player first- and lastname
    g126player1Element.innerText = findPlayer(
      g121matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g126matchWinnerElement.options[1] = new Option(
      findPlayer(g121matchWinnerId, registrationData).fullName,
      g121matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[25]);

    /* Move match 121 Loser to new match 128 as player 1 */
    // save to Object
    matchData[27].player1 = g121gameLoserId;
    // set cell value to player first- and lastname
    g128player1Element.innerText = findPlayer(
      g121gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g128matchWinnerElement.options[1] = new Option(
      findPlayer(g121gameLoserId, registrationData).fullName,
      g121gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[27]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 122  ***/
  /*****   *****/
  const g122player1Element = document.getElementById('122player1');
  const g122player2Element = document.getElementById('122player2');
  const g122gameTableElement = document.getElementById('122gameTable');
  const g122matchWinnerElement = document.getElementById('122matchWinner');
  const g122matchScoreElement = document.getElementById('122matchScore');
  const g122Player1Id = matchData[21].player1;
  const g122Player2Id = matchData[21].player2;

  if (typeof g122Player1Id !== 'number' && typeof g122Player2Id !== 'number') {
    g122player1Element.innerText = '';
    g122player1Element.title = '';
    g122matchWinnerElement.options[1] = new Option('', '', false, false);
    g122player2Element.innerText = '';
    g122player2Element.title = '';
    g122matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g122Player1Id === 'number' && typeof g122Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g122player1Element.innerText = findPlayer(
      g122Player1Id,
      registrationData
    ).fullName;
    g122player1Element.title = g122Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g122matchWinnerElement.options[1] = new Option(
      findPlayer(g122Player1Id, registrationData).fullName,
      g122Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g122player2Element.innerText = findPlayer(
      g122Player2Id,
      registrationData
    ).fullName;
    g122player2Element.title = g122Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g122matchWinnerElement.options[2] = new Option(
      findPlayer(g122Player2Id, registrationData).fullName,
      g122Player2Id,
      false,
      false
    );
    if (g122Player1Id === matchData[21].winner) {
      // if player 1 winner, then select it from dropdown menu
      g122matchWinnerElement.options[1].selected = true;
      g122matchScoreElement.options[matchData[21].score_id].selected = true;
    }

    if (g122Player2Id === matchData[21].winner) {
      // if player 2 winner, then se21ect it from dropdown menu
      g122matchWinnerElement.options[2].selected = true;
      g122matchScoreElement.options[matchData[21].score_id].selected = true;
    }
  }

  /* add addEventListener to match 122 save button */
  document.getElementById('saveMatch122').addEventListener('click', () => {
    let g122matchId = document.getElementById('122').cells[0].innerText;
    let g122matchWinnerFullName =
      g122matchWinnerElement.options[g122matchWinnerElement.selectedIndex]
        .label;
    let g122matchWinnerId = parseInt(
      g122matchWinnerElement.options[g122matchWinnerElement.selectedIndex].value
    );
    let g122matchScore = parseInt(
      g122matchScoreElement.options[g122matchScoreElement.selectedIndex].value
    );
    let g122gameLoserFullName = '';
    let g122gameLoserId = null;
    console.log(
      `GameID ${g122matchId} winner is ${g122matchWinnerFullName} ID ${g122matchWinnerId}`
    );

    /* Check Game 122 loser */
    if (
      g122matchWinnerId !== parseInt(g122matchWinnerElement.options[2].value)
    ) {
      g122gameLoserFullName = g122matchWinnerElement.options[2].label;
      g122gameLoserId = parseInt(g122matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g122matchId} loser is ${g122gameLoserFullName} ID ${g122gameLoserId}`
      );
    }
    if (
      g122matchWinnerId !== parseInt(g122matchWinnerElement.options[1].value)
    ) {
      g122gameLoserFullName = g122matchWinnerElement.options[1].label;
      g122gameLoserId = parseInt(g122matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g122matchId} loser is ${g122gameLoserFullName} ID ${g122gameLoserId}`
      );
    }

    /* Save */
    // match_id 122 save match results
    matchData[21].winner = g122matchWinnerId;
    matchData[21].loser = g122gameLoserId;
    matchData[21].score_id = g122matchScore;
    // clear gameTable selection to 0
    g122gameTableElement.options[0].selected = true;
    // send match_id 122 to API
    saveMatch(matchData[21]);

    /* Move match 122 Winner to new match 126 as player 2 */
    // save to Object
    matchData[25].player2 = g122matchWinnerId;
    // set cell value to player first- and lastname
    g126player2Element.innerText = findPlayer(
      g122matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g126matchWinnerElement.options[2] = new Option(
      findPlayer(g122matchWinnerId, registrationData).fullName,
      g122matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[25]);

    /* Move match 122 Loser to new match 128 as player 2 */
    // save to Object
    matchData[27].player2 = g122gameLoserId;
    // set cell value to player first- and lastname
    g128player2Element.innerText = findPlayer(
      g122gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g128matchWinnerElement.options[2] = new Option(
      findPlayer(g122gameLoserId, registrationData).fullName,
      g122gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[27]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 123  ***/
  /*****   *****/
  const g123player1Element = document.getElementById('123player1');
  const g123player2Element = document.getElementById('123player2');
  const g123gameTableElement = document.getElementById('123gameTable');
  const g123matchWinnerElement = document.getElementById('123matchWinner');
  const g123matchScoreElement = document.getElementById('123matchScore');
  const g123Player1Id = matchData[22].player1;
  const g123Player2Id = matchData[22].player2;

  if (typeof g123Player1Id !== 'number' && typeof g123Player2Id !== 'number') {
    g123player1Element.innerText = '';
    g123player1Element.title = '';
    g123matchWinnerElement.options[1] = new Option('', '', false, false);
    g123player2Element.innerText = '';
    g123player2Element.title = '';
    g123matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g123Player1Id === 'number' && typeof g123Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g123player1Element.innerText = findPlayer(
      g123Player1Id,
      registrationData
    ).fullName;
    g123player1Element.title = g123Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g123matchWinnerElement.options[1] = new Option(
      findPlayer(g123Player1Id, registrationData).fullName,
      g123Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g123player2Element.innerText = findPlayer(
      g123Player2Id,
      registrationData
    ).fullName;
    g123player2Element.title = g123Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g123matchWinnerElement.options[2] = new Option(
      findPlayer(g123Player2Id, registrationData).fullName,
      g123Player2Id,
      false,
      false
    );
    if (g123Player1Id === matchData[22].winner) {
      // if player 1 winner, then select it from dropdown menu
      g123matchWinnerElement.options[1].selected = true;
      g123matchScoreElement.options[matchData[22].score_id].selected = true;
    }

    if (g123Player2Id === matchData[22].winner) {
      // if player 2 winner, then select it from dropdown menu
      g123matchWinnerElement.options[2].selected = true;
      g123matchScoreElement.options[matchData[22].score_id].selected = true;
    }
  }

  /* add addEventListener to match 123 save button */
  document.getElementById('saveMatch123').addEventListener('click', () => {
    let g123matchId = document.getElementById('123').cells[0].innerText;
    let g123matchWinnerFullName =
      g123matchWinnerElement.options[g123matchWinnerElement.selectedIndex]
        .label;
    let g123matchWinnerId = parseInt(
      g123matchWinnerElement.options[g123matchWinnerElement.selectedIndex].value
    );
    let g123matchScore = parseInt(
      g123matchScoreElement.options[g123matchScoreElement.selectedIndex].value
    );
    let g123gameLoserFullName = '';
    let g123gameLoserId = null;
    console.log(
      `GameID ${g123matchId} winner is ${g123matchWinnerFullName} ID ${g123matchWinnerId}`
    );

    /* Check Game 123 loser */
    if (
      g123matchWinnerId !== parseInt(g123matchWinnerElement.options[2].value)
    ) {
      g123gameLoserFullName = g123matchWinnerElement.options[2].label;
      g123gameLoserId = parseInt(g123matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g123matchId} loser is ${g123gameLoserFullName} ID ${g123gameLoserId}`
      );
    }
    if (
      g123matchWinnerId !== parseInt(g123matchWinnerElement.options[1].value)
    ) {
      g123gameLoserFullName = g123matchWinnerElement.options[1].label;
      g123gameLoserId = parseInt(g123matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g123matchId} loser is ${g123gameLoserFullName} ID ${g123gameLoserId}`
      );
    }

    /* Save */
    // match_id 123 save match results
    matchData[22].winner = g123matchWinnerId;
    matchData[22].loser = g123gameLoserId;
    matchData[22].score_id = g123matchScore;
    // clear gameTable selection to 0
    g123gameTableElement.options[0].selected = true;
    // send match_id 123 to API
    saveMatch(matchData[22]);

    /* Move match 123 Winner to new match 133 as player 1 */
    // save to Object
    matchData[32].player1 = g123matchWinnerId;
    // set cell value to player first- and lastname
    g133player1Element.innerText = findPlayer(
      g123matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g133matchWinnerElement.options[1] = new Option(
      findPlayer(g123matchWinnerId, registrationData).fullName,
      g123matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[32]);

    /* Move match 123 Loser to new match 132 as player 1 */
    // save to Object
    matchData[31].player1 = g123gameLoserId;
    // set cell value to player first- and lastname
    g132player1Element.innerText = findPlayer(
      g123gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g132matchWinnerElement.options[1] = new Option(
      findPlayer(g123gameLoserId, registrationData).fullName,
      g123gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[31]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 124  ***/
  /*****   *****/
  const g124player1Element = document.getElementById('124player1');
  const g124player2Element = document.getElementById('124player2');
  const g124gameTableElement = document.getElementById('124gameTable');
  const g124matchWinnerElement = document.getElementById('124matchWinner');
  const g124matchScoreElement = document.getElementById('124matchScore');
  const g124Player1Id = matchData[23].player1;
  const g124Player2Id = matchData[23].player2;

  if (typeof g124Player1Id !== 'number' && typeof g124Player2Id !== 'number') {
    g124player1Element.innerText = '';
    g124player1Element.title = '';
    g124matchWinnerElement.options[1] = new Option('', '', false, false);
    g124player2Element.innerText = '';
    g124player2Element.title = '';
    g124matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g124Player1Id === 'number' && typeof g124Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g124player1Element.innerText = findPlayer(
      g124Player1Id,
      registrationData
    ).fullName;
    g124player1Element.title = g124Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g124matchWinnerElement.options[1] = new Option(
      findPlayer(g124Player1Id, registrationData).fullName,
      g124Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g124player2Element.innerText = findPlayer(
      g124Player2Id,
      registrationData
    ).fullName;
    g124player2Element.title = g124Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g124matchWinnerElement.options[2] = new Option(
      findPlayer(g124Player2Id, registrationData).fullName,
      g124Player2Id,
      false,
      false
    );
    if (g124Player1Id === matchData[23].winner) {
      // if player 1 winner, then select it from dropdown menu
      g124matchWinnerElement.options[1].selected = true;
      g124matchScoreElement.options[matchData[23].score_id].selected = true;
    }

    if (g124Player2Id === matchData[23].winner) {
      // if player 2 winner, then select it from dropdown menu
      g124matchWinnerElement.options[2].selected = true;
      g124matchScoreElement.options[matchData[23].score_id].selected = true;
    }
  }

  /* add addEventListener to match 124 save button */
  document.getElementById('saveMatch124').addEventListener('click', () => {
    let g124matchId = document.getElementById('124').cells[0].innerText;
    let g124matchWinnerFullName =
      g124matchWinnerElement.options[g124matchWinnerElement.selectedIndex]
        .label;
    let g124matchWinnerId = parseInt(
      g124matchWinnerElement.options[g124matchWinnerElement.selectedIndex].value
    );
    let g124matchScore = parseInt(
      g124matchScoreElement.options[g124matchScoreElement.selectedIndex].value
    );
    let g124gameLoserFullName = '';
    let g124gameLoserId = null;
    console.log(
      `GameID ${g124matchId} winner is ${g124matchWinnerFullName} ID ${g124matchWinnerId}`
    );

    /* Check Game 124 loser */
    if (
      g124matchWinnerId !== parseInt(g124matchWinnerElement.options[2].value)
    ) {
      g124gameLoserFullName = g124matchWinnerElement.options[2].label;
      g124gameLoserId = parseInt(g124matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g124matchId} loser is ${g124gameLoserFullName} ID ${g124gameLoserId}`
      );
    }
    if (
      g124matchWinnerId !== parseInt(g124matchWinnerElement.options[1].value)
    ) {
      g124gameLoserFullName = g124matchWinnerElement.options[1].label;
      g124gameLoserId = parseInt(g124matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g124matchId} loser is ${g124gameLoserFullName} ID ${g124gameLoserId}`
      );
    }

    /* Save */
    // match_id 124 save match results
    matchData[23].winner = g124matchWinnerId;
    matchData[23].loser = g124gameLoserId;
    matchData[23].score_id = g124matchScore;
    // clear gameTable selection to 0
    g124gameTableElement.options[0].selected = true;
    // send match_id 124 to API
    saveMatch(matchData[23]);

    /* Move match 124 Winner to new match 133 as player 2 */
    // save to Object
    matchData[32].player2 = g124matchWinnerId;
    // set cell value to player first- and lastname
    g124player2Element.innerText = findPlayer(
      g124matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g124matchWinnerElement.options[2] = new Option(
      findPlayer(g124matchWinnerId, registrationData).fullName,
      g124matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[32]);

    /* Move match 124 Loser to new match 132 as player 2 */
    // save to Object
    matchData[31].player2 = g124gameLoserId;
    // set cell value to player first- and lastname
    g132player2Element.innerText = findPlayer(
      g124gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g132matchWinnerElement.options[2] = new Option(
      findPlayer(g124gameLoserId, registrationData).fullName,
      g124gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[31]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 125  ***/
  /*****   *****/
  const g125player1Element = document.getElementById('125player1');
  const g125player2Element = document.getElementById('125player2');
  const g125gameTableElement = document.getElementById('125gameTable');
  const g125matchWinnerElement = document.getElementById('125matchWinner');
  const g125matchScoreElement = document.getElementById('125matchScore');
  const g125Player1Id = matchData[24].player1;
  const g125Player2Id = matchData[24].player2;

  if (typeof g125Player1Id !== 'number' && typeof g125Player2Id !== 'number') {
    g125player1Element.innerText = '';
    g125player1Element.title = '';
    g125matchWinnerElement.options[1] = new Option('', '', false, false);
    g125player2Element.innerText = '';
    g125player2Element.title = '';
    g125matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g125Player1Id === 'number' && typeof g125Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g125player1Element.innerText = findPlayer(
      g125Player1Id,
      registrationData
    ).fullName;
    g125player1Element.title = g125Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g125matchWinnerElement.options[1] = new Option(
      findPlayer(g125Player1Id, registrationData).fullName,
      g125Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g125player2Element.innerText = findPlayer(
      g125Player2Id,
      registrationData
    ).fullName;
    g125player2Element.title = g125Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g125matchWinnerElement.options[2] = new Option(
      findPlayer(g125Player2Id, registrationData).fullName,
      g125Player2Id,
      false,
      false
    );
    if (g125Player1Id === matchData[24].winner) {
      // if player 1 winner, then select it from dropdown menu
      g125matchWinnerElement.options[1].selected = true;
      g125matchScoreElement.options[matchData[24].score_id].selected = true;
    }

    if (g125Player2Id === matchData[24].winner) {
      // if player 2 winner, then select it from dropdown menu
      g125matchWinnerElement.options[2].selected = true;
      g125matchScoreElement.options[matchData[24].score_id].selected = true;
    }
  }

  /* add addEventListener to match 125 save button */
  document.getElementById('saveMatch125').addEventListener('click', () => {
    let g125matchId = document.getElementById('125').cells[0].innerText;
    let g125matchWinnerFullName =
      g125matchWinnerElement.options[g125matchWinnerElement.selectedIndex]
        .label;
    let g125matchWinnerId = parseInt(
      g125matchWinnerElement.options[g125matchWinnerElement.selectedIndex].value
    );
    let g125matchScore = parseInt(
      g125matchScoreElement.options[g125matchScoreElement.selectedIndex].value
    );
    let g125gameLoserFullName = '';
    let g125gameLoserId = null;
    console.log(
      `GameID ${g125matchId} winner is ${g125matchWinnerFullName} ID ${g125matchWinnerId}`
    );

    /* Check Game 125 loser */
    if (
      g125matchWinnerId !== parseInt(g125matchWinnerElement.options[2].value)
    ) {
      g125gameLoserFullName = g125matchWinnerElement.options[2].label;
      g125gameLoserId = parseInt(g125matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g125matchId} loser is ${g125gameLoserFullName} ID ${g125gameLoserId}`
      );
    }
    if (
      g125matchWinnerId !== parseInt(g125matchWinnerElement.options[1].value)
    ) {
      g125gameLoserFullName = g125matchWinnerElement.options[1].label;
      g125gameLoserId = parseInt(g125matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g125matchId} loser is ${g125gameLoserFullName} ID ${g125gameLoserId}`
      );
    }

    /* Save */
    // match_id 125 save match results
    matchData[24].winner = g125matchWinnerId;
    matchData[24].loser = g125gameLoserId;
    matchData[24].score_id = g125matchScore;
    // clear gameTable selection to 0
    g125gameTableElement.options[0].selected = true;
    // send match_id 125 to API
    saveMatch(matchData[24]);

    /* Move match 125 Winner to new match 129 as player 2 */
    // save to Object
    matchData[28].player2 = g125matchWinnerId;
    // set cell value to player first- and lastname
    g129player2Element.innerText = findPlayer(
      g125matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g129matchWinnerElement.options[2] = new Option(
      findPlayer(g125matchWinnerId, registrationData).fullName,
      g125matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[28]);

    /* Move match 125 Loser to new match 136 as player 1 */
    // save to Object
    matchData[35].player1 = g125gameLoserId;
    // set cell value to player first- and lastname
    g136player1Element.innerText = findPlayer(
      g125gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g136matchWinnerElement.options[1] = new Option(
      findPlayer(g125gameLoserId, registrationData).fullName,
      g125gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[35]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 126  ***/
  /*****   *****/
  const g126player1Element = document.getElementById('126player1');
  const g126player2Element = document.getElementById('126player2');
  const g126gameTableElement = document.getElementById('126gameTable');
  const g126matchWinnerElement = document.getElementById('126matchWinner');
  const g126matchScoreElement = document.getElementById('126matchScore');
  const g126Player1Id = matchData[25].player1;
  const g126Player2Id = matchData[25].player2;

  if (typeof g126Player1Id !== 'number' && typeof g126Player2Id !== 'number') {
    g126player1Element.innerText = '';
    g126player1Element.title = '';
    g126matchWinnerElement.options[1] = new Option('', '', false, false);
    g126player2Element.innerText = '';
    g126player2Element.title = '';
    g126matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g126Player1Id === 'number' && typeof g126Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g126player1Element.innerText = findPlayer(
      g126Player1Id,
      registrationData
    ).fullName;
    g126player1Element.title = g126Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g126matchWinnerElement.options[1] = new Option(
      findPlayer(g126Player1Id, registrationData).fullName,
      g126Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g126player2Element.innerText = findPlayer(
      g126Player2Id,
      registrationData
    ).fullName;
    g126player2Element.title = g126Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g126matchWinnerElement.options[2] = new Option(
      findPlayer(g126Player2Id, registrationData).fullName,
      g126Player2Id,
      false,
      false
    );
    if (g126Player1Id === matchData[25].winner) {
      // if player 1 winner, then select it from dropdown menu
      g126matchWinnerElement.options[1].selected = true;
      g126matchScoreElement.options[matchData[25].score_id].selected = true;
    }

    if (g126Player2Id === matchData[25].winner) {
      // if player 2 winner, then select it from dropdown menu
      g126matchWinnerElement.options[2].selected = true;
      g126matchScoreElement.options[matchData[25].score_id].selected = true;
    }
  }

  /* add addEventListener to match 126 save button */
  document.getElementById('saveMatch126').addEventListener('click', () => {
    let g126matchId = document.getElementById('126').cells[0].innerText;
    let g126matchWinnerFullName =
      g126matchWinnerElement.options[g126matchWinnerElement.selectedIndex]
        .label;
    let g126matchWinnerId = parseInt(
      g126matchWinnerElement.options[g126matchWinnerElement.selectedIndex].value
    );
    let g126matchScore = parseInt(
      g126matchScoreElement.options[g126matchScoreElement.selectedIndex].value
    );
    let g126gameLoserFullName = '';
    let g126gameLoserId = null;
    console.log(
      `GameID ${g126matchId} winner is ${g126matchWinnerFullName} ID ${g126matchWinnerId}`
    );

    /* Check Game 126 loser */
    if (
      g126matchWinnerId !== parseInt(g126matchWinnerElement.options[2].value)
    ) {
      g126gameLoserFullName = g126matchWinnerElement.options[2].label;
      g126gameLoserId = parseInt(g126matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g126matchId} loser is ${g126gameLoserFullName} ID ${g126gameLoserId}`
      );
    }
    if (
      g126matchWinnerId !== parseInt(g126matchWinnerElement.options[1].value)
    ) {
      g126gameLoserFullName = g126matchWinnerElement.options[1].label;
      g126gameLoserId = parseInt(g126matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g126matchId} loser is ${g126gameLoserFullName} ID ${g126gameLoserId}`
      );
    }

    /* Save */
    // match_id 126 save match results
    matchData[25].winner = g126matchWinnerId;
    matchData[25].loser = g126gameLoserId;
    matchData[25].score_id = g126matchScore;
    // clear gameTable selection to 0
    g126gameTableElement.options[0].selected = true;
    // send match_id 126 to API
    saveMatch(matchData[25]);

    /* Move match 126 Winner to new match 130 as player 2 */
    // save to Object
    matchData[29].player2 = g126matchWinnerId;
    // set cell value to player first- and lastname
    g130player2Element.innerText = findPlayer(
      g126matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g130matchWinnerElement.options[2] = new Option(
      findPlayer(g126matchWinnerId, registrationData).fullName,
      g126matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[29]);

    /* Move match 126 Loser to new match 136 as player 2 */
    // save to Object
    matchData[35].player2 = g126gameLoserId;
    // set cell value to player first- and lastname
    g136player2Element.innerText = findPlayer(
      g126gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g136matchWinnerElement.options[2] = new Option(
      findPlayer(g126gameLoserId, registrationData).fullName,
      g126gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[35]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 127  ***/
  /*****   *****/
  const g127player1Element = document.getElementById('127player1');
  const g127player2Element = document.getElementById('127player2');
  const g127gameTableElement = document.getElementById('127gameTable');
  const g127matchWinnerElement = document.getElementById('127matchWinner');
  const g127matchScoreElement = document.getElementById('127matchScore');
  const g127Player1Id = matchData[26].player1;
  const g127Player2Id = matchData[26].player2;

  if (typeof g127Player1Id !== 'number' && typeof g127Player2Id !== 'number') {
    g127player1Element.innerText = '';
    g127player1Element.title = '';
    g127matchWinnerElement.options[1] = new Option('', '', false, false);
    g127player2Element.innerText = '';
    g127player2Element.title = '';
    g127matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g127Player1Id === 'number' && typeof g127Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g127player1Element.innerText = findPlayer(
      g127Player1Id,
      registrationData
    ).fullName;
    g127player1Element.title = g127Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g127matchWinnerElement.options[1] = new Option(
      findPlayer(g127Player1Id, registrationData).fullName,
      g127Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g127player2Element.innerText = findPlayer(
      g127Player2Id,
      registrationData
    ).fullName;
    g127player2Element.title = g127Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g127matchWinnerElement.options[2] = new Option(
      findPlayer(g127Player2Id, registrationData).fullName,
      g127Player2Id,
      false,
      false
    );
    if (g127Player1Id === matchData[26].winner) {
      // if player 1 winner, then select it from dropdown menu
      g127matchWinnerElement.options[1].selected = true;
      g127matchScoreElement.options[matchData[26].score_id].selected = true;
    }

    if (g127Player2Id === matchData[26].winner) {
      // if player 2 winner, then select it from dropdown menu
      g127matchWinnerElement.options[2].selected = true;
      g127matchScoreElement.options[matchData[26].score_id].selected = true;
    }
  }

  /* add addEventListener to match 127 save button */
  document.getElementById('saveMatch127').addEventListener('click', () => {
    let g127matchId = document.getElementById('127').cells[0].innerText;
    let g127matchWinnerFullName =
      g127matchWinnerElement.options[g127matchWinnerElement.selectedIndex]
        .label;
    let g127matchWinnerId = parseInt(
      g127matchWinnerElement.options[g127matchWinnerElement.selectedIndex].value
    );
    let g127matchScore = parseInt(
      g127matchScoreElement.options[g127matchScoreElement.selectedIndex].value
    );
    let g127gameLoserFullName = '';
    let g127gameLoserId = null;
    console.log(
      `GameID ${g127matchId} winner is ${g127matchWinnerFullName} ID ${g127matchWinnerId}`
    );

    /* Check Game 127 loser */
    if (
      g127matchWinnerId !== parseInt(g127matchWinnerElement.options[2].value)
    ) {
      g127gameLoserFullName = g127matchWinnerElement.options[2].label;
      g127gameLoserId = parseInt(g127matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g127matchId} loser is ${g127gameLoserFullName} ID ${g127gameLoserId}`
      );
    }
    if (
      g127matchWinnerId !== parseInt(g127matchWinnerElement.options[1].value)
    ) {
      g127gameLoserFullName = g127matchWinnerElement.options[1].label;
      g127gameLoserId = parseInt(g127matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g127matchId} loser is ${g127gameLoserFullName} ID ${g127gameLoserId}`
      );
    }

    /* Save */
    // match_id 127 save match results
    matchData[26].winner = g127matchWinnerId;
    matchData[26].loser = g127gameLoserId;
    matchData[26].score_id = g127matchScore;
    // clear gameTable selection to 0
    g127gameTableElement.options[0].selected = true;
    // send match_id 127 to API
    saveMatch(matchData[26]);

    /* Move match 127 Winner to new match 135 as player 1 */
    // save to Object
    matchData[34].player1 = g127matchWinnerId;
    // set cell value to player first- and lastname
    g135player1Element.innerText = findPlayer(
      g127matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g135matchWinnerElement.options[1] = new Option(
      findPlayer(g127matchWinnerId, registrationData).fullName,
      g127matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[34]);

    /* Move match 127 Loser to new match 134 as player 1 */
    // save to Object
    matchData[33].player1 = g127gameLoserId;
    // set cell value to player first- and lastname
    g134player1Element.innerText = findPlayer(
      g127gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g134matchWinnerElement.options[1] = new Option(
      findPlayer(g127gameLoserId, registrationData).fullName,
      g127gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[33]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 128  ***/
  /*****   *****/
  const g128player1Element = document.getElementById('128player1');
  const g128player2Element = document.getElementById('128player2');
  const g128gameTableElement = document.getElementById('128gameTable');
  const g128matchWinnerElement = document.getElementById('128matchWinner');
  const g128matchScoreElement = document.getElementById('128matchScore');
  const g128Player1Id = matchData[27].player1;
  const g128Player2Id = matchData[27].player2;

  if (typeof g128Player1Id !== 'number' && typeof g128Player2Id !== 'number') {
    g128player1Element.innerText = '';
    g128player1Element.title = '';
    g128matchWinnerElement.options[1] = new Option('', '', false, false);
    g128player2Element.innerText = '';
    g128player2Element.title = '';
    g128matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g128Player1Id === 'number' && typeof g128Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g128player1Element.innerText = findPlayer(
      g128Player1Id,
      registrationData
    ).fullName;
    g128player1Element.title = g128Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g128matchWinnerElement.options[1] = new Option(
      findPlayer(g128Player1Id, registrationData).fullName,
      g128Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g128player2Element.innerText = findPlayer(
      g128Player2Id,
      registrationData
    ).fullName;
    g128player2Element.title = g128Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g128matchWinnerElement.options[2] = new Option(
      findPlayer(g128Player2Id, registrationData).fullName,
      g128Player2Id,
      false,
      false
    );
    if (g128Player1Id === matchData[27].winner) {
      // if player 1 winner, then select it from dropdown menu
      g128matchWinnerElement.options[1].selected = true;
      g128matchScoreElement.options[matchData[27].score_id].selected = true;
    }

    if (g128Player2Id === matchData[27].winner) {
      // if player 2 winner, then select it from dropdown menu
      g128matchWinnerElement.options[2].selected = true;
      g128matchScoreElement.options[matchData[27].score_id].selected = true;
    }
  }

  /* add addEventListener to match 128 save button */
  document.getElementById('saveMatch128').addEventListener('click', () => {
    let g128matchId = document.getElementById('128').cells[0].innerText;
    let g128matchWinnerFullName =
      g128matchWinnerElement.options[g128matchWinnerElement.selectedIndex]
        .label;
    let g128matchWinnerId = parseInt(
      g128matchWinnerElement.options[g128matchWinnerElement.selectedIndex].value
    );
    let g128matchScore = parseInt(
      g128matchScoreElement.options[g128matchScoreElement.selectedIndex].value
    );
    let g128gameLoserFullName = '';
    let g128gameLoserId = null;
    console.log(
      `GameID ${g128matchId} winner is ${g128matchWinnerFullName} ID ${g128matchWinnerId}`
    );

    /* Check Game 128 loser */
    if (
      g128matchWinnerId !== parseInt(g128matchWinnerElement.options[2].value)
    ) {
      g128gameLoserFullName = g128matchWinnerElement.options[2].label;
      g128gameLoserId = parseInt(g128matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g128matchId} loser is ${g128gameLoserFullName} ID ${g128gameLoserId}`
      );
    }
    if (
      g128matchWinnerId !== parseInt(g128matchWinnerElement.options[1].value)
    ) {
      g128gameLoserFullName = g128matchWinnerElement.options[1].label;
      g128gameLoserId = parseInt(g128matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g128matchId} loser is ${g128gameLoserFullName} ID ${g128gameLoserId}`
      );
    }

    /* Save */
    // match_id 128 save match results
    matchData[27].winner = g128matchWinnerId;
    matchData[27].loser = g128gameLoserId;
    matchData[27].score_id = g128matchScore;
    // clear gameTable selection to 0
    g128gameTableElement.options[0].selected = true;
    // send match_id 128 to API
    saveMatch(matchData[27]);

    /* Move match 128 Winner to new match 135 as player 2 */
    // save to Object
    matchData[34].player2 = g128matchWinnerId;
    // set cell value to player first- and lastname
    g135player2Element.innerText = findPlayer(
      g128matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g135matchWinnerElement.options[2] = new Option(
      findPlayer(g128matchWinnerId, registrationData).fullName,
      g128matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[34]);

    /* Move match 128 Loser to new match 134 as player 2 */
    // save to Object
    matchData[33].player2 = g128gameLoserId;
    // set cell value to player first- and lastname
    g134player2Element.innerText = findPlayer(
      g128gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g134matchWinnerElement.options[2] = new Option(
      findPlayer(g128gameLoserId, registrationData).fullName,
      g128gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[33]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 129  ***/
  /*****   *****/
  const g129player1Element = document.getElementById('129player1');
  const g129player2Element = document.getElementById('129player2');
  const g129gameTableElement = document.getElementById('129gameTable');
  const g129matchWinnerElement = document.getElementById('129matchWinner');
  const g129matchScoreElement = document.getElementById('129matchScore');
  const g129Player1Id = matchData[28].player1;
  const g129Player2Id = matchData[28].player2;

  if (typeof g129Player1Id !== 'number' && typeof g129Player2Id !== 'number') {
    g129player1Element.innerText = '';
    g129player1Element.title = '';
    g129matchWinnerElement.options[1] = new Option('', '', false, false);
    g129player2Element.innerText = '';
    g129player2Element.title = '';
    g129matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g129Player1Id === 'number' && typeof g129Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g129player1Element.innerText = findPlayer(
      g129Player1Id,
      registrationData
    ).fullName;
    g129player1Element.title = g129Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g129matchWinnerElement.options[1] = new Option(
      findPlayer(g129Player1Id, registrationData).fullName,
      g129Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g129player2Element.innerText = findPlayer(
      g129Player2Id,
      registrationData
    ).fullName;
    g129player2Element.title = g129Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g129matchWinnerElement.options[2] = new Option(
      findPlayer(g129Player2Id, registrationData).fullName,
      g129Player2Id,
      false,
      false
    );
    if (g129Player1Id === matchData[28].winner) {
      // if player 1 winner, then select it from dropdown menu
      g129matchWinnerElement.options[1].selected = true;
      g129matchScoreElement.options[matchData[28].score_id].selected = true;
    }

    if (g129Player2Id === matchData[28].winner) {
      // if player 2 winner, then select it from dropdown menu
      g129matchWinnerElement.options[2].selected = true;
      g129matchScoreElement.options[matchData[28].score_id].selected = true;
    }
  }

  /* add addEventListener to match 129 save button */
  document.getElementById('saveMatch129').addEventListener('click', () => {
    let g129matchId = document.getElementById('129').cells[0].innerText;
    let g129matchWinnerFullName =
      g129matchWinnerElement.options[g129matchWinnerElement.selectedIndex]
        .label;
    let g129matchWinnerId = parseInt(
      g129matchWinnerElement.options[g129matchWinnerElement.selectedIndex].value
    );
    let g129matchScore = parseInt(
      g129matchScoreElement.options[g129matchScoreElement.selectedIndex].value
    );
    let g129gameLoserFullName = '';
    let g129gameLoserId = null;
    console.log(
      `GameID ${g129matchId} winner is ${g129matchWinnerFullName} ID ${g129matchWinnerId}`
    );

    /* Check Game 129 loser */
    if (
      g129matchWinnerId !== parseInt(g129matchWinnerElement.options[2].value)
    ) {
      g129gameLoserFullName = g129matchWinnerElement.options[2].label;
      g129gameLoserId = parseInt(g129matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g129matchId} loser is ${g129gameLoserFullName} ID ${g129gameLoserId}`
      );
    }
    if (
      g129matchWinnerId !== parseInt(g129matchWinnerElement.options[1].value)
    ) {
      g129gameLoserFullName = g129matchWinnerElement.options[1].label;
      g129gameLoserId = parseInt(g129matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g129matchId} loser is ${g129gameLoserFullName} ID ${g129gameLoserId}`
      );
    }

    /* Save */
    // match_id 129 save match results
    matchData[28].winner = g129matchWinnerId;
    matchData[28].loser = g129gameLoserId;
    matchData[28].score_id = g129matchScore;
    // clear gameTable selection to 0
    g129gameTableElement.options[0].selected = true;
    // send match_id 129 to API
    saveMatch(matchData[28]);

    /* Move match 129 Winner to new match 138 as player 1 */
    // save to Object
    matchData[37].player1 = g129matchWinnerId;
    // set cell value to player first- and lastname
    g138player1Element.innerText = findPlayer(
      g129matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g138matchWinnerElement.options[1] = new Option(
      findPlayer(g129matchWinnerId, registrationData).fullName,
      g129matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[37]);

    /* Move match 129 Loser to new match 137 as player 1 */
    // save to Object
    matchData[36].player1 = g129gameLoserId;
    // set cell value to player first- and lastname
    g137player1Element.innerText = findPlayer(
      g129gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g137matchWinnerElement.options[1] = new Option(
      findPlayer(g129gameLoserId, registrationData).fullName,
      g129gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[36]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 130  ***/
  /*****   *****/
  const g130player1Element = document.getElementById('130player1');
  const g130player2Element = document.getElementById('130player2');
  const g130gameTableElement = document.getElementById('130gameTable');
  const g130matchWinnerElement = document.getElementById('130matchWinner');
  const g130matchScoreElement = document.getElementById('130matchScore');
  const g130Player1Id = matchData[29].player1;
  const g130Player2Id = matchData[29].player2;

  if (typeof g130Player1Id !== 'number' && typeof g130Player2Id !== 'number') {
    g130player1Element.innerText = '';
    g130player1Element.title = '';
    g130matchWinnerElement.options[1] = new Option('', '', false, false);
    g130player2Element.innerText = '';
    g130player2Element.title = '';
    g130matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g130Player1Id === 'number' && typeof g130Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g130player1Element.innerText = findPlayer(
      g130Player1Id,
      registrationData
    ).fullName;
    g130player1Element.title = g130Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g130matchWinnerElement.options[1] = new Option(
      findPlayer(g130Player1Id, registrationData).fullName,
      g130Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g130player2Element.innerText = findPlayer(
      g130Player2Id,
      registrationData
    ).fullName;
    g130player2Element.title = g130Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g130matchWinnerElement.options[2] = new Option(
      findPlayer(g130Player2Id, registrationData).fullName,
      g130Player2Id,
      false,
      false
    );
    if (g130Player1Id === matchData[29].winner) {
      // if player 1 winner, then select it from dropdown menu
      g130matchWinnerElement.options[1].selected = true;
      g130matchScoreElement.options[matchData[29].score_id].selected = true;
    }

    if (g130Player2Id === matchData[29].winner) {
      // if player 2 winner, then select it from dropdown menu
      g130matchWinnerElement.options[2].selected = true;
      g130matchScoreElement.options[matchData[29].score_id].selected = true;
    }
  }

  /* add addEventListener to match 130 save button */
  document.getElementById('saveMatch130').addEventListener('click', () => {
    let g130matchId = document.getElementById('130').cells[0].innerText;
    let g130matchWinnerFullName =
      g130matchWinnerElement.options[g130matchWinnerElement.selectedIndex]
        .label;
    let g130matchWinnerId = parseInt(
      g130matchWinnerElement.options[g130matchWinnerElement.selectedIndex].value
    );
    let g130matchScore = parseInt(
      g130matchScoreElement.options[g130matchScoreElement.selectedIndex].value
    );
    let g130gameLoserFullName = '';
    let g130gameLoserId = null;
    console.log(
      `GameID ${g130matchId} winner is ${g130matchWinnerFullName} ID ${g130matchWinnerId}`
    );

    /* Check Game 130 loser */
    if (
      g130matchWinnerId !== parseInt(g130matchWinnerElement.options[2].value)
    ) {
      g130gameLoserFullName = g130matchWinnerElement.options[2].label;
      g130gameLoserId = parseInt(g130matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g130matchId} loser is ${g130gameLoserFullName} ID ${g130gameLoserId}`
      );
    }
    if (
      g130matchWinnerId !== parseInt(g130matchWinnerElement.options[1].value)
    ) {
      g130gameLoserFullName = g130matchWinnerElement.options[1].label;
      g130gameLoserId = parseInt(g130matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g130matchId} loser is ${g130gameLoserFullName} ID ${g130gameLoserId}`
      );
    }

    /* Save */
    // match_id 130 save match results
    matchData[29].winner = g130matchWinnerId;
    matchData[29].loser = g130gameLoserId;
    matchData[29].score_id = g130matchScore;
    // clear gameTable selection to 0
    g130gameTableElement.options[0].selected = true;
    // send match_id 130 to API
    saveMatch(matchData[29]);

    /* Move match 130 Winner to new match 138 as player 2 */
    // save to Object
    matchData[37].player2 = g130matchWinnerId;
    // set cell value to player first- and lastname
    g138player2Element.innerText = findPlayer(
      g130matchWinnerId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g138matchWinnerElement.options[2] = new Option(
      findPlayer(g130matchWinnerId, registrationData).fullName,
      g130matchWinnerId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[37]);

    /* Move match 130 Loser to new match 137 as player 2 */
    // save to Object
    matchData[36].player2 = g130gameLoserId;
    // set cell value to player first- and lastname
    g137player2Element.innerText = findPlayer(
      g130gameLoserId,
      registrationData
    ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    g137matchWinnerElement.options[2] = new Option(
      findPlayer(g130gameLoserId, registrationData).fullName,
      g130gameLoserId,
      false,
      false
    );
    // send player data to API
    saveMatch(matchData[36]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 131  ***/
  /*****   *****/
  const g131player1Element = document.getElementById('131player1');
  const g131player2Element = document.getElementById('131player2');
  const g131gameTableElement = document.getElementById('131gameTable');
  const g131matchWinnerElement = document.getElementById('131matchWinner');
  const g131matchScoreElement = document.getElementById('131matchScore');
  const g131Player1Id = matchData[30].player1;
  const g131Player2Id = matchData[30].player2;

  if (typeof g131Player1Id !== 'number' && typeof g131Player2Id !== 'number') {
    g131player1Element.innerText = '';
    g131player1Element.title = '';
    g131matchWinnerElement.options[1] = new Option('', '', false, false);
    g131player2Element.innerText = '';
    g131player2Element.title = '';
    g131matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g131Player1Id === 'number' && typeof g131Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g131player1Element.innerText = findPlayer(
      g131Player1Id,
      registrationData
    ).fullName;
    g131player1Element.title = g131Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g131matchWinnerElement.options[1] = new Option(
      findPlayer(g131Player1Id, registrationData).fullName,
      g131Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g131player2Element.innerText = findPlayer(
      g131Player2Id,
      registrationData
    ).fullName;
    g131player2Element.title = g131Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g131matchWinnerElement.options[2] = new Option(
      findPlayer(g131Player2Id, registrationData).fullName,
      g131Player2Id,
      false,
      false
    );
    if (g131Player1Id === matchData[30].winner) {
      // if player 1 winner, then select it from dropdown menu
      g131matchWinnerElement.options[1].selected = true;
      g131matchScoreElement.options[matchData[30].score_id].selected = true;
    }

    if (g131Player2Id === matchData[30].winner) {
      // if player 2 winner, then select it from dropdown menu
      g131matchWinnerElement.options[2].selected = true;
      g131matchScoreElement.options[matchData[30].score_id].selected = true;
    }
  }

  /* add addEventListener to match 131 save button */
  document.getElementById('saveMatch131').addEventListener('click', () => {
    let g131matchId = document.getElementById('131').cells[0].innerText;
    let g131matchWinnerFullName =
      g131matchWinnerElement.options[g131matchWinnerElement.selectedIndex]
        .label;
    let g131matchWinnerId = parseInt(
      g131matchWinnerElement.options[g131matchWinnerElement.selectedIndex].value
    );
    let g131matchScore = parseInt(
      g131matchScoreElement.options[g131matchScoreElement.selectedIndex].value
    );
    let g131gameLoserFullName = '';
    let g131gameLoserId = null;
    console.log(
      `GameID ${g131matchId} winner is ${g131matchWinnerFullName} ID ${g131matchWinnerId}`
    );

    /* Check Game 131 loser */
    if (
      g131matchWinnerId !== parseInt(g131matchWinnerElement.options[2].value)
    ) {
      g131gameLoserFullName = g131matchWinnerElement.options[2].label;
      g131gameLoserId = parseInt(g131matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g131matchId} loser is ${g131gameLoserFullName} ID ${g131gameLoserId}`
      );
    }
    if (
      g131matchWinnerId !== parseInt(g131matchWinnerElement.options[1].value)
    ) {
      g131gameLoserFullName = g131matchWinnerElement.options[1].label;
      g131gameLoserId = parseInt(g131matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g131matchId} loser is ${g131gameLoserFullName} ID ${g131gameLoserId}`
      );
    }

    /* Save */
    // match_id 131 save match results
    matchData[30].winner = g131matchWinnerId;
    matchData[30].loser = g131gameLoserId;
    matchData[30].score_id = g131matchScore;
    // clear gameTable selection to 0
    g131gameTableElement.options[0].selected = true;
    // send match_id 131 to API
    saveMatch(matchData[30]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 132  ***/
  /*****   *****/
  const g132player1Element = document.getElementById('132player1');
  const g132player2Element = document.getElementById('132player2');
  const g132gameTableElement = document.getElementById('132gameTable');
  const g132matchWinnerElement = document.getElementById('132matchWinner');
  const g132matchScoreElement = document.getElementById('132matchScore');
  const g132Player1Id = matchData[31].player1;
  const g132Player2Id = matchData[31].player2;

  if (typeof g132Player1Id !== 'number' && typeof g132Player2Id !== 'number') {
    g132player1Element.innerText = '';
    g132player1Element.title = '';
    g132matchWinnerElement.options[1] = new Option('', '', false, false);
    g132player2Element.innerText = '';
    g132player2Element.title = '';
    g132matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g132Player1Id === 'number' && typeof g132Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g132player1Element.innerText = findPlayer(
      g132Player1Id,
      registrationData
    ).fullName;
    g132player1Element.title = g132Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g132matchWinnerElement.options[1] = new Option(
      findPlayer(g132Player1Id, registrationData).fullName,
      g132Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g132player2Element.innerText = findPlayer(
      g132Player2Id,
      registrationData
    ).fullName;
    g132player2Element.title = g132Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g132matchWinnerElement.options[2] = new Option(
      findPlayer(g132Player2Id, registrationData).fullName,
      g132Player2Id,
      false,
      false
    );
    if (g132Player1Id === matchData[31].winner) {
      // if player 1 winner, then select it from dropdown menu
      g132matchWinnerElement.options[1].selected = true;
      g132matchScoreElement.options[matchData[31].score_id].selected = true;
    }

    if (g132Player2Id === matchData[31].winner) {
      // if player 2 winner, then select it from dropdown menu
      g132matchWinnerElement.options[2].selected = true;
      g132matchScoreElement.options[matchData[31].score_id].selected = true;
    }
  }

  /* add addEventListener to match 132 save button */
  document.getElementById('saveMatch132').addEventListener('click', () => {
    let g132matchId = document.getElementById('132').cells[0].innerText;
    let g132matchWinnerFullName =
      g132matchWinnerElement.options[g132matchWinnerElement.selectedIndex]
        .label;
    let g132matchWinnerId = parseInt(
      g132matchWinnerElement.options[g132matchWinnerElement.selectedIndex].value
    );
    let g132matchScore = parseInt(
      g132matchScoreElement.options[g132matchScoreElement.selectedIndex].value
    );
    let g132gameLoserFullName = '';
    let g132gameLoserId = null;
    console.log(
      `GameID ${g132matchId} winner is ${g132matchWinnerFullName} ID ${g132matchWinnerId}`
    );

    /* Check Game 132 loser */
    if (
      g132matchWinnerId !== parseInt(g132matchWinnerElement.options[2].value)
    ) {
      g132gameLoserFullName = g132matchWinnerElement.options[2].label;
      g132gameLoserId = parseInt(g132matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g132matchId} loser is ${g132gameLoserFullName} ID ${g132gameLoserId}`
      );
    }
    if (
      g132matchWinnerId !== parseInt(g132matchWinnerElement.options[1].value)
    ) {
      g132gameLoserFullName = g132matchWinnerElement.options[1].label;
      g132gameLoserId = parseInt(g132matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g132matchId} loser is ${g132gameLoserFullName} ID ${g132gameLoserId}`
      );
    }

    /* Save */
    // match_id 132 save match results
    matchData[31].winner = g132matchWinnerId;
    matchData[31].loser = g132gameLoserId;
    matchData[31].score_id = g132matchScore;
    // clear gameTable selection to 0
    g132gameTableElement.options[0].selected = true;
    // send match_id 132 to API
    saveMatch(matchData[31]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 133  ***/
  /*****   *****/
  const g133player1Element = document.getElementById('133player1');
  const g133player2Element = document.getElementById('133player2');
  const g133gameTableElement = document.getElementById('133gameTable');
  const g133matchWinnerElement = document.getElementById('133matchWinner');
  const g133matchScoreElement = document.getElementById('133matchScore');
  const g133Player1Id = matchData[32].player1;
  const g133Player2Id = matchData[32].player2;

  if (typeof g133Player1Id !== 'number' && typeof g133Player2Id !== 'number') {
    g133player1Element.innerText = '';
    g133player1Element.title = '';
    g133matchWinnerElement.options[1] = new Option('', '', false, false);
    g133player2Element.innerText = '';
    g133player2Element.title = '';
    g133matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g133Player1Id === 'number' && typeof g133Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g133player1Element.innerText = findPlayer(
      g133Player1Id,
      registrationData
    ).fullName;
    g133player1Element.title = g133Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g133matchWinnerElement.options[1] = new Option(
      findPlayer(g133Player1Id, registrationData).fullName,
      g133Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g133player2Element.innerText = findPlayer(
      g133Player2Id,
      registrationData
    ).fullName;
    g133player2Element.title = g133Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g133matchWinnerElement.options[2] = new Option(
      findPlayer(g133Player2Id, registrationData).fullName,
      g133Player2Id,
      false,
      false
    );
    if (g133Player1Id === matchData[32].winner) {
      // if player 1 winner, then select it from dropdown menu
      g133matchWinnerElement.options[1].selected = true;
      g133matchScoreElement.options[matchData[32].score_id].selected = true;
    }

    if (g133Player2Id === matchData[32].winner) {
      // if player 2 winner, then select it from dropdown menu
      g133matchWinnerElement.options[2].selected = true;
      g133matchScoreElement.options[matchData[32].score_id].selected = true;
    }
  }

  /* add addEventListener to match 133 save button */
  document.getElementById('saveMatch133').addEventListener('click', () => {
    let g133matchId = document.getElementById('133').cells[0].innerText;
    let g133matchWinnerFullName =
      g133matchWinnerElement.options[g133matchWinnerElement.selectedIndex]
        .label;
    let g133matchWinnerId = parseInt(
      g133matchWinnerElement.options[g133matchWinnerElement.selectedIndex].value
    );
    let g133matchScore = parseInt(
      g133matchScoreElement.options[g133matchScoreElement.selectedIndex].value
    );
    let g133gameLoserFullName = '';
    let g133gameLoserId = null;
    console.log(
      `GameID ${g133matchId} winner is ${g133matchWinnerFullName} ID ${g133matchWinnerId}`
    );

    /* Check Game 133 loser */
    if (
      g133matchWinnerId !== parseInt(g133matchWinnerElement.options[2].value)
    ) {
      g133gameLoserFullName = g133matchWinnerElement.options[2].label;
      g133gameLoserId = parseInt(g133matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g133matchId} loser is ${g133gameLoserFullName} ID ${g133gameLoserId}`
      );
    }
    if (
      g133matchWinnerId !== parseInt(g133matchWinnerElement.options[1].value)
    ) {
      g133gameLoserFullName = g133matchWinnerElement.options[1].label;
      g133gameLoserId = parseInt(g133matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g133matchId} loser is ${g133gameLoserFullName} ID ${g133gameLoserId}`
      );
    }

    /* Save */
    // match_id 133 save match results
    matchData[32].winner = g133matchWinnerId;
    matchData[32].loser = g133gameLoserId;
    matchData[32].score_id = g133matchScore;
    // clear gameTable selection to 0
    g133gameTableElement.options[0].selected = true;
    // send match_id 133 to API
    saveMatch(matchData[32]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 134  ***/
  /*****   *****/
  const g134player1Element = document.getElementById('134player1');
  const g134player2Element = document.getElementById('134player2');
  const g134gameTableElement = document.getElementById('134gameTable');
  const g134matchWinnerElement = document.getElementById('134matchWinner');
  const g134matchScoreElement = document.getElementById('134matchScore');
  const g134Player1Id = matchData[33].player1;
  const g134Player2Id = matchData[33].player2;

  if (typeof g134Player1Id !== 'number' && typeof g134Player2Id !== 'number') {
    g134player1Element.innerText = '';
    g134player1Element.title = '';
    g134matchWinnerElement.options[1] = new Option('', '', false, false);
    g134player2Element.innerText = '';
    g134player2Element.title = '';
    g134matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g134Player1Id === 'number' && typeof g134Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g134player1Element.innerText = findPlayer(
      g134Player1Id,
      registrationData
    ).fullName;
    g134player1Element.title = g134Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g134matchWinnerElement.options[1] = new Option(
      findPlayer(g134Player1Id, registrationData).fullName,
      g134Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g134player2Element.innerText = findPlayer(
      g134Player2Id,
      registrationData
    ).fullName;
    g134player2Element.title = g134Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g134matchWinnerElement.options[2] = new Option(
      findPlayer(g134Player2Id, registrationData).fullName,
      g134Player2Id,
      false,
      false
    );
    if (g134Player1Id === matchData[33].winner) {
      // if player 1 winner, then select it from dropdown menu
      g134matchWinnerElement.options[1].selected = true;
      g134matchScoreElement.options[matchData[33].score_id].selected = true;
    }

    if (g134Player2Id === matchData[33].winner) {
      // if player 2 winner, then select it from dropdown menu
      g134matchWinnerElement.options[2].selected = true;
      g134matchScoreElement.options[matchData[33].score_id].selected = true;
    }
  }

  /* add addEventListener to match 134 save button */
  document.getElementById('saveMatch134').addEventListener('click', () => {
    let g134matchId = document.getElementById('134').cells[0].innerText;
    let g134matchWinnerFullName =
      g134matchWinnerElement.options[g134matchWinnerElement.selectedIndex]
        .label;
    let g134matchWinnerId = parseInt(
      g134matchWinnerElement.options[g134matchWinnerElement.selectedIndex].value
    );
    let g134matchScore = parseInt(
      g134matchScoreElement.options[g134matchScoreElement.selectedIndex].value
    );
    let g134gameLoserFullName = '';
    let g134gameLoserId = null;
    console.log(
      `GameID ${g134matchId} winner is ${g134matchWinnerFullName} ID ${g134matchWinnerId}`
    );

    /* Check Game 134 loser */
    if (
      g134matchWinnerId !== parseInt(g134matchWinnerElement.options[2].value)
    ) {
      g134gameLoserFullName = g134matchWinnerElement.options[2].label;
      g134gameLoserId = parseInt(g134matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g134matchId} loser is ${g134gameLoserFullName} ID ${g134gameLoserId}`
      );
    }
    if (
      g134matchWinnerId !== parseInt(g134matchWinnerElement.options[1].value)
    ) {
      g134gameLoserFullName = g134matchWinnerElement.options[1].label;
      g134gameLoserId = parseInt(g134matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g134matchId} loser is ${g134gameLoserFullName} ID ${g134gameLoserId}`
      );
    }

    /* Save */
    // match_id 134 save match results
    matchData[33].winner = g134matchWinnerId;
    matchData[33].loser = g134gameLoserId;
    matchData[33].score_id = g134matchScore;
    // clear gameTable selection to 0
    g134gameTableElement.options[0].selected = true;
    // send match_id 134 to API
    saveMatch(matchData[33]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 135  ***/
  /*****   *****/
  const g135player1Element = document.getElementById('135player1');
  const g135player2Element = document.getElementById('135player2');
  const g135gameTableElement = document.getElementById('135gameTable');
  const g135matchWinnerElement = document.getElementById('135matchWinner');
  const g135matchScoreElement = document.getElementById('135matchScore');
  const g135Player1Id = matchData[34].player1;
  const g135Player2Id = matchData[34].player2;

  if (typeof g135Player1Id !== 'number' && typeof g135Player2Id !== 'number') {
    g135player1Element.innerText = '';
    g135player1Element.title = '';
    g135matchWinnerElement.options[1] = new Option('', '', false, false);
    g135player2Element.innerText = '';
    g135player2Element.title = '';
    g135matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g135Player1Id === 'number' && typeof g135Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g135player1Element.innerText = findPlayer(
      g135Player1Id,
      registrationData
    ).fullName;
    g135player1Element.title = g135Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g135matchWinnerElement.options[1] = new Option(
      findPlayer(g135Player1Id, registrationData).fullName,
      g135Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g135player2Element.innerText = findPlayer(
      g135Player2Id,
      registrationData
    ).fullName;
    g135player2Element.title = g135Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g135matchWinnerElement.options[2] = new Option(
      findPlayer(g135Player2Id, registrationData).fullName,
      g135Player2Id,
      false,
      false
    );
    if (g135Player1Id === matchData[34].winner) {
      // if player 1 winner, then select it from dropdown menu
      g135matchWinnerElement.options[1].selected = true;
      g135matchScoreElement.options[matchData[34].score_id].selected = true;
    }

    if (g135Player2Id === matchData[34].winner) {
      // if player 2 winner, then select it from dropdown menu
      g135matchWinnerElement.options[2].selected = true;
      g135matchScoreElement.options[matchData[34].score_id].selected = true;
    }
  }

  /* add addEventListener to match 135 save button */
  document.getElementById('saveMatch135').addEventListener('click', () => {
    let g135matchId = document.getElementById('135').cells[0].innerText;
    let g135matchWinnerFullName =
      g135matchWinnerElement.options[g135matchWinnerElement.selectedIndex]
        .label;
    let g135matchWinnerId = parseInt(
      g135matchWinnerElement.options[g135matchWinnerElement.selectedIndex].value
    );
    let g135matchScore = parseInt(
      g135matchScoreElement.options[g135matchScoreElement.selectedIndex].value
    );
    let g135gameLoserFullName = '';
    let g135gameLoserId = null;
    console.log(
      `GameID ${g135matchId} winner is ${g135matchWinnerFullName} ID ${g135matchWinnerId}`
    );

    /* Check Game 135 loser */
    if (
      g135matchWinnerId !== parseInt(g135matchWinnerElement.options[2].value)
    ) {
      g135gameLoserFullName = g135matchWinnerElement.options[2].label;
      g135gameLoserId = parseInt(g135matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g135matchId} loser is ${g135gameLoserFullName} ID ${g135gameLoserId}`
      );
    }
    if (
      g135matchWinnerId !== parseInt(g135matchWinnerElement.options[1].value)
    ) {
      g135gameLoserFullName = g135matchWinnerElement.options[1].label;
      g135gameLoserId = parseInt(g135matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g135matchId} loser is ${g135gameLoserFullName} ID ${g135gameLoserId}`
      );
    }

    /* Save */
    // match_id 135 save match results
    matchData[34].winner = g135matchWinnerId;
    matchData[34].loser = g135gameLoserId;
    matchData[34].score_id = g135matchScore;
    // clear gameTable selection to 0
    g135gameTableElement.options[0].selected = true;
    // send match_id 135 to API
    saveMatch(matchData[34]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 136  ***/
  /*****   *****/
  const g136player1Element = document.getElementById('136player1');
  const g136player2Element = document.getElementById('136player2');
  const g136gameTableElement = document.getElementById('136gameTable');
  const g136matchWinnerElement = document.getElementById('136matchWinner');
  const g136matchScoreElement = document.getElementById('136matchScore');
  const g136Player1Id = matchData[35].player1;
  const g136Player2Id = matchData[35].player2;

  if (typeof g136Player1Id !== 'number' && typeof g136Player2Id !== 'number') {
    g136player1Element.innerText = '';
    g136player1Element.title = '';
    g136matchWinnerElement.options[1] = new Option('', '', false, false);
    g136player2Element.innerText = '';
    g136player2Element.title = '';
    g136matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g136Player1Id === 'number' && typeof g136Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g136player1Element.innerText = findPlayer(
      g136Player1Id,
      registrationData
    ).fullName;
    g136player1Element.title = g136Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g136matchWinnerElement.options[1] = new Option(
      findPlayer(g136Player1Id, registrationData).fullName,
      g136Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g136player2Element.innerText = findPlayer(
      g136Player2Id,
      registrationData
    ).fullName;
    g136player2Element.title = g136Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g136matchWinnerElement.options[2] = new Option(
      findPlayer(g136Player2Id, registrationData).fullName,
      g136Player2Id,
      false,
      false
    );
    if (g136Player1Id === matchData[35].winner) {
      // if player 1 winner, then select it from dropdown menu
      g136matchWinnerElement.options[1].selected = true;
      g136matchScoreElement.options[matchData[35].score_id].selected = true;
    }

    if (g136Player2Id === matchData[35].winner) {
      // if player 2 winner, then select it from dropdown menu
      g136matchWinnerElement.options[2].selected = true;
      g136matchScoreElement.options[matchData[35].score_id].selected = true;
    }
  }

  /* add addEventListener to match 136 save button */
  document.getElementById('saveMatch136').addEventListener('click', () => {
    let g136matchId = document.getElementById('136').cells[0].innerText;
    let g136matchWinnerFullName =
      g136matchWinnerElement.options[g136matchWinnerElement.selectedIndex]
        .label;
    let g136matchWinnerId = parseInt(
      g136matchWinnerElement.options[g136matchWinnerElement.selectedIndex].value
    );
    let g136matchScore = parseInt(
      g136matchScoreElement.options[g136matchScoreElement.selectedIndex].value
    );
    let g136gameLoserFullName = '';
    let g136gameLoserId = null;
    console.log(
      `GameID ${g136matchId} winner is ${g136matchWinnerFullName} ID ${g136matchWinnerId}`
    );

    /* Check Game 136 loser */
    if (
      g136matchWinnerId !== parseInt(g136matchWinnerElement.options[2].value)
    ) {
      g136gameLoserFullName = g136matchWinnerElement.options[2].label;
      g136gameLoserId = parseInt(g136matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g136matchId} loser is ${g136gameLoserFullName} ID ${g136gameLoserId}`
      );
    }
    if (
      g136matchWinnerId !== parseInt(g136matchWinnerElement.options[1].value)
    ) {
      g136gameLoserFullName = g136matchWinnerElement.options[1].label;
      g136gameLoserId = parseInt(g136matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g136matchId} loser is ${g136gameLoserFullName} ID ${g136gameLoserId}`
      );
    }

    /* Save */
    // match_id 136 save match results
    matchData[35].winner = g136matchWinnerId;
    matchData[35].loser = g136gameLoserId;
    matchData[35].score_id = g136matchScore;
    // clear gameTable selection to 0
    g136gameTableElement.options[0].selected = true;
    // send match_id 136 to API
    saveMatch(matchData[35]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 137  ***/
  /*****   *****/
  const g137player1Element = document.getElementById('137player1');
  const g137player2Element = document.getElementById('137player2');
  const g137gameTableElement = document.getElementById('137gameTable');
  const g137matchWinnerElement = document.getElementById('137matchWinner');
  const g137matchScoreElement = document.getElementById('137matchScore');
  const g137Player1Id = matchData[36].player1;
  const g137Player2Id = matchData[36].player2;

  if (typeof g137Player1Id !== 'number' && typeof g137Player2Id !== 'number') {
    g137player1Element.innerText = '';
    g137player1Element.title = '';
    g137matchWinnerElement.options[1] = new Option('', '', false, false);
    g137player2Element.innerText = '';
    g137player2Element.title = '';
    g137matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g137Player1Id === 'number' && typeof g137Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g137player1Element.innerText = findPlayer(
      g137Player1Id,
      registrationData
    ).fullName;
    g137player1Element.title = g137Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g137matchWinnerElement.options[1] = new Option(
      findPlayer(g137Player1Id, registrationData).fullName,
      g137Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g137player2Element.innerText = findPlayer(
      g137Player2Id,
      registrationData
    ).fullName;
    g137player2Element.title = g137Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g137matchWinnerElement.options[2] = new Option(
      findPlayer(g137Player2Id, registrationData).fullName,
      g137Player2Id,
      false,
      false
    );
    if (g137Player1Id === matchData[36].winner) {
      // if player 1 winner, then select it from dropdown menu
      g137matchWinnerElement.options[1].selected = true;
      g137matchScoreElement.options[matchData[36].score_id].selected = true;
    }

    if (g137Player2Id === matchData[36].winner) {
      // if player 2 winner, then select it from dropdown menu
      g137matchWinnerElement.options[2].selected = true;
      g137matchScoreElement.options[matchData[36].score_id].selected = true;
    }
  }

  /* add addEventListener to match 137 save button */
  document.getElementById('saveMatch137').addEventListener('click', () => {
    let g137matchId = document.getElementById('137').cells[0].innerText;
    let g137matchWinnerFullName =
      g137matchWinnerElement.options[g137matchWinnerElement.selectedIndex]
        .label;
    let g137matchWinnerId = parseInt(
      g137matchWinnerElement.options[g137matchWinnerElement.selectedIndex].value
    );
    let g137matchScore = parseInt(
      g137matchScoreElement.options[g137matchScoreElement.selectedIndex].value
    );
    let g137gameLoserFullName = '';
    let g137gameLoserId = null;
    console.log(
      `GameID ${g137matchId} winner is ${g137matchWinnerFullName} ID ${g137matchWinnerId}`
    );

    /* Check Game 137 loser */
    if (
      g137matchWinnerId !== parseInt(g137matchWinnerElement.options[2].value)
    ) {
      g137gameLoserFullName = g137matchWinnerElement.options[2].label;
      g137gameLoserId = parseInt(g137matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g137matchId} loser is ${g137gameLoserFullName} ID ${g137gameLoserId}`
      );
    }
    if (
      g137matchWinnerId !== parseInt(g137matchWinnerElement.options[1].value)
    ) {
      g137gameLoserFullName = g137matchWinnerElement.options[1].label;
      g137gameLoserId = parseInt(g137matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g137matchId} loser is ${g137gameLoserFullName} ID ${g137gameLoserId}`
      );
    }

    /* Save */
    // match_id 137 save match results
    matchData[36].winner = g137matchWinnerId;
    matchData[36].loser = g137gameLoserId;
    matchData[36].score_id = g137matchScore;
    // clear gameTable selection to 0
    g137gameTableElement.options[0].selected = true;
    // send match_id 137 to API
    saveMatch(matchData[36]);

    console.table(matchData);
  });

  /*****   *****/
  /***  Match 138  ***/
  /*****   *****/
  const g138player1Element = document.getElementById('138player1');
  const g138player2Element = document.getElementById('138player2');
  const g138gameTableElement = document.getElementById('138gameTable');
  const g138matchWinnerElement = document.getElementById('138matchWinner');
  const g138matchScoreElement = document.getElementById('138matchScore');
  const g138Player1Id = matchData[37].player1;
  const g138Player2Id = matchData[37].player2;

  if (typeof g138Player1Id !== 'number' && typeof g138Player2Id !== 'number') {
    g138player1Element.innerText = '';
    g138player1Element.title = '';
    g138matchWinnerElement.options[1] = new Option('', '', false, false);
    g138player2Element.innerText = '';
    g138player2Element.title = '';
    g138matchWinnerElement.options[2] = new Option('', '', false, false);
  }

  if (typeof g138Player1Id === 'number' && typeof g138Player2Id === 'number') {
    // set cell value to player1 first- and lastname
    g138player1Element.innerText = findPlayer(
      g138Player1Id,
      registrationData
    ).fullName;
    g138player1Element.title = g138Player1Id;
    // set dropdown options to player first- and lastname, add player id as value
    g138matchWinnerElement.options[1] = new Option(
      findPlayer(g138Player1Id, registrationData).fullName,
      g138Player1Id,
      false,
      false
    );
    // set cell value to player2 first- and lastname
    g138player2Element.innerText = findPlayer(
      g138Player2Id,
      registrationData
    ).fullName;
    g138player2Element.title = g138Player2Id;
    // set dropdown options to player first- and lastname, add player id as value
    g138matchWinnerElement.options[2] = new Option(
      findPlayer(g138Player2Id, registrationData).fullName,
      g138Player2Id,
      false,
      false
    );
    if (g138Player1Id === matchData[37].winner) {
      // if player 1 winner, then select it from dropdown menu
      g138matchWinnerElement.options[1].selected = true;
      g138matchScoreElement.options[matchData[37].score_id].selected = true;
    }

    if (g138Player2Id === matchData[37].winner) {
      // if player 2 winner, then select it from dropdown menu
      g138matchWinnerElement.options[2].selected = true;
      g138matchScoreElement.options[matchData[37].score_id].selected = true;
    }
  }

  /* add addEventListener to match 138 save button */
  document.getElementById('saveMatch138').addEventListener('click', () => {
    let g138matchId = document.getElementById('138').cells[0].innerText;
    let g138matchWinnerFullName =
      g138matchWinnerElement.options[g138matchWinnerElement.selectedIndex]
        .label;
    let g138matchWinnerId = parseInt(
      g138matchWinnerElement.options[g138matchWinnerElement.selectedIndex].value
    );
    let g138matchScore = parseInt(
      g138matchScoreElement.options[g138matchScoreElement.selectedIndex].value
    );
    let g138gameLoserFullName = '';
    let g138gameLoserId = null;
    console.log(
      `GameID ${g138matchId} winner is ${g138matchWinnerFullName} ID ${g138matchWinnerId}`
    );

    /* Check Game 138 loser */
    if (
      g138matchWinnerId !== parseInt(g138matchWinnerElement.options[2].value)
    ) {
      g138gameLoserFullName = g138matchWinnerElement.options[2].label;
      g138gameLoserId = parseInt(g138matchWinnerElement.options[2].value);
      console.log(
        `GameID ${g138matchId} loser is ${g138gameLoserFullName} ID ${g138gameLoserId}`
      );
    }
    if (
      g138matchWinnerId !== parseInt(g138matchWinnerElement.options[1].value)
    ) {
      g138gameLoserFullName = g138matchWinnerElement.options[1].label;
      g138gameLoserId = parseInt(g138matchWinnerElement.options[1].value);
      console.log(
        `GameID ${g138matchId} loser is ${g138gameLoserFullName} ID ${g138gameLoserId}`
      );
    }

    /* Save */
    // match_id 138 save match results
    matchData[37].winner = g138matchWinnerId;
    matchData[37].loser = g138gameLoserId;
    matchData[37].score_id = g138matchScore;
    // clear gameTable selection to 0
    g138gameTableElement.options[0].selected = true;
    // send match_id 138 to API
    saveMatch(matchData[37]);

    console.table(matchData);
  });
}

/* PUT data to API */
function saveMatch(data) {
  // eslint-disable-next-line no-undef
  axios({
    method: 'put',
    url: apiUrlForMatch,
    data: data,
  })
    .then(response => {
      console.table(response.data);
    })
    .catch(error => console.log(error));
}

function findPlayer(id, data) {
  if (id === null) {
    return null;
  }

  const player = data.find(object => {
    return object.person_id === id;
  });
  const playerData = {
    ...player,
    fullName: player.first_name + ' ' + player.fam_name,
  };
  return playerData;
}
