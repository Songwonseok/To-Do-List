const express = require('express');
const router = express.Router();

const users = require('./users/users.routes');
const columns = require('./columns/columns.routes');
const note = require('./note/note.routes');
const log = require('./log/log.routes')
const auth = require('../middleware/auth')

router.get('/', (req,res,next) => {
    res.render('static/index.html')
})
router.use('/users', users);
router.use(auth);
router.use('/columns', columns);
router.use('/note', note);
router.use('/log', log);

module.exports = router;
