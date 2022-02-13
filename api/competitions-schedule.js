const express = require('express');
let router = express.Router();

/**  Competitions Schedule Data Json file for API */
const competitionsScheduleData = require('../competitions-schedule-data.js');

router.use(function (req, res, next) {
  next();
});

router.route('/').get((req, res) => {
  res.json(competitionsScheduleData);
});

router.route('/:competitionId').get((req, res) => {
  const id = Number(req.params.competitionId);
  const competition = competitionsScheduleData.find(
    competition => competition.id === id
  );

  if (!competition) {
    return res.status(404).send('Competition not found');
  }

  res.json(competition);
});

module.exports = router;
