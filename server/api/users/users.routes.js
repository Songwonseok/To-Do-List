const express = require('express');
const router = express.Router();
const userController = require('./users.controller')


router.get('/', userController.findAllUsers);
router.get('/:userId', userController.findUsers);
router.get('/columns/:userId', userController.getColumns);
router.post('/', userController.insertUsers);
router.post('/auth/login', userController.login);
router.get('/auth/logout', userController.logout);

module.exports = router;
