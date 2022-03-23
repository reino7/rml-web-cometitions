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
