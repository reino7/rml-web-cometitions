'use strict';
console.log('----- -----');
console.log('Võistluse Nimi: ' + localStorage.getItem('compName'))
console.log('Võistluse ID: ' + localStorage.getItem('compId'))
console.log('----- -----');

/* local Dev or Test srv URL */
let getGurrentUrlHost = window.location.hostname;
let getGurrentUrlPort = window.location.port;
let getGurrentUrlProtocol = window.location.protocol;
let getGurrentUrlPath = window.location.pathname;
const getGurrentUrlPathLastItem = getGurrentUrlPath.substring(
  getGurrentUrlPath.lastIndexOf('/') + 1
);
let apiUrlHost = 'lt-test.ristissaar.ee';
let apiUrlPath = '/api/registration/';
let apiUrl = `${getGurrentUrlProtocol}//${apiUrlHost}${apiUrlPath}${getGurrentUrlPathLastItem}`;

if (getGurrentUrlHost == 'localhost') {
  apiUrl = `${getGurrentUrlProtocol}//localhost:${getGurrentUrlPort}${apiUrlPath}${getGurrentUrlPathLastItem}`;
}



/* get  competitionName element from html and display compName from LocalStorage*/
const competitionName = document.getElementById('competitionName');
competitionName.innerText = localStorage.getItem('compName')

/* get reiting and reigster table html elements */ 
const reitingsTableFull = document.getElementById('reitingsTableFull');
const registerTableFull = document.getElementById('registerTableFull');
const registerTableBody = document.getElementById('registerTableBody');

/* display the reitings players count */
const reitingsPlayerCount = document.getElementById('reitingPlayerCount');
reitingsPlayerCount.innerHTML = reitingsTableFull.rows.length - 1;

let messageElement = document.getElementById('message');
messageElement.style.display = 'none';

let registerTableData = []
let rowIndexValue;

function idForPlayerWithoutReiting() {
  if (localStorage.getItem('lastPlayerWithoutId')) {
    const lastPlayerWithoutId = parseInt(localStorage.getItem('lastPlayerWithoutId')) +1;
    localStorage.setItem('lastPlayerWithoutId', lastPlayerWithoutId)
    return lastPlayerWithoutId;
  } else {
    const lastPlayerWithoutId = 100000;
    localStorage.setItem('lastPlayerWithoutId', lastPlayerWithoutId)
    return lastPlayerWithoutId;
  }
}

function addPlayerWithoutReiting2Table() {
  /* Get forms input Elements from addPlayerWithoutReiting Modal*/
  let pwrFirstNameFormInput = document.getElementById('pwrFirstName');
  let pwrLastNameFormInput = document.getElementById('pwrLastName');
  let pwrBirthdateFormInput = document.getElementById('pwrBirthdate');
  let pwrSexFormInput = document.getElementById('pwrSex');
  let playerWithoutReitingPersonId = idForPlayerWithoutReiting();

  console.log('----- Player Without Reiting -----');
  console.log('playerWithoutReitingPersonId: ' + playerWithoutReitingPersonId);
  console.log('Eesnimi: ' + (pwrFirstNameFormInput.value).toUpperCase());
  console.log('Perekonnanimi: ' + (pwrLastNameFormInput.value).toUpperCase());
  console.log('Sünniaeg: ' + pwrBirthdateFormInput.value);
  console.log('Sugu: ' + pwrSexFormInput.options[pwrSexFormInput.selectedIndex].value);
  console.log('----- End -----');

  /* array to show in the registerTableBody */
  registerTableData.push({
    rateOrder: 0,
    ratePoints: 0,
    personId: playerWithoutReitingPersonId,
    firstName: (pwrFirstNameFormInput.value).toUpperCase(),
    famName: (pwrLastNameFormInput.value).toUpperCase(),
    birthdate: pwrBirthdateFormInput.value,
    sex: pwrSexFormInput.options[pwrSexFormInput.selectedIndex].value,
    compId: localStorage.getItem('compId')
  });

  registerTableData.sort( (a, b) => b.ratePoints - a.ratePoints );

  reloadRows()
  
  console.table(registerTableData);

}

function countRegisteredPlayers(){
  const registeredPlayerCount = document.getElementById(
    'registeredPlayerCount'
  );
  for (let i = 0; i < registerTableFull.rows.length; i++) {
    return registeredPlayerCount.innerHTML = registerTableFull.rows.length;
  }
}

function deleteRow() {
  for (let i = 0; i < registerTableFull.rows.length; i++) {
    registerTableFull.rows[i].addEventListener('click', function() {
      rowIndexValue = registerTableFull.rows[i].rowIndex;
      console.log(rowIndexValue)
      registerTableFull.deleteRow(rowIndexValue)
      registerTableData.splice(rowIndexValue-1, 1)
      reloadRows();
      console.table(registerTableData);

    });
  }
}

function reloadRows() {
  registerTableBody.innerHTML = '';

  for (let i = 0; i < registerTableData.length; i++) {
    registerTableBody.innerHTML += `
      <tr id="reg${registerTableData[i].personId}" class="">
        <td class="text-center">${i + 1}</td>
        <td class="text-center">${registerTableData[i].rateOrder}</td>
        <td class="text-center">${registerTableData[i].ratePoints}</td>
        <td class="text-center">${registerTableData[i].personId}</td>
        <td>${registerTableData[i].firstName}</td>
        <td>${registerTableData[i].famName}</td>
        <td class="text-center">${registerTableData[i].birthdate}</td>
        <td class="text-center">${registerTableData[i].sex}</td>
        <td class="text-center">
          <a class="text-danger" onclick="deleteRow()">
            <i class="fas fa-trash-alt"></i>
          </a>
        </td>
      </tr>
    `;
  }

}

// add EventListener to every row to reitingsTableFull
// i = 1 skip table header
for (let i = 1; i < reitingsTableFull.rows.length; i++) {
  reitingsTableFull.rows[i].addEventListener('click', function () {
    /* display registered player count */
    countRegisteredPlayers();

    /* needs furder testing before use
    console.log(this.cells[2].innerText);
    let findPersonId = Object.values(eltlReitingObj).find(obj => {
      return obj.PERSONID == parseInt(this.cells[2].innerText);
    });
    console.log(findPersonId);
    registerTableData.push(findPersonId)
    */
    if (this.cells[0].innerText == '' && this.cells[1].innerText == '') {
      this.cells[0].innerText = 0;
      this.cells[1].innerText = 0;
    }
    /* array to show in the registerTableBody */
    registerTableData.push({
      rateOrder: this.cells[0].innerText,
      ratePoints: this.cells[1].innerText,
      personId: parseInt(this.cells[2].innerText),
      firstName: this.cells[3].innerText,
      famName: this.cells[4].innerText,
      birthdate: this.cells[5].innerText,
      sex: this.cells[6].innerText,
      compId: localStorage.getItem('compId')
    });

    registerTableData.sort((a, b) => b.ratePoints - a.ratePoints);
    console.table(registerTableData);

    reloadRows()

  });
}

function registerPlayers() {
  console.log('Data 2 Axios');
  console.table(registerTableData);
  
  axios({
    method: 'post',
    url: apiUrl,
    data: registerTableData,
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
            '<div class="alert alert-success text-center">Registreeritud mängijad salvestatud</div>';
          console.log('Registreeritud mängijad salvestatud');
          // setTimeout(() => {  window.location.href = "/voistlus/mangud/"; }, 2000); // redirect after 2 seconds
        } else {
          if (messageElement.style.display === 'none') {
            messageElement.style.display = 'block';
            messageElement.innerHTML =
              '<div class="alert alert-danger text-center">Registreeritud mängijaid ei salvestatud</div>';
            console.log('Registreeritud mängijaid ei salvestatud');
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


// function deleteRow(btn) {
//   let id = btn.parentNode.parentNode.id;
//   console.log(id);
//   let row = btn.parentNode.parentNode;
//   console.log(row);
//   // row.parentNode.removeChild(row);

// }

// function deleteRow(id) {
//   console.log(id)
//   // let row = document.getElementById(id.toString());
//   // row.classList.add("visually-hidden");
// }

function searchTableData() {
  let input, filter, table, tr, td, cell, i, j;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('reitingsTableFull');
  tr = table.getElementsByTagName('tr');
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = 'none';

    td = tr[i].getElementsByTagName('td');
    for (j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName('td')[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
          break;
        }
      }
    }
  }
}
