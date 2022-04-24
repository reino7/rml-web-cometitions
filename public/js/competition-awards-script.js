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

console.log('%c----- -----', `color: red`);
console.log(
  '%cVõistluse Nimi: ' + '%c' + localStorage.getItem('compName'),
  `color: red`,
  `color: green`
);
console.log(
  '%cVõistluse ID: ' + '%c' + localStorage.getItem('compId'),
  `color: red`,
  `color: green`
);
console.log(
  '%cVõistluse ID from URL: ' + '%c' + getGurrentUrlPathLastItem,
  `color: red`,
  `color: green`
);
console.log('%cMatch API URL: ' + apiUrlForMatch, `color: red`);
console.log('%cComp API URL: ' + apiUrlForComp, `color: red`);
console.log('%cReg API URL: ' + apiUrlForRegistration, `color: red`);
console.log('%c----- -----', `color: red`);

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
        if (typeof matchData[value].winner === 'number') {
          placementArrayWitdhData.push(
            findPlayer(matchData[value].winner, regData)
          );
        }
        if (typeof matchData[value].loser === 'number') {
          placementArrayWitdhData.push(
            findPlayer(matchData[value].loser, regData)
          );
        }
      }

      /* I place overall */
      if (placementArrayWitdhData[0] === undefined) {
        document.getElementById('compFirstPlace').innerText = '';
      }
      if (placementArrayWitdhData[0] !== undefined) {
        document.getElementById('compFirstPlace').innerText =
          placementArrayWitdhData[0].fullName;
      }
      /* II place overall */
      if (placementArrayWitdhData[1] === undefined) {
        document.getElementById('compSecondPlace').innerText = '';
      }
      if (placementArrayWitdhData[1] !== undefined) {
        document.getElementById('compSecondPlace').innerText =
          placementArrayWitdhData[1].fullName;
      }

      /* III place overall */
      if (placementArrayWitdhData[2] === undefined) {
        document.getElementById('compThirdPlace').innerText = '';
      }
      if (placementArrayWitdhData[2] !== undefined) {
        document.getElementById('compThirdPlace').innerText =
          placementArrayWitdhData[2].fullName;
      }

      /* Best MAN overall */
      const compManArray = findPlayerBySex('M', placementArrayWitdhData);
      if (compManArray.length === 0) {
        document.getElementById('compBestMan').innerText = '';
      }
      if (compManArray.length >= 1) {
        document.getElementById('compBestMan').innerText =
          compManArray[0].fullName;
      }
      /* Best WOMAN overall */
      const compWomanArray = findPlayerBySex('N', placementArrayWitdhData);
      if (compWomanArray.length === 0) {
        document.getElementById('compBestWoman').innerText = '';
      }
      if (compWomanArray.length >= 1) {
        document.getElementById('compBestWoman').innerText =
          compWomanArray[0].fullName;
      }

      /* Best of boys/men between the age of 0 and 10 */
      findPlayersByAgeGroup(
        'M',
        0,
        10,
        'boysBetween0and10',
        placementArrayWitdhData
      );

      /* Best of girls/women between the age of 0 and 10 */
      findPlayersByAgeGroup(
        'N',
        0,
        10,
        'girlsBetween0and10',
        placementArrayWitdhData
      );

      /* Best of boys/men between the age of 11 and 14 */
      findPlayersByAgeGroup(
        'M',
        11,
        14,
        'boysBetween11and14',
        placementArrayWitdhData
      );

      /* Best of girls/women between the age of 11 and 14 */
      findPlayersByAgeGroup(
        'N',
        11,
        14,
        'girlsBetween11and14',
        placementArrayWitdhData
      );

      /* Best of boys/men between the age of 15 and 18 */
      findPlayersByAgeGroup(
        'M',
        15,
        18,
        'boysBetween15and18',
        placementArrayWitdhData
      );

      /* Best of girls/women between the age of 15 and 18 */
      findPlayersByAgeGroup(
        'N',
        15,
        18,
        'girlsBetween15and18',
        placementArrayWitdhData
      );

      /* Best of MEN between the age of 19 and 34 */
      findPlayersByAgeGroup(
        'M',
        19,
        34,
        'menBetween19and34',
        placementArrayWitdhData
      );
      /* Best of WOMEN between the age of 19 and 34 */
      findPlayersByAgeGroup(
        'N',
        19,
        34,
        'womenBetween19and34',
        placementArrayWitdhData
      );

      /* Best of MEN between the age of 35 and 49 */
      findPlayersByAgeGroup(
        'M',
        35,
        49,
        'menBetween35and49',
        placementArrayWitdhData
      );
      /* Best of WOMEN between the age of 35 and 34 */
      findPlayersByAgeGroup(
        'N',
        35,
        44,
        'womenBetween35and44',
        placementArrayWitdhData
      );

      /* Best of MEN between the age of 50 and 59 */
      findPlayersByAgeGroup(
        'M',
        50,
        59,
        'menBetween50and59',
        placementArrayWitdhData
      );
      /* Best of WOMEN between the age of 45 and 54 */
      findPlayersByAgeGroup(
        'N',
        45,
        54,
        'womenBetween45and54',
        placementArrayWitdhData
      );

      /* Best of MEN between the age of 60 and 69 */
      findPlayersByAgeGroup(
        'M',
        60,
        69,
        'menBetween60and69',
        placementArrayWitdhData
      );
      /* Best of WOMEN between the age of 55 and 64 */
      findPlayersByAgeGroup(
        'N',
        55,
        64,
        'womenBetween55and64',
        placementArrayWitdhData
      );

      /* Best of MEN between the age of 70 and older */
      findPlayersByAgeGroup(
        'M',
        70,
        100,
        'menBetween70andOlder',
        placementArrayWitdhData
      );
      /* Best of WOMEN between the age of 65 and older */
      findPlayersByAgeGroup(
        'N',
        65,
        100,
        'womenBetween65andOlder',
        placementArrayWitdhData
      );

      console.table(placementArrayWitdhData);
      console.table(compManArray);
      console.table(compWomanArray);
    })
    .catch(error => console.log(error));
}
getData();

/* display filtered players by age and sex */
function findPlayersByAgeGroup(sex, ageStart, ageEnd, displayElement, data) {
  const filterResults = findPlayerBySexAndAge(sex, ageStart, ageEnd, data);
  // if array is empty then display nothing
  if (filterResults.length === 0) {
    document.getElementById(displayElement).innerHTML = 'Võistlejaid ei leitud';
  }
  // if array lenght is larger then 0, then loop it
  if (filterResults.length > 0) {
    for (let i = 0; i < filterResults.length; i++) {
      document.getElementById(displayElement).innerHTML += `
            <tr>
              <th scope="row">${i + 1}.</th>
              <td>${filterResults[i].fullName}</td>

          `;
    }
  }
}

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
