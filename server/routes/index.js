const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')

router.use('/users', userController);

module.exports = router;
