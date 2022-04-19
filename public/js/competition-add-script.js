'use strict';

/* local Dev or Test srv URL */
let getGurrentUrlHost = window.location.hostname;
let getGurrentUrlPort = window.location.port;
let getGurrentUrlProtocol = window.location.protocol;
let apiUrlHost = 'lt-test.ristissaar.ee';
let apiUrlPath = '/api/v1/competition';
let apiUrl = `${getGurrentUrlProtocol}//${apiUrlHost}${apiUrlPath}`;

if (getGurrentUrlHost == 'localhost') {
  apiUrl = `${getGurrentUrlProtocol}//localhost:${getGurrentUrlPort}${apiUrlPath}`;
}

/* Get forms input Elements by ID*/
const compAddDateFormInput = document.getElementById('compAddDateForm');
const compAddTimeFormInput = document.getElementById('compAddTimeForm');
const compAddNameFormInput = document.getElementById('compAddNameForm');
const compAddLocationFormInput = document.getElementById('compAddLocationForm');
const compAddUmpireFormInput = document.getElementById('compAddUmpireForm');
const compAddUmpireContactFormInput = document.getElementById(
  'compAddUmpireContactForm'
);
const compAddOrganizerFormInput = document.getElementById(
  'compAddOrganizerForm'
);
const compAddOrganizerContactFormInput = document.getElementById(
  'compAddOrganizerContactForm'
);

let messageElement = document.getElementById('message');
messageElement.style.display = 'none';

function generateCompetitionId(compName) {
  compName = compName.trim(); // removes whitespace from both sides of a string
  compName = compName.toLowerCase(); // to lowercase
  compName = compName.normalize('NFD').replace(/\p{Diacritic}/gu, ''); // Unicode property escapes
  compName = compName.replace('-', ''); // remove dash
  compName = compName.replace(',', ''); // remove dot
  compName = compName.replace(/\./g, ''); // remove dot
  compName = compName.replace(/\s+/g, '-'); // remove spaces and replace with dash
  compName = Date.now() + '-' + compName; // add timestamp @ the front of name
  return compName;
}

function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

function compAddSendFormData() {
  const compNameId = generateCompetitionId(compAddNameFormInput.value);

  console.log('ID: ' + compNameId);
  console.log('Kuupäev: ' + compAddDateFormInput.value);
  console.log('Kellaaeg: ' + compAddTimeFormInput.value);
  console.log('Võistluse nimi: ' + compAddNameFormInput.value.trim());
  console.log('Võistluskoht: ' + compAddLocationFormInput.value);
  console.log('Kohtunik: ' + compAddUmpireFormInput.value);
  console.log('Kontakttelefon: ' + compAddUmpireContactFormInput.value);
  console.log('Korraldaja: ' + compAddOrganizerFormInput.value);
  console.log('Kontakttelefon: ' + compAddOrganizerContactFormInput.value);
  localStorage.setItem('compId', compNameId);
  localStorage.setItem('compName', compAddNameFormInput.value.trim());

  axios({
    method: 'post',
    url: apiUrl,
    data: {
      compId: compNameId,
      compDate: compAddDateFormInput.value,
      compTime: compAddTimeFormInput.value,
      compName: compAddNameFormInput.value.trim(),
      compLocation: compAddLocationFormInput.value,
      compUmpire: compAddUmpireFormInput.value,
      compUmpireContact: compAddUmpireContactFormInput.value,
      compOranizer: compAddOrganizerFormInput.value,
      compOranizerContact: compAddOrganizerContactFormInput.value,
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
          // redirect after 2 seconds
          sleep(2000).then(() => {
            window.location.href =
              '/voistlus/registreeri/' + localStorage.getItem('compId');
          });
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
