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
      console.log(placementArrayWitdhData);
      /* I place overall */
      if (placementArrayWitdhData[0] === null) {
        document.getElementById('compFirstPlace').innerText = '';
      }
      if (placementArrayWitdhData[0] !== null) {
        document.getElementById('compFirstPlace').innerText =
          placementArrayWitdhData[0].fullName;
      }
      /* II place overall */
      if (placementArrayWitdhData[1] === null) {
        document.getElementById('compFirstPlace').innerText = '';
      }
      if (placementArrayWitdhData[1] !== null) {
        document.getElementById('compSecondPlace').innerText =
          placementArrayWitdhData[1].fullName;
      }

      /* III place overall */
      if (placementArrayWitdhData[2] === null) {
        document.getElementById('compFirstPlace').innerText = '';
      }
      if (placementArrayWitdhData[2] !== null) {
        document.getElementById('compThirdPlace').innerText =
          placementArrayWitdhData[2].fullName;
      }

      /* Best MAN overall */
      const compManArray = findPlayerBySex('M', placementArrayWitdhData);
      console.log(compManArray);
      document.getElementById('compBestMan').innerText =
        compManArray[0].fullName;
      /* Best WOMAN overall */
      const compWomanArray = findPlayerBySex('N', placementArrayWitdhData);
      document.getElementById('compBestWoman').innerText =
        compWomanArray[0].fullName;

      /* Best of boys/men between the age of 0 and 10 */
      const boysBetween0and10Array = findPlayerBySexAndAge(
        'M',
        0,
        10,
        placementArrayWitdhData
      );
      // if array is empty then display nothing
      if (boysBetween0and10Array.length === 0) {
        document.getElementById('boysBetween0and10').innerHTML = '';
      }
      // if array lenght is larger then 0, then loop it
      if (boysBetween0and10Array.length > 0) {
        for (let i = 0; i < boysBetween0and10Array.length; i++) {
          document.getElementById('boysBetween0and10').innerHTML += `
            <tr>
              <th scope="row">${i + 1}.</th>
              <td>${boysBetween0and10Array[i].fullName}</td>

          `;
        }
      }

      /* Best of girls/women between the age of 0 and 10 */
      const girlsBetween0and10Array = findPlayerBySexAndAge(
        'N',
        0,
        10,
        placementArrayWitdhData
      );
      // if array is empty then display nothing
      if (girlsBetween0and10Array.length === 0) {
        document.getElementById('girlsBetween0and10').innerHTML = '';
      }
      // if array lenght is larger then 0, then loop it
      if (girlsBetween0and10Array.length > 0) {
        for (let i = 0; i < girlsBetween0and10Array.length; i++) {
          document.getElementById('girlsBetween0and10').innerHTML += `
            <tr>
              <th scope="row">${i + 1}.</th>
              <td>${girlsBetween0and10Array[i].fullName}</td>

          `;
        }
      }

      console.log(placementArrayWitdhData);
      console.log(compManArray);
      console.log(compWomanArray);
      console.log(boysBetween0and10Array);
    })
    .catch(error => console.log(error));
}
getData();

/* find player by sex, return array with objects */
function findPlayerBySex(sex, data) {
  const player = data.filter(element => {
    return element.sex === sex;
  });
  return player;
}

/* find player by sex and age, return array with objects */
function findPlayerBySexAndAge(sex, ageStart, ageEnd, data) {
  const player = data.filter(element => {
    return (
      element.sex === sex && element.age >= ageStart && element.age <= ageEnd
    );
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

  let startDate = new Date();

  const playerData = {
    ...player,
    fullName: player.first_name + ' ' + player.fam_name,
    calcAge: function () {
      const endDate = new Date(player.birthdate);
      this.age = Math.abs(moment.duration(endDate - startDate).years());
      return this.age;
    },
  };
  playerData.calcAge();
  return playerData;
}
