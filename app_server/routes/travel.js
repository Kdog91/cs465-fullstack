const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel'); // Import the controller

/* GET travel page. */
router.get('/', travelController.travel); 

module.exports = router;