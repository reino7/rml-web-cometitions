'use strict';

let messageElement = document.getElementById('message');
messageElement.style.display = 'none';

window.onload = function () {
  setTimeout(function () {
    hideSpinner();
  }, 10000);
};

// Function to hide the Spinner
function hideSpinner() {
  document.getElementById('spinner').style.display = 'none';
  document.getElementById('message').style.display = 'block';
  document.getElementById('message').innerHTML =
    '<div class="alert alert-success text-center"><i class="fas fa-check-circle"></i> Uuendamine lõpuni viidud</div>';
}
