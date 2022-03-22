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
const registerTableFull = document.getElementById('registerTableFull');
const registerTableBody = document.getElementById('registerTableBody');

/* display the reitings players count */
const reitingsPlayerCount = document.getElementById('reitingPlayerCount');
reitingsPlayerCount.innerHTML = reitingsTableFull.rows.length - 1;


let registerTableData = []
let registerTablePersonId = []
let rowIndexValue;

function find(n){
  let found = "";
  found = eltlReitingObj.find(element => parseInt(n));
  console.log(found);
  return found;
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
        <td>${registerTableData[i].firstLastName}</td>
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

    // console.log(this)
    registerTableData.push({
      rateOrder: this.cells[0].innerText,
      ratePoints: this.cells[1].innerText,
      personId: parseInt(this.cells[2].innerText),
      firstLastName: this.cells[3].innerText,
      birthdate: this.cells[4].innerText,
      sex: this.cells[5].innerText,
    });
    // registerTablePersonId.push({
    //   personId: parseInt(this.cells[2].innerText),
    // });

    registerTableData.sort((a, b) => b.ratePoints - a.ratePoints);
    // console.table(registerTablePersonId);
    console.table(registerTableData);

    reloadRows()
    // deleteRow()

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
