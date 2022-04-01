const express = require('express');

const router = express.Router();
const matchDb = require('../services/match-db');

/* GET */
router.get('/', async function (req, res, next) {
  try {
    res.json(await matchDb.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting competitions`, err.message);
    next(err);
  }
});

/* GET by ID */
router.get('/:competitionId', async function (req, res, next) {
  try {
    const id = req.params.competitionId;
    const competitionsData = await matchDb.getMultiple(req.query.page);

    const competition = competitionsData.filter(
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

/* PUT */
router.put('/:id', async function (req, res, next) {
  try {
    res.json(await matchDb.update(req.body));
  } catch (err) {
    console.error(`Error while updating match`, err.message);
    next(err);
  }
});

module.exports = router;
