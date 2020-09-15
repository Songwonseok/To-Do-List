const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const DBconfig = require('../config/DBconfig');

const connection = mysql.createConnection(DBconfig);
const resObject = require('../resObject')


router.get('/', (req, res, next) => {
  console.log('bb');
  const query = "SELECT * FROM users";
  connection.query(query, (err, rows, fields) => {
    console.log(err);
    const response = resObject(200, true, '유저 조회 성공', rows);
    res.send(response);
  })
})

router.get('/:user_id', (req, res, next) => {
  const query = "SELECT * FROM users where user_id = ?";
  const user_id = req.params.user_id;
  connection.query(query, user_id, (err, rows, fields) => {
    console.log(err);
    if (err) {
      const response = resObject(400, false, err.sqlMessage, null);
      res.send(response);
    } 
    const response = resObject(200, true, '유저 조회 성공', rows[0]);
    res.send(response);
  })
})

router.post('/', (req,res,next) => {
  const query = "INSERT INTO users(email, password, name) VALUES(?,?,?)";
  const params = [req.body.email, req.body.password, req.body.name];
  connection.excute(query, params, (err,rows,fields) => {
    if(err){
      const response = resObject(400, false, err.sqlMessage, null);
      res.send(response);
    }
    const post_id = rows.insertId;
    const response = resObject(200, true, '유저 등록 성공', { post_id });
    res.send(response);
  })
})

module.exports = router;
