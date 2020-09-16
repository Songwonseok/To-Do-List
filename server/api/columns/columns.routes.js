const express = require('express');
const router = express.Router();
const columnsController = require('./columns.controller')


router.get('/:columnsId', columnsController.findColumns);
router.post('/', columnsController.insertColumns);
router.put('/', columnsController.updateColumns);
router.delete('/:columnsId', columnsController.deleteColumns);

module.exports = router;
