'use strict';

/* Enable Bootstrap5 Tooltips */
let tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('navbar').style.top = '0';
  } else {
    document.getElementById('navbar').style.top = '-85px';
  }
  prevScrollpos = currentScrollPos;
};

/* Scroll To Top */
const btnScrolToTop = document.getElementById('btnScrolToTop');
btnScrolToTop.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

/* show the Back To Top button on scroll */
const showOnPx = 140;

document.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > showOnPx) {
    btnScrolToTop.classList.remove('visually-hidden');
  } else {
    btnScrolToTop.classList.add('visually-hidden');
  }
});
