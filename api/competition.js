const express = require('express');
let router = express.Router();
const competitionDb = require('../services/competition-db')

/* GET */
router.get('/', async function (req, res, next) {
  try {
    res.json(await competitionDb.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting competition`, err.message);
    next(err);
  }
});

/* GET by ID */
router.get('/:competitionId', async function (req, res, next) {
  try {
    const id = req.params.competitionId;
    const competitionsData = await competitionDb.getMultiple(
      req.query.page
    );

    const competition = competitionsData.find(
      competition => competition.comp_id === id
    );
    if (!competition) {
      return res.status(404).send('Competition not found');
    }
    res.json(competition);
  } catch (err) {
    console.error(`Error while getting competition by Id`, err.message);
    next(err);
  }
});

/* POST */
router.post('/', async function (req, res, next) {
  try {
    res.json(await competitionDb.create(req.body));
  } catch (err) {
    console.error(`Error while creating competition`, err.message);
    next(err);
  }
});

module.exports = router;