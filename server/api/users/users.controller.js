const resObject = require('../resObject')
const UserService = require('../../services/users.service');

class UsersController {
    constructor() {
        this.uService = new UserService();
        this.findAllUsers = async (req, res, next) => {
            try {
                const data = await this.uService.findAll();
                const response = resObject(200, true, '유저 조회 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        };

        this.findUsers = async (req, res, next) => {
            try {
                const data = await this.uService.findAll();
                const response = resObject(200, true, '유저 조회 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }

        this.insertUsers = async (req, res, next) => {
            try {
                const data = await this.uService.findAll();
                const response = resObject(200, true, '유저 조회 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }
    }
}


module.exports = new UsersController();
