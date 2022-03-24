const express = require('express');

const router = express.Router();
const registrationDb = require('../services/registration-db');

/* GET */
router.get('/', async function (req, res, next) {
  try {
    res.json(await registrationDb.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting registration info`, err.message);
    next(err);
  }
});

/* GET by ID */
router.get('/:competitionId', async function (req, res, next) {
  try {
    const id = req.params.competitionId;
    const competitionsData = await registrationDb.getMultiple(
      req.query.page
    );

    const competition = competitionsData.filter(function (competition) {
      return competition.comp_id === id;
    });

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
    res.json(await registrationDb.create(req.body));
  } catch (err) {
    console.error(`Error while adding competition registration info`, err.message);
    next(err);
  }
});


module.exports = router;
