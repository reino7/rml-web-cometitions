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
const apiUrlPathForComp = '/api/v1/competition/';

if (getGurrentUrlHost == 'localhost') {
  apiBaseUrl = `${getGurrentUrlProtocol}//${getGurrentUrlHost}:${getGurrentUrlPort}`;
}

let apiUrlForRegistration = `${apiBaseUrl}${apiUrlPathForRegistration}${getGurrentUrlPathLastItem}`;
let apiUrlForMatch = `${apiBaseUrl}${apiUrlPathForMatch}${getGurrentUrlPathLastItem}`;
let apiUrlForComp = `${apiBaseUrl}${apiUrlPathForComp}${getGurrentUrlPathLastItem}`;

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

/* GET data from API-s */
function getData() {
  // eslint-disable-next-line no-undef
  axios
    // eslint-disable-next-line no-undef
    .all([
      axios.get(apiUrlForRegistration),
      axios.get(apiUrlForMatch),
      axios.get(apiUrlForComp),
    ])
    .then(response => {
      /* Registration API Data*/
      const registrationData = response[0].data;

      /* Match API Data*/
      const matchData = response[1].data;

      /* Match API Data*/
      const compData = response[2].data;

      console.table(registrationData);
      console.table(matchData);

      /* get  competitionName element from html and display compName from LocalStorage*/
      const competitionName = document.getElementById('competitionName');
      competitionName.innerText = compData.comp_name;

      // set the first 8 games in place
      for (let i = 0; i < 8; i++) {
        let gameNumberPlayer1 = 'g' + (101 + i) + 'Player1';
        let getPlayer1FullName = findPlayer(
          matchData[i].player1,
          registrationData
        ).fullName;
        if (typeof getPlayer1FullName !== 'string') {
          document.getElementById(gameNumberPlayer1).innerText = '';
        }
        if (typeof getPlayer1FullName === 'string') {
          document.getElementById(gameNumberPlayer1).innerText =
            getPlayer1FullName;
        }

        let gameNumberPlayer2 = 'g' + (101 + i) + 'Player2';
        let getPlayer2FullName = findPlayer(
          matchData[i].player2,
          registrationData
        ).fullName;
        if (typeof getPlayer2FullName !== 'string') {
          document.getElementById(gameNumberPlayer2).innerText = '';
        }
        if (typeof getPlayer2FullName === 'string') {
          document.getElementById(gameNumberPlayer2).innerText = findPlayer(
            matchData[i].player2,
            registrationData
          ).fullName;
        }
      }

      // set games from 108 -> 138
      for (let i = 0; i < 38; i++) {
        // create element value strings
        let gameNumberWinner = 'g' + (101 + i) + 'Winner';
        let gameNumberLoser = 'g' + (101 + i) + 'Loser';
        let gameNumberScore = 'g' + (101 + i) + 'Score';

        // set matchData score to a real result
        if (matchData[i].score_id === 1) {
          matchData[i].score_id = '3:0';
        }
        if (matchData[i].score_id === 2) {
          matchData[i].score_id = '3:1';
        }
        if (matchData[i].score_id === 3) {
          matchData[i].score_id = '3:2';
        }
        if (matchData[i].score_id === 4) {
          matchData[i].score_id = 'w:o';
        }

        // set winner value
        let getWinnerFullName = findPlayer(
          matchData[i].winner,
          registrationData
        ).fullName;

        // if winner value is not a string the return empty string
        if (typeof getWinnerFullName !== 'string') {
          getWinnerFullName =
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        }
        document.getElementById(gameNumberWinner).innerHTML = getWinnerFullName;

        // set loser value
        let getLoserFullName = findPlayer(
          matchData[i].loser,
          registrationData
        ).fullName;

        // if loser value is not a string the return empty string
        if (typeof getLoserFullName !== 'string') {
          getLoserFullName =
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        }
        document.getElementById(gameNumberLoser).innerHTML = getLoserFullName;

        document.getElementById(gameNumberScore).innerText =
          matchData[i].score_id;
      }
    })
    .catch(error => console.log(error));
}
getData();

function findPlayer(id, data) {
  if (id === null || id === undefined) {
    let emptyString = '';
    return emptyString;
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
