const express = require('express');
let router = express.Router();

router.use(function (req, res, next) {
  next();
});

router.route('/lisa').get((req, res) => {
  res.render('competition-add');
});

router.route('/registreeri').get((req, res) => {
  res.render('competition-register');
});

router.route('/info').get((req, res) => {
  res.render('competition-info');
});

router.route('/paigutus').get((req, res) => {
  res.render('competition-placement');
});

router.route('/tabel').get((req, res) => {
  res.render('competition-table');
});

router.route('/mangud').get((req, res) => {
  res.render('competition-games');
});

router.route('/tulemused').get((req, res) => {
  res.render('competition-results');
});

router.route('/auhinnad').get((req, res) => {
  res.render('competition-awards');
});

router.route('/juhend').get((req, res) => {
  res.render('competition-instructions');
});

module.exports = router;
