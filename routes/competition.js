const express = require('express');
let router = express.Router();
const fs = require('fs');

router.use(function (req, res, next) {
  next();
});

router.route('/').get((req, res) => {
  res.render('competition');
});

router.route('/lisa').get((req, res) => {
  res.render('competition-add');
});

router.route('/registreeri/:id').get((req, res) => {
  // res.send(req.params.id);
  /**  Competitions Reiting Data Json file for API */
  let reiting = './public/app_eltlid_reitinguga.json';
  let reitingJson = JSON.parse(fs.readFileSync(reiting, 'utf-8'));
  res.render('competition-register', {
    eltlReiting: reitingJson.PERSONS.PERSON,
  });

  // res.render('competition-register');
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
