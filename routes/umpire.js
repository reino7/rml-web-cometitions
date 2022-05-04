const express = require('express');
let router = express.Router();
const fs = require('fs');

router.use(function (req, res, next) {
  next();
});

/* Umpire schedule routes */
router.route('/ajakava/lisa').get((req, res) => {
  res.render('schedule-add');
});

router.route('/ajakava/muuda/').get((req, res) => {
  res.render('schedule-edit');
});

router.route('/ajakava/muuda/:id').get((req, res) => {
  res.render('schedule-edit-single');
});

/* Umpire dashboard routes */
router.route('/toolaud').get((req, res) => {
  res.render('umpire-dashboard');
});

/* Umpire competition routes */
router.route('/voistlus/lisa').get((req, res) => {
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
});

router.route('/voistlus/info/:id').get((req, res) => {
  res.render('competition-info');
});

router.route('/voistlus/paigutus/:id').get((req, res) => {
  res.render('competition-placement');
});

router.route('/voistlus/tabel/:id').get((req, res) => {
  res.render('competition-table');
});

router.route('/voistlus/mangud/:id').get((req, res) => {
  res.render('competition-games');
});

router.route('/voistlus/auhinnad/:id').get((req, res) => {
  res.render('competition-results');
});

module.exports = router;
