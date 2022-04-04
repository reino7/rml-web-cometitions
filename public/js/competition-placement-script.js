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

if (getGurrentUrlHost == 'localhost') {
  apiBaseUrl = `${getGurrentUrlProtocol}//${getGurrentUrlHost}:${getGurrentUrlPort}`;
}

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
console.log('Reg API URL: ' + apiUrlForRegistration);
console.log('----- -----');

/* get  competitionName element from html and display compName from LocalStorage*/
const competitionName = document.getElementById('competitionName');
competitionName.innerText = localStorage.getItem('compName');

/* GET data from API-s */
function getData() {
  // eslint-disable-next-line no-undef
  axios
    // eslint-disable-next-line no-undef
    .get(apiUrlForRegistration)
    .then(response => {
      // console.table(response.data);
      /* ELTL Reiting API Data*/
      const registrationData = response.data;
      console.table(registrationData);
      insertTable(registrationData);
    })
    .catch(error => console.log(error));
}
getData();

function insertTable(registrationData) {
  const placementTableBody = document.getElementById('placementTable');
  for (let i = 0; i < registrationData.length; i++) {
    placementTableBody.innerHTML += `
      <tr>
        <td class="text-center fw-bolder">${registrationData[i].reg_id}</td>
        <td>${registrationData[i].first_name}</td>
        <td>${registrationData[i].fam_name}</td>
        <td class="text-center">${registrationData[i].person_id}</td>
        <td class="text-center">${registrationData[i].birthdate}</td>
        <td class="text-center">${registrationData[i].sex}</td>
      </tr>
    `;
  }
}
