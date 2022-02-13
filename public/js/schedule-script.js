'use strict';

// GET competitions list from API
fetch('http://localhost:3000/api/competitions-schedule')
  .then(function (response) {
    return response.json();
  })
  .then(function (dataJson) {
    appendData2CompetitionsTable(dataJson);
  })
  .catch(function (err) {
    console.log('error: ' + err);
  });

// Display data from API to HTML Tables
function appendData2CompetitionsTable(data) {
  const competitionsTableContainer =
    document.getElementById('competitionsTable');

  for (let i = 0; i < data.length; i++) {
    competitionsTableContainer.innerHTML += `<tr>
      <td class="text-center">${data[i].compDate}</td>
      <td>
      ${data[i].compName}
      </td>
      <td>${data[i].compLocation}</td>
    </tr>`;
  }
}

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
