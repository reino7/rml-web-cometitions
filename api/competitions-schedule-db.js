const express = require('express');
const router = express.Router();
const competitionsScheduleDb = require('../services/competitions-schedule-db');

/* GET */
router.get('/', async function (req, res, next) {
  try {
    res.json(await competitionsScheduleDb.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting competitions`, err.message);
    next(err);
  }
});

/* GET by ID */
router.get('/:competitionId', async function (req, res, next) {
  try {
    const id = Number(req.params.competitionId);
    const competitionsScheduleData = await competitionsScheduleDb.getMultiple(
      req.query.page
    );
    const competition = competitionsScheduleData.find(
      competition => competition.id === id
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
    res.json(await competitionsScheduleDb.create(req.body));
  } catch (err) {
    console.error(`Error while creating competition`, err.message);
    next(err);
  }
});

/* PUT */
router.put('/:id', async function (req, res, next) {
  try {
    res.json(await competitionsScheduleDb.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating competition`, err.message);
    next(err);
  }
});

/* DELETE */
router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await competitionsScheduleDb.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting competitione`, err.message);
    next(err);
  }
});

module.exports = router;
