const express = require('express');
const router = express.Router();

const users = require('./users/users.routes');
const columns = require('./columns/columns.routes');
const note = require('./note/note.routes');

router.use('/users', users);
router.use('/columns', columns);
router.use('/note', note);

module.exports = router;
