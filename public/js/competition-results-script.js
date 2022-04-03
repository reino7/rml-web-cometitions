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

/* GET data from API-s */
function getData() {
  // eslint-disable-next-line no-undef
  axios
    // eslint-disable-next-line no-undef
    .all([axios.get(apiUrlForRegistration), axios.get(apiUrlForMatch)])
    .then(response => {
      // console.table(response[0].data);
      // console.table(response[1].data);
      /* ELTL Reiting API Data*/
      const registrationData = response[0].data;
      /* Match API Data*/
      const matchData = response[1].data;
      console.table(matchData);

      insertTable(registrationData, matchData);
    })
    .catch(error => console.log(error));
}
getData();

function insertTable(registrationData, matchData) {
  const resultsTableBody = document.getElementById('resultsTable');
  const placementArray = [30, 37, 36, 35, 34, 33, 32, 31];
  for (const [i, value] of placementArray.entries()) {
    console.log('%d: %s', i, value);
    resultsTableBody.innerHTML += `
    <tr>
      <td class="text-center fw-bolder"></td>
      <td>${
        findPlayer(matchData[value].winner, registrationData).first_name
      }</td>
      <td>${findPlayer(matchData[value].winner, registrationData).fam_name}</td>
      <td class="text-center">${matchData[value].winner}</td>
      <td class="text-center">${
        findPlayer(matchData[value].winner, registrationData).birthdate
      }</td>
      <td class="text-center">${
        findPlayer(matchData[value].winner, registrationData).sex
      }</td>
    </tr>
    <tr>
      <td class="text-center fw-bolder"></td>
      <td>${
        findPlayer(matchData[value].loser, registrationData).first_name
      }</td>
      <td>${findPlayer(matchData[value].loser, registrationData).fam_name}</td>
      <td class="text-center">${matchData[value].loser}</td>
      <td class="text-center">${
        findPlayer(matchData[value].loser, registrationData).birthdate
      }</td>
      <td class="text-center">${
        findPlayer(matchData[value].loser, registrationData).sex
      }</td>
    </tr>
  `;
  }

  const placement = document.querySelectorAll('.fw-bolder');

  for (let i = 0; i < placement.length; i++) {
    const element = placement[i];
    element.innerText = i + 1;
  }
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
