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

const competitionName = document.getElementById('competitionName');
competitionName.innerText = localStorage.getItem('compName')
const reitingsTableFull = document.getElementById('reitingsTableFull');
const registerTableBody = document.getElementById('registerTableBody');
const reitingsPlayerCount = document.getElementById('reitingPlayerCount');
reitingsPlayerCount.innerHTML = reitingsTableFull.rows.length - 1;

// add EventListener to every row to reitingsTableFull
// i = 1 skip table header
for (let i = 1; i < reitingsTableFull.rows.length; i++) {
  reitingsTableFull.rows[i].addEventListener('click', function () {
    let msg = 'Reit->Reg: ';

    for (let j = 0; j < this.cells.length; j++) {
      msg += this.cells[j].innerText + ' / ';
    }
    let registerTableData = [];

    registerTableData.push({
      rateOrder: this.cells[0].innerText,
      ratePoints: this.cells[1].innerText,
      personId: this.cells[2].innerText,
      firstLastName: this.cells[3].innerText,
      birthdate: this.cells[4].innerText,
      sex: this.cells[5].innerText,
    });
    registerTableData.reverse((a, b) => {
      return a.ratePoints - b.ratePoints;
    });
    console.log(msg);

    console.log(registerTableData);
    addRow2RegisterTable(registerTableData, registerTableBody.rows.length);
  });
}

function addRow2RegisterTable(data, rowLength) {
  const table = document.getElementById('registerTableBody');
  const registeredPlayerCount = document.getElementById(
    'registeredPlayerCount'
  );
  registeredPlayerCount.innerHTML = rowLength + 1;

  // let cell = '';

  // add new row/rida as the last one
  let row = table.insertRow(rowLength);
  console.log('Data length ' + data.length);
  for (let i = 0; i < data.length; i++) {
    row.innerHTML = `
      <td class="text-center">${rowLength + 1}</td>
      <td class="text-center">${data[i].rateOrder}</td>
      <td class="text-center">${data[i].ratePoints}</td>
      <td class="text-center">${data[i].personId}</td>
      <td>${data[i].firstLastName}</td>
      <td class="text-center">${data[i].birthdate}</td>
      <td class="text-center">${data[i].sex}</td>
      <td class="text-center">
        <a class="text-danger" onclick="deleteRow(${rowLength})">
          <i class="fas fa-trash-alt"></i>
        </a>
      </td>
    `;
  }
}

function deleteRow(rowNo) {
  console.log('Delete row: ' + rowNo);
  registerTableBody.deleteRow(rowNo);
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

// async function getPlayers() {
//   try {
//     const response = await axios.get(apiUrl);
//     // console.log(response.data.length);
//     // console.log(response.data[0]);
//     document.getElementById('playerCount').innerText = response.data.length;
//     document.getElementById('reitingUpdated').innerText =
//       response.data[0].value_created;
//     appendData2reitingsTable(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// Display data from API to HTML Tables
// function appendData2reitingsTable(data) {
//   const reitingsTableContainer = document.getElementById('reitingsTable');

//   for (let i = 0; i < data.length; i++) {
//     reitingsTableContainer.innerHTML += `<tr>
//       <td class="text-center">${data[i].rate_order}</td>
//       <td class="text-center">${data[i].rate_points}</td>
//       <td class="text-center">${data[i].person_id}</td>
//       <td>${data[i].first_name} ${data[i].fam_name}</td>
//       <td class="text-center">${data[i].birthdate}</td>
//       <td class="text-center">${data[i].sex}</td>

//     </tr>`;
//   }
// }

// getPlayers();

/** EI SAA KASUTADA CHROME Error code: Out of Memory
 * GET Reiting XML file from Eesti Lauatenniseliit
 * https://www.lauatennis.ee/app_partner/app_eltlid_reitinguga_xml.php -> 8393 mängijat
 * https://ristissaar.ee/raplamaalt/app_eltlid_reitinguga_xml.xml -> 10 mängijat testimiseks
 * */
// fetch('https://www.lauatennis.ee/app_partner/app_eltlid_reitinguga_xml.php')
//   .then(response => response.text())
//   .then(data => {
//     const parser = new DOMParser();
//     const xml = parser.parseFromString(data, 'text/xml');
//     return xml;
//   })
//   .then(xml => {
//     const rateOrder = xml.getElementsByTagName('RATEORDER');
//     const personId = xml.getElementsByTagName('PERSONID');
//     const firstName = xml.getElementsByTagName('FIRSTNAME');
//     const famName = xml.getElementsByTagName('FAMNAME');
//     const birthDate = xml.getElementsByTagName('BIRTHDATE');
//     const sex = xml.getElementsByTagName('SEX');

//     const reitingsTableContainer = document.getElementById('reitingsTable');
//     const reitingsTableCount = document.getElementById('reitingsTableCount');
//     reitingsTableCount.innerHTML = personId.length;

//     for (let i = 0; i < personId.length; i++) {
//       if (
//         rateOrder[i].firstChild &&
//         personId[i].firstChild &&
//         firstName[i].firstChild &&
//         famName[i].firstChild &&
//         birthDate[i].firstChild &&
//         sex[i].firstChild
//       ) {
//         reitingsTableContainer.innerHTML += `
//           <tr>
//             <th>${i + 1}</th>
//             <th>${rateOrder[i].firstChild.nodeValue}</th>            <td>${
//           personId[i].firstChild.nodeValue
//         }</td>
//             <td>${firstName[i].firstChild.nodeValue} ${
//           famName[i].firstChild.nodeValue
//         }</td>
//             <td>${birthDate[i].firstChild.nodeValue}</td>
//             <td>${sex[i].firstChild.nodeValue}</td>
//           </tr>`;
//       } else {
//         reitingsTableContainer.innerHTML += `
//         <tr>
//           <th>${i + 1}</th>
//           <th>0</th>
//           <td>${personId[i].firstChild.nodeValue}</td>
//           <td>${firstName[i].firstChild.nodeValue} ${
//           famName[i].firstChild.nodeValue
//         }</td>
//           <td>${birthDate[i].firstChild.nodeValue}</td>
//           <td>${sex[i].firstChild.nodeValue}</td>
//         </tr>`;
//       }
//     }
//   })
//   .catch(function (err) {
//     console.log('Viga: ' + err);
//   });

/** GET Reiting XML file from Eesti Lauatenniseliit
 * https://www.lauatennis.ee/app_partner/app_reiting_xml.php -> 571 mängijat
 * https://ristissaar.ee/raplamaalt/app_eltlid_reitinguga_xml.xml -> 10 mängijat testimiseks
 * */
// fetch('https://www.lauatennis.ee/app_partner/app_reiting_xml.php')
//   .then(response => response.text())
//   .then(data => {
//     const parser = new DOMParser();
//     const xml = parser.parseFromString(data, 'text/xml');

//     const rateOrder = xml.getElementsByTagName('rateorder');
//     const personId = xml.getElementsByTagName('personid');
//     const firstName = xml.getElementsByTagName('firstname');
//     const famName = xml.getElementsByTagName('famname');
//     const birthDate = xml.getElementsByTagName('birthdate');
//     const sex = xml.getElementsByTagName('sex');

//     console.log(rateOrder[0].firstChild.nodeValue);
//     const reitingsTableContainer = document.getElementById('reitingsTable');
//     const reitingsTableCount = document.getElementById('reitingsTableCount');

//     for (let i = 0; i < personId.length; i++) {
//       reitingsTableCount.innerHTML = i;
//       reitingsTableContainer.innerHTML += `
//       <tr>
//         <th>${rateOrder[i].firstChild.nodeValue}</th>
//         <td>${personId[i].firstChild.nodeValue}</td>
//         <td>${firstName[i].firstChild.nodeValue}</td>
//         <td>${famName[i].firstChild.nodeValue}</td>
//         <td>${birthDate[i].firstChild.nodeValue}</td>
//         <td>${sex[i].firstChild.nodeValue}</td>
//       </tr>`;
//     }
//   })
//   .catch(console.error);
