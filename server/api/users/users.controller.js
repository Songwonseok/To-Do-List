const resObject = require('../resObject')
const UsersService = require('../../services/users.service');

class UsersController {
    constructor() {
        this.uService = new UsersService();
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
                const user_id = req.params.userId;
                const data = await this.uService.findOne(user_id);
                const response = resObject(200, true, '유저 조회 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }

        this.getBoards = async (req, res, next) => {
            try {
                const user_id = req.params.userId;
                const data = await this.uService.getBoard(user_id);
                const response = resObject(200, true, '게시판 조회 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }

        this.insertUsers = async (req, res, next) => {
            try {
                const usersDTO = {
                    email : req.body.email,
                    password : req.body.password,
                    name: req.body.name,
                    phone : req.body.phone
                }
                const data = await this.uService.create(usersDTO);
                const response = resObject(200, true, '유저 추가 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }
    }
}


module.exports = new UsersController();
