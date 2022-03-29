'use strict';

/* local Dev or Test srv URL */
let getGurrentUrlHost = window.location.hostname;
let getGurrentUrlPort = window.location.port;
let getGurrentUrlProtocol = window.location.protocol;
let apiUrlHost = 'lt-test.ristissaar.ee';
let apiUrlPath = '/api/v1/schedule';
let apiUrl = `${getGurrentUrlProtocol}//${apiUrlHost}${apiUrlPath}`;

if (getGurrentUrlHost == 'localhost') {
  apiUrl = `${getGurrentUrlProtocol}//localhost:${getGurrentUrlPort}${apiUrlPath}`;
}

/* Get forms input Elements by ID*/
const scheduleDateFormInput = document.getElementById('scheduleDate');
const scheduleTimeFormInput = document.getElementById('scheduleTime');
const scheduleNameFormInput = document.getElementById('scheduleName');
const scheduleLocationFormInput = document.getElementById('scheduleLocation');
const scheduleUmpireFormInput = document.getElementById('scheduleUmpire');
const scheduleUmpireContactFormInput = document.getElementById(
  'scheduleUmpireContact'
);
const scheduleOrganizerFormInput = document.getElementById('scheduleOrganizer');
const scheduleOrganizerContactFormInput = document.getElementById(
  'scheduleOrganizerContact'
);

let messageElement = document.getElementById('message');
messageElement.style.display = 'none';

function scheduleSendFormData() {
  console.log('Kuupäev: ' + scheduleDateFormInput.value);
  console.log('Kellaaeg: ' + scheduleTimeFormInput.value);
  console.log('Võistluse nimi: ' + scheduleNameFormInput.value);
  console.log('Võistluskoht: ' + scheduleLocationFormInput.value);
  console.log('Kohtunik: ' + scheduleUmpireFormInput.value);
  console.log('Kontakttelefon: ' + scheduleUmpireContactFormInput.value);
  console.log('Korraldaja: ' + scheduleOrganizerFormInput.value);
  console.log('Kontakttelefon: ' + scheduleOrganizerContactFormInput.value);

  axios({
    method: 'post',
    url: apiUrl,
    data: {
      scheduleDate: scheduleDateFormInput.value,
      scheduleTime: scheduleTimeFormInput.value,
      scheduleName: scheduleNameFormInput.value,
      scheduleLocation: scheduleLocationFormInput.value,
      scheduleUmpire: scheduleUmpireFormInput.value,
      scheduleUmpireContact: scheduleUmpireContactFormInput.value,
      scheduleOranizer: scheduleOrganizerFormInput.value,
      scheduleOranizerContact: scheduleOrganizerContactFormInput.value,
    },
  })
    .then(function (response) {
      // console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      // console.log(response.headers);
      // console.log(response.config);

      if (response.status === 200) {
        if (messageElement.style.display === 'none') {
          messageElement.style.display = 'block';
          messageElement.innerHTML =
            '<div class="alert alert-success text-center">Võistlus salvestatud</div>';
          console.log('Võistlus salvestatud');
        } else {
          if (messageElement.style.display === 'none') {
            messageElement.style.display = 'block';
            messageElement.innerHTML =
              '<div class="alert alert-danger text-center">Võistlust ei salvestatud</div>';
            console.log('Võistlust ei salvestatud');
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
        // console.log('Error', error.message);
      }
      // console.log(error.config);
    });
}

// function parseHtmlDateToIso(data) {
//   // console.log('Kuupäev HTML Input: ' + scheduleDateFormInput.value);
//   let datePieces = data.split('-');

//   let year = datePieces[0];
//   let month = datePieces[1];
//   let day = datePieces[2];

//   let isoDate = `${day}-${month}-${year}`;
//   // console.log('Kuupäev ISO: ' + isoDate);
//   let newDate = new Date(data);
//   // console.log('newDate: ' + newDate);
//   let newDateJson = newDate.toJSON();
//   // console.log('newDateJson: ' + newDateJson);
//   return newDateJson;
// }
