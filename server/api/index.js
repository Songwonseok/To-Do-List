const express = require('express');
const router = express.Router();

const users = require('./users/users.routes');
const board = require('./board/board.routes');
const card = require('./board/card.routes');

router.use('/users', users);
router.use('/board', board);
router.use('/card', card);

module.exports = router;
