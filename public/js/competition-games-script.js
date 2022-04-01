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

  /* Game 101 -> 1 vs 16 */
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
    // g114player1Element.innerText = findPlayer(
    //   g101gameLoserId,
    //   registrationData
    // ).fullName;
    // set dropdown options to player first- and lastname, add player id as value
    // g114matchWinnerElement.options[1] = new Option(
    //   findPlayer(g101gameLoserId, registrationData).fullName,
    //   g101gameLoserId,
    //   false,
    //   false
    // );

    // send player data to API
    saveMatch(matchData[13]);

    console.table(matchData);
  });

  /* Game 102 -> 9 vs 8 */
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
    g102matchScoreElement.options[matchData[0].score_id].selected = true;
  }

  if (
    matchData[1].winner === parseInt(g102matchWinnerElement.options[2].value)
  ) {
    g102matchWinnerElement.options[2].selected = true;
    g102matchScoreElement.options[matchData[0].score_id].selected = true;
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
    matchData[8].player1 = g102matchWinnerId;
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
    /* Move match 102 Loser to new match 114 as player 2 */
    matchData[13].player1 = g102gameLoserId;
    // g114player2Element.innerText = findPlayer(
    //   g102gameLoserId,
    //   registrationData
    // ).fullName;

    // send player data to API
    saveMatch(matchData[13]);

    console.table(matchData);
  });

  /* Game 103 -> 5 vs 12 */
  // set title as player id
  const g103player1Element = document.getElementById('103player1');
  const g103player2Element = document.getElementById('103player2');
  const g103matchWinnerElement = document.getElementById('103matchWinner');
  const g103Player1Id = registrationData[4].person_id;
  const g103Player2Id = registrationData[11].person_id;
  const g103Player1FullName =
    registrationData[4].first_name + ' ' + registrationData[4].fam_name;
  const g103Player2FullName =
    registrationData[11].first_name + ' ' + registrationData[11].fam_name;

  g103player1Element.title = g103Player1Id;
  g103player2Element.title = g103Player2Id;
  // set cell value to player first- and lastname
  g103player1Element.innerText = g103Player1FullName;
  g103player2Element.innerText = g103Player2FullName;
  // set dropdown options to player first- and lastname, add player id as value
  g103matchWinnerElement.options[1] = new Option(
    g103Player1FullName,
    g103Player1Id,
    false,
    false
  );
  document.getElementById('103matchWinner').options[2] = new Option(
    g103Player2FullName,
    g103Player2Id,
    false,
    false
  );
  // match_id 103 save data
  matchData[2].player1 = g103Player1Id;
  matchData[2].player2 = g103Player2Id;

  /* Game 104 -> 13 vs 4 */
  // set title as player id
  const g104player1Element = document.getElementById('104player1');
  const g104player2Element = document.getElementById('104player2');
  const g104matchWinnerElement = document.getElementById('104matchWinner');
  const g104Player1Id = registrationData[12].person_id;
  const g104Player2Id = registrationData[3].person_id;
  const g104Player1FullName =
    registrationData[12].first_name + ' ' + registrationData[12].fam_name;
  const g104Player2FullName =
    registrationData[3].first_name + ' ' + registrationData[3].fam_name;

  g104player1Element.title = g104Player1Id;
  g104player2Element.title = g104Player2Id;
  // set cell value to player first- and lastname
  g104player1Element.innerText = g104Player1FullName;
  g104player2Element.innerText = g104Player2FullName;
  // set dropdown options to player first- and lastname, add player id as value
  g104matchWinnerElement.options[1] = new Option(
    g104Player1FullName,
    g104Player1Id,
    false,
    false
  );
  document.getElementById('104matchWinner').options[2] = new Option(
    g104Player2FullName,
    g104Player2Id,
    false,
    false
  );
  // match_id 104 save data
  matchData[3].player1 = g104Player1Id;
  matchData[3].player2 = g104Player2Id;

  /* Game 105 -> 3 vs 14 */
  // set title as player id
  const g105player1Element = document.getElementById('105player1');
  const g105player2Element = document.getElementById('105player2');
  const g105matchWinnerElement = document.getElementById('105matchWinner');
  const g105Player1Id = registrationData[2].person_id;
  const g105Player2Id = registrationData[13].person_id;
  const g105Player1FullName =
    registrationData[2].first_name + ' ' + registrationData[2].fam_name;
  const g105Player2FullName =
    registrationData[13].first_name + ' ' + registrationData[13].fam_name;

  g105player1Element.title = g105Player1Id;
  g105player2Element.title = g105Player2Id;
  // set cell value to player first- and lastname
  g105player1Element.innerText = g105Player1FullName;
  g105player2Element.innerText = g105Player2FullName;
  // set dropdown options to player first- and lastname, add player id as value
  g105matchWinnerElement.options[1] = new Option(
    g105Player1FullName,
    g105Player1Id,
    false,
    false
  );
  document.getElementById('105matchWinner').options[2] = new Option(
    g105Player2FullName,
    g105Player2Id,
    false,
    false
  );
  // match_id 105 save data
  matchData[4].player1 = g105Player1Id;
  matchData[4].player2 = g105Player2Id;

  /* Game 106 -> 11 vs 6 */
  // set title as player id
  const g106player1Element = document.getElementById('106player1');
  const g106player2Element = document.getElementById('106player2');
  const g106matchWinnerElement = document.getElementById('106matchWinner');
  const g106Player1Id = registrationData[10].person_id;
  const g106Player2Id = registrationData[5].person_id;
  const g106Player1FullName =
    registrationData[10].first_name + ' ' + registrationData[10].fam_name;
  const g106Player2FullName =
    registrationData[5].first_name + ' ' + registrationData[5].fam_name;

  g106player1Element.title = g106Player1Id;
  g106player2Element.title = g106Player2Id;
  // set cell value to player first- and lastname
  g106player1Element.innerText = g106Player1FullName;
  g106player2Element.innerText = g106Player2FullName;
  // set dropdown options to player first- and lastname, add player id as value
  g106matchWinnerElement.options[1] = new Option(
    g106Player1FullName,
    g106Player1Id,
    false,
    false
  );
  document.getElementById('106matchWinner').options[2] = new Option(
    g106Player2FullName,
    g106Player2Id,
    false,
    false
  );
  // match_id 106 save data
  matchData[5].player1 = g106Player1Id;
  matchData[5].player2 = g106Player2Id;

  /* Game 107 -> 7 vs 10 */
  // set title as player id
  const g107player1Element = document.getElementById('107player1');
  const g107player2Element = document.getElementById('107player2');
  const g107matchWinnerElement = document.getElementById('107matchWinner');
  const g107Player1Id = registrationData[6].person_id;
  const g107Player2Id = registrationData[9].person_id;
  const g107Player1FullName =
    registrationData[6].first_name + ' ' + registrationData[6].fam_name;
  const g107Player2FullName =
    registrationData[9].first_name + ' ' + registrationData[9].fam_name;

  g107player1Element.title = g107Player1Id;
  g107player2Element.title = g107Player2Id;
  // set cell value to player first- and lastname
  g107player1Element.innerText = g107Player1FullName;
  g107player2Element.innerText = g107Player2FullName;
  // set dropdown options to player first- and lastname, add player id as value
  g107matchWinnerElement.options[1] = new Option(
    g107Player1FullName,
    g107Player1Id,
    false,
    false
  );
  document.getElementById('107matchWinner').options[2] = new Option(
    g107Player2FullName,
    g107Player2Id,
    false,
    false
  );
  // match_id 107 save data
  matchData[6].player1 = g107Player1Id;
  matchData[6].player2 = g107Player2Id;

  /* Game 108 -> 15 vs 2 */
  // set title as player id
  const g108player1Element = document.getElementById('108player1');
  const g108player2Element = document.getElementById('108player2');
  const g108matchWinnerElement = document.getElementById('108matchWinner');
  const g108Player1Id = registrationData[14].person_id;
  const g108Player2Id = registrationData[1].person_id;
  const g108Player1FullName =
    registrationData[14].first_name + ' ' + registrationData[14].fam_name;
  const g108Player2FullName =
    registrationData[1].first_name + ' ' + registrationData[1].fam_name;

  g108player1Element.title = g108Player1Id;
  g108player2Element.title = g108Player2Id;
  // set cell value to player first- and lastname
  g108player1Element.innerText = g108Player1FullName;
  g108player2Element.innerText = g108Player2FullName;
  // set dropdown options to player first- and lastname, add player id as value
  g108matchWinnerElement.options[1] = new Option(
    g108Player1FullName,
    g108Player1Id,
    false,
    false
  );
  document.getElementById('108matchWinner').options[2] = new Option(
    g108Player2FullName,
    g108Player2Id,
    false,
    false
  );
  // match_id 108 save data
  matchData[7].player1 = g108Player1Id;
  matchData[7].player2 = g108Player2Id;

  /* Match 109 -> player1 => winner 101  vs player2 => winner 102 */
  const g109player1Element = document.getElementById('109player1');
  const g109player2Element = document.getElementById('109player2');
  const g109matchWinnerElement = document.getElementById('109matchWinner');
  const g109Player1Id = matchData[8].player1;
  const g109Player2Id = matchData[8].player2;

  if (typeof matchData[8].player1 === 'number') {
    // set cell value to player first- and lastname
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
  }

  if (typeof matchData[8].player2 === 'number') {
    // set cell value to player first- and lastname
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
  }
  console.table(matchData);
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
