const express = require('express');
const router = express.Router();
const columnsController = require('./columns.controller')
const logController = require('../log/log.controller')

router.get('/:columnsId', columnsController.findColumns);
router.post('/', columnsController.insertColumns, logController.insertColumnLog); // 로그
router.put('/head', columnsController.updateHead);
router.put('/rename', columnsController.updateName, logController.editColumnLog); // 로그
router.delete('/:columnsId', columnsController.deleteColumns, logController.removeColumnLog); // 로그

module.exports = router;
