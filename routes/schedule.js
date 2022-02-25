const express = require('express');
let router = express.Router();

router.use(function (req, res, next) {
  next();
});

router.route('/').get((req, res) => {
  res.render('schedule');
});

router.route('/lisa').get((req, res) => {
  res.render('schedule-add');
});

router.route('/muuda').get((req, res) => {
  res.render('schedule-edit');
});

router.route('/muuda/:id').get((req, res) => {
  res.render('schedule-edit-single');
});

module.exports = router;
