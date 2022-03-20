const express = require('express');
const router = express.Router();
const getReitingFile = require('../services/get-reiting-file');

router.use(function (req, res, next) {
  next();
});

router.route('/').get(async (req, res, next) => {
  try {
    getReitingFile.downloadFile();
    // getReitingFile.parseXML2JsonFile();
    // getReitingFile.insert2Db();
  } catch (err) {
    console.error(`Error while downloading file `, err.message);
    res.status(404).send(err);
    next(err);
  }
  res.render('update-reiting');
});

module.exports = router;
