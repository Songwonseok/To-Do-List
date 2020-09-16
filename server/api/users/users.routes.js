const express = require('express');
const router = express.Router();
const userController = require('./users.controller')


router.get('/', userController.findAllUsers);
router.get('/:userId', userController.findUsers);
router.get('/columns/:userId', userController.getColumns);
router.post('/', userController.insertUsers);

module.exports = router;
