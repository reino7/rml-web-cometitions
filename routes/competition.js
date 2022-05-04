const express = require('express');
let router = express.Router();

router.use(function (req, res, next) {
  next();
});

router.route('/nimekiri').get((req, res) => {
  res.render('competition-list');
});

router.route('/info/:id').get((req, res) => {
  res.render('competition-info');
});

router.route('/paigutus/:id').get((req, res) => {
  res.render('competition-placement');
});

router.route('/tabel/:id').get((req, res) => {
  res.render('competition-table');
});

router.route('/mangud/:id').get((req, res) => {
  res.render('competition-games');
});

router.route('/tulemused/:id').get((req, res) => {
  res.render('competition-results');
});

router.route('/auhinnad/:id').get((req, res) => {
  res.render('competition-awards');
});

router.route('/juhend').get((req, res) => {
  res.render('competition-instructions');
});

module.exports = router;
