const express = require('express');

const router = express.Router();
const eltlReitingDb = require('../services/eltl-reiting-db');

/* GET */
router.get('/', async function (req, res, next) {
  try {
    res.json(await eltlReitingDb.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting competitions`, err.message);
    next(err);
  }
});

/* GET by ID */
router.get('/:personId', async function (req, res, next) {
  try {
    const id = Number(req.params.personId);
    const eltlReitingData = await eltlReitingDb.getMultiple(req.query.page);
    const eltlReiting = eltlReitingData.find(
      eltlReiting => eltlReiting.person_id === id
    );
    if (!eltlReiting) {
      return res.status(404).send('Reiting not found');
    }
    res.json(eltlReiting);
  } catch (err) {
    console.error(`Error while getting reiting by personId`, err.message);
    next(err);
  }
});

/* POST */
router.post('/', async function (req, res, next) {
  try {
    res.json(await eltlReitingDb.create(req.body));
  } catch (err) {
    console.error(`Error while creating competition`, err.message);
    next(err);
  }
});

/* PUT */
router.put('/:id', async function (req, res, next) {
  try {
    res.json(await eltlReitingDb.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating competition`, err.message);
    next(err);
  }
});

/* DELETE */
router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await eltlReitingDb.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting competitione`, err.message);
    next(err);
  }
});

module.exports = router;
