'use strict';

/* local Dev or Test srv URL */
let getGurrentUrlHost = window.location.hostname;
let getGurrentUrlPort = window.location.port;
let getGurrentUrlProtocol = window.location.protocol;
let getGurrentUrlPath = window.location.pathname;
const getGurrentUrlPathLastItem = getGurrentUrlPath.substring(
  getGurrentUrlPath.lastIndexOf('/') + 1
);
let apiUrlHost = 'lt-test.ristissaar.ee';
let apiUrlPath = '/api/competitions-schedule/';
let apiUrl = `${getGurrentUrlProtocol}//${apiUrlHost}${apiUrlPath}${getGurrentUrlPathLastItem}`;

if (getGurrentUrlHost == 'localhost') {
  apiUrl = `${getGurrentUrlProtocol}//localhost:${getGurrentUrlPort}${apiUrlPath}${getGurrentUrlPathLastItem}`;
}

/* Get forms input Elements by ID*/
const competitionDateFormInput = document.getElementById('competitionDate');
const competitionTimeFormInput = document.getElementById('competitionTime');
const competitionNameFormInput = document.getElementById('competitionName');
const competitionLocationFormInput = document.getElementById(
  'competitionLocation'
);
const competitionUmpireFormInput = document.getElementById('competitionUmpire');
const competitionUmpireContactFormInput = document.getElementById(
  'competitionUmpireContact'
);
const competitionOrganizerFormInput = document.getElementById(
  'competitionOrganizer'
);
const competitionOrganizerContactFormInput = document.getElementById(
  'competitionOrganizerContact'
);
let messageElement = document.getElementById('message');
messageElement.style.display = 'none';

/* GET competitions list from API */
// fetch('http://localhost:3000/api/competitions-schedule')
// fetch('https://lt-test.ristissaar.ee/api/competitions-schedule')
fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (dataJson) {
    appendData2Form(dataJson);
  })
  .catch(function (err) {
    console.log('error: ' + err);
  });

// Display data from API to HTML Tables
function appendData2Form(data) {
  // let parseCompetitionDate = data.comp_date.split('T');
  // competitionDateFormInput.value = parseCompetitionDate[0];
  competitionDateFormInput.value = data.comp_date;
  competitionTimeFormInput.value = data.comp_time;
  competitionNameFormInput.value = data.comp_name;
  competitionLocationFormInput.value = data.comp_location;
  competitionUmpireFormInput.value = data.comp_umpire;
  competitionUmpireContactFormInput.value = data.comp_umpire_contact;
  competitionOrganizerFormInput.value = data.comp_organizer;
  competitionOrganizerContactFormInput.value = data.comp_organizer_contact;
}

function scheduleSendFormData() {
  console.log('Kuupäev: ' + competitionDateFormInput.value);
  console.log('Kellaaeg: ' + competitionTimeFormInput.value);
  console.log('Võistluse nimi: ' + competitionNameFormInput.value);
  console.log('Võistluskoht: ' + competitionLocationFormInput.value);
  console.log('Kohtunik: ' + competitionUmpireFormInput.value);
  console.log('Kontakttelefon: ' + competitionUmpireContactFormInput.value);
  console.log('Korraldaja: ' + competitionOrganizerFormInput.value);
  console.log('Kontakttelefon: ' + competitionOrganizerContactFormInput.value);

  axios({
    method: 'put',
    url: apiUrl,
    data: {
      competitionDate: competitionDateFormInput.value,
      competitionTime: competitionTimeFormInput.value,
      competitionName: competitionNameFormInput.value,
      competitionLocation: competitionLocationFormInput.value,
      competitionUmpire: competitionUmpireFormInput.value,
      competitionUmpireContact: competitionUmpireContactFormInput.value,
      competitionOranizer: competitionOrganizerFormInput.value,
      competitionOranizerContact: competitionOrganizerContactFormInput.value,
    },
  })
    .then(function (response) {
      // console.log(response.data);
      // console.log(response.status);
      // console.log(response.statusText);
      // console.log(response.headers);
      // console.log(response.config);

      if (response.statusText === 'OK') {
        if (messageElement.style.display === 'none') {
          messageElement.style.display = 'block';
          messageElement.innerHTML =
            '<div class="alert alert-success text-center">Muudatus salvestatud</div>';
        } else {
          if (messageElement.style.display === 'none') {
            messageElement.style.display = 'block';
            messageElement.innerHTML =
              '<div class="alert alert-danger text-center">Muudatut ei salvestatud</div>';
          }
        }
      }
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}
