const express = require('express');
const resObject = require('../resObject')
const UserService = require('../services/UserService');

const router = express.Router();
const uService = new UserService(); 

router.get('/', async (req, res, next) => {
    try {
        const data = await uService.findAll();
        const response = resObject(200, true, '유저 조회 성공', data);
        res.send(response);
    }catch(err){
        const response = resObject(400, false, err.sqlMessage, null);
        res.send(response);
    }
})

router.get('/:user_id', (req, res, next) => {
    const user_id = req.params.user_id;
    try {
        const data = await uService.findAll(user_id);
        const response = resObject(200, true, '유저 조회 성공', data);
        res.send(response);
    } catch (err) {
        const response = resObject(400, false, err.sqlMessage, null);
        res.send(response);
    }
})

router.post('/', (req, res, next) => {
    const userDTO = [req.body.email, req.body.password, req.body.name];
    try {
        const post_id = await uService.create(userDTO);
        const response = resObject(200, true, '유저 등록 성공', { post_id });
        res.send(response);
    } catch (err) {
        const response = resObject(400, false, err.sqlMessage, null);
        res.send(response);
    }
})

module.exports = router;
