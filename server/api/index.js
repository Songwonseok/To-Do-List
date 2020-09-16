const express = require('express');
const router = express.Router();

const users = require('./users/users.routes')
const board = require('./board/board.routes')

router.use('/users', users);
router.use('/board', board);

module.exports = router;
