'use strict';
// eltlReitingObj

// Search for post with title == "Guava"
var __FOUND = -1;
for (var i = 0; i < eltlReitingObj.length; i++) {
  if (eltlReitingObj[i].PERSONID == 3000) {
    // __FOUND is set to the index of the element
    __FOUND = i;
    break;
  }
}

// On success __FOUND will contain the index of the element
// On failure it will contain -1
console.log(__FOUND); // 2

/* local Dev or Test srv URL */
let getGurrentUrlHost = window.location.hostname;
let getGurrentUrlPort = window.location.port;
let getGurrentUrlProtocol = window.location.protocol;
let getGurrentUrlPath = window.location.pathname;
const getGurrentUrlPathLastItem = getGurrentUrlPath.substring(
  getGurrentUrlPath.lastIndexOf('/') + 1
);
let apiUrlHost = 'lt-test.ristissaar.ee';
let apiUrlPath = '/api/eltl-reiting/';
let apiUrl = `${getGurrentUrlProtocol}//${apiUrlHost}${apiUrlPath}${getGurrentUrlPathLastItem}`;

if (getGurrentUrlHost == 'localhost') {
  apiUrl = `${getGurrentUrlProtocol}//localhost:${getGurrentUrlPort}${apiUrlPath}${getGurrentUrlPathLastItem}`;
}

function addPlayerWithoutReiting2Table() {
  /* Get forms input Elements from addPlayerWithoutReiting Modal*/
  let pwrFirstNameFormInput = document.getElementById('pwrFirstName');
  let pwrLastNameFormInput = document.getElementById('pwrLastName');
  let pwrBirthdateFormInput = document.getElementById('pwrBirthdate');
  let pwrSexFormInput = document.getElementById('pwrSex');

  console.log('----- Player Without Reiting -----');
  console.log('Eesnimi: ' + pwrFirstNameFormInput.value);
  console.log('Perekonnanimi: ' + pwrLastNameFormInput.value);
  console.log('Sünniaeg: ' + pwrBirthdateFormInput.value);
  console.log('Sugu: ' + pwrSexFormInput.options[pwrSexFormInput.selectedIndex].value);
  console.log('----- End -----');

  /* TODO -> push to new obj array */
  registerTableData.push({
    rateOrder: 0,
    ratePoints: 0,
    personId: 0,
    firstLastName: pwrFirstNameFormInput.value + ' ' + pwrLastNameFormInput.value,
    birthdate: pwrBirthdateFormInput.value,
    sex: pwrSexFormInput.options[pwrSexFormInput.selectedIndex].value,
  });

  registerTableData.sort( (a, b) => b.ratePoints - a.ratePoints );

  registerTableBody.innerHTML = '';

  for (let i = 0; i < registerTableData.length; i++) {
    registerTableBody.innerHTML += `
      <tr id="reg${registerTableData[i].personId}">
        <td class="text-center">${i + 1}</td>
        <td class="text-center">${registerTableData[i].rateOrder}</td>
        <td class="text-center">${registerTableData[i].ratePoints}</td>
        <td class="text-center">${registerTableData[i].personId}</td>
        <td>${registerTableData[i].firstLastName}</td>
        <td class="text-center">${registerTableData[i].birthdate}</td>
        <td class="text-center">${registerTableData[i].sex}</td>
        <td class="text-center">
          <a class="text-danger" onclick="deleteRow()" disabled>
            <i class="fas fa-trash-alt"></i>
          </a>
        </td>
      </tr>
    `;
  }

}

/* get  competitionName element from html and display compName from LocalStorage*/
const competitionName = document.getElementById('competitionName');
competitionName.innerText = localStorage.getItem('compName')

/* get reiting and reigster table html elements */ 
const reitingsTableFull = document.getElementById('reitingsTableFull');
const registerTableBody = document.getElementById('registerTableBody');

/* display the reitings players count */
const reitingsPlayerCount = document.getElementById('reitingPlayerCount');
reitingsPlayerCount.innerHTML = reitingsTableFull.rows.length - 1;

let registerTableData = []
// add EventListener to every row to reitingsTableFull
// i = 1 skip table header
for (let i = 1; i < reitingsTableFull.rows.length; i++) {
  reitingsTableFull.rows[i].addEventListener('click', function () {

    registerTableData.push({
      rateOrder: this.cells[0].innerText,
      ratePoints: this.cells[1].innerText,
      personId: this.cells[2].innerText,
      firstLastName: this.cells[3].innerText,
      birthdate: this.cells[4].innerText,
      sex: this.cells[5].innerText,
    });

    
    registerTableData.sort( (a, b) => b.ratePoints - a.ratePoints );
    console.table(registerTableData);

    // registered player count
    const registeredPlayerCount = document.getElementById(
      'registeredPlayerCount'
    );
    registeredPlayerCount.innerHTML = registerTableData.length;
    registerTableBody.innerHTML = '';

    for (let i = 0; i < registerTableData.length; i++) {
      registerTableBody.innerHTML += `
        <tr id="reg${registerTableData[i].personId}">
          <td class="text-center">${i + 1}</td>
          <td class="text-center">${registerTableData[i].rateOrder}</td>
          <td class="text-center">${registerTableData[i].ratePoints}</td>
          <td class="text-center">${registerTableData[i].personId}</td>
          <td>${registerTableData[i].firstLastName}</td>
          <td class="text-center">${registerTableData[i].birthdate}</td>
          <td class="text-center">${registerTableData[i].sex}</td>
          <td class="text-center">
            <a class="text-danger" onclick="deleteRow()" disabled>
              <i class="fas fa-trash-alt"></i>
            </a>
          </td>
        </tr>
      `;
    }

  });
}

function deleteRow(id, no) {
  let row = document.getElementById(id)
  row.deleteRow(no);
}

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
