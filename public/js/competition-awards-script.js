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
const apiUrlPathForMatch = '/api/v1/match/';
const apiUrlPathForComp = '/api/v1/competition/';
const apiUrlPathForRegistration = '/api/v1/registration/';

if (getGurrentUrlHost == 'localhost') {
  apiBaseUrl = `${getGurrentUrlProtocol}//${getGurrentUrlHost}:${getGurrentUrlPort}`;
}

let apiUrlForMatch = `${apiBaseUrl}${apiUrlPathForMatch}${getGurrentUrlPathLastItem}`;
let apiUrlForComp = `${apiBaseUrl}${apiUrlPathForComp}${getGurrentUrlPathLastItem}`;
let apiUrlForRegistration = `${apiBaseUrl}${apiUrlPathForRegistration}${getGurrentUrlPathLastItem}`;

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
console.log('Match API URL: ' + apiUrlForMatch);
console.log('Comp API URL: ' + apiUrlForComp);
console.log('Reg API URL: ' + apiUrlForRegistration);
console.log('----- -----');

/* GET data from API-s */
function getData() {
  // eslint-disable-next-line no-undef
  axios
    // eslint-disable-next-line no-undef
    .all([
      axios.get(apiUrlForMatch),
      axios.get(apiUrlForComp),
      axios.get(apiUrlForRegistration),
    ])
    .then(response => {
      /* Match API Data*/
      const matchData = response[0].data;

      /* Competition API Data*/
      const compData = response[1].data;

      /* Registration API Data*/
      const regData = response[2].data;

      /* get  competitionName element from html and display compName from LocalStorage*/
      const competitionName = document.getElementById('competitionName');
      competitionName.innerText = compData.comp_name;

      /* I place */
      document.getElementById('compFirstPlace').innerText = findPlayer(
        matchData[30].winner,
        regData
      ).fullName;
      /* II place */
      document.getElementById('compSecondPlace').innerText = findPlayer(
        matchData[30].loser,
        regData
      ).fullName;
      /* III place */
      document.getElementById('compThirdPlace').innerText = findPlayer(
        matchData[37].winner,
        regData
      ).fullName;

      /* Creating array with results and player data 
        1. place -> 30.winner
        2. place -> 30.loser
        3. place  37.winner and so on based on placementArray */
      const placementArray = [30, 37, 36, 35, 34, 33, 32, 31];
      let placementArrayWitdhData = [];
      for (const [i, value] of placementArray.entries()) {
        placementArrayWitdhData.push(
          findPlayer(matchData[value].winner, regData)
        );
        placementArrayWitdhData.push(
          findPlayer(matchData[value].loser, regData)
        );
      }

      const compWomanArray = findPlayerBySex('N', placementArrayWitdhData);
      document.getElementById('compBestWoman').innerText =
        compWomanArray[0].fullName;
      const compManArray = findPlayerBySex('M', placementArrayWitdhData);
      document.getElementById('compBestMan').innerText =
        compManArray[0].fullName;
    })
    .catch(error => console.log(error));
}
getData();

/* find player by sex, return array with objects */
function findPlayerBySex(sex, data) {
  const player = data.filter(element => {
    return element.sex === sex;
  });
  // console.log(player);
  return player;
}

/* find player by person_id, return array with objects */
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
