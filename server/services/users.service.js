const UsersModel = require('../models/users.model')
const BoardModel = require('../models/board.model')
const bcrypt = require('bcrypt');
const saltRounds = 10; // 값이 높을 수록 비용 소요가 큼

class UsersService {
    constructor() {
        this.usersModel = new UsersModel();
        this.boardModel = new BoardModel();
    }

    async findAll() {
        try{
            const userList = await this.usersModel.SELECT_ALL();
            return userList;
        }catch(err){
            throw err;
        }
    }

    async findOne(user_id) {
        try {
            const user = await this.usersModel.SELECT(user_id);
            return user;
        } catch (err) {
            throw err;
        }
    }
    
    async getBoard(user_id) {
        try {
            const boards = await this.boardModel.SELECT_ALL(user_id);
            return boards;
        } catch (err) {
            throw err;
        }
    }

    async create(usersDTO) {
        try {
            usersDTO.password = await UsersService.getHash(usersDTO.password);
            const inserId = await this.usersModel.INSERT(usersDTO);
            return inserId;
        } catch (err) {
            throw err;
        }
    }

    static getHash(password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) reject(err);
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) reject(err)
                    resolve(hash);
                });
            });
        })
    }
}

module.exports = UsersService;