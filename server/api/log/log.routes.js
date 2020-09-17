const express = require('express');
const router = express.Router();
const logController = require('./log.controller')

router.get('/:userId', logController.getUserLogs);

module.exports = router;
