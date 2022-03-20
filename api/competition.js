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