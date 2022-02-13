const express = require('express');
let router = express.Router();

/**  Competitions Schedule Data Json file for API */
const competitionsGameData = require('../competitions-games-data.js');

router.use(function (req, res, next) {
  next();
});

router.route('/').get((req, res) => {
  res.json(competitionsGameData);
});

router.route('/:gameId').get((req, res) => {
  const id = Number(req.params.gameId);
  const game = competitionsGameData.find(game => Number(game.gameId) === id);

  if (!game) {
    return res.status(404).send('Competition not found');
  }

  res.json(game);
});

module.exports = router;
