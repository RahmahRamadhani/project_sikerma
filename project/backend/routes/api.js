const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/dataController');

// Rute untuk mendapatkan data
router.get('/data', getData);

module.exports = router;
