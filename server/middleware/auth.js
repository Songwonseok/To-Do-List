const resObject = require('../api/resObject')

const auth = async (req, res, next) => {
    // 인증하는 곳
    // 로그인했는지 확인
    if(!req.session.userInfo){
        const response = resObject(403, false, '권한 없음', null);
        res.send(response);
    }
    next();
}

module.exports = auth