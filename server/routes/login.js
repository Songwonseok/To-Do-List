const express = require('express');
const mysql = require('mysql2');
const DBconfig = require('../config/DBconfig');
const router = express.Router();
const bcrypt = require('bcrypt');

const connection = mysql.createConnection(DBconfig);

router.post('/login', async (req, res, next) => {
    const { id, password } = req.body

    // 1. ID 체크
    if (!user) {
        res.send('<script type="text/javascript"> alert("해당 ID가 없습니다."); window.location.href = "/"</script>');
    } else {
        // 2. Password 체크
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch)
                res.send('<script type="text/javascript"> alert("비밀번호가 틀렸습니다."); window.location.href = "/"</script>');
        });
        // 3. ID와 Password가 맞다면 세션에 추가하고 Cookie 생성
        const sid = createSid(req.sm);
        req.sm.set(sid, id);
        res.cookie('sid', sid);
        res.send('<script type="text/javascript"> alert("로그인 되었습니다."); window.location.href = "/"</script>');
    }
});


router.get('/logout', (req, res, next) => {
    const sid = req.cookies.sid
    if (sid) req.sm.deleteSession(sid);
    res.clearCookie('sid');
    res.redirect('/');
})