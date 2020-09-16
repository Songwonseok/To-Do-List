const express = require('express');
const router = express.Router();
const boardController = require('./board.controller')


router.get('/:boardId', boardController.findBoard);
router.post('/', boardController.insertBoard);
router.put('/', boardController.updateBoard);
router.delete('/:boardId', boardController.deleteBoard);

module.exports = router;
