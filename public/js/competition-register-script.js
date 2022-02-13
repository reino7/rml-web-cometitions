'use strict';

function searchTableData() {
  let input, filter, table, tr, td, cell, i, j;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('table');
  tr = table.getElementsByTagName('tr');
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = 'none';

    td = tr[i].getElementsByTagName('td');
    for (let j = 0; j < td.length; j++) {
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
