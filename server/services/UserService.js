const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10; // 값이 높을 수록 비용 소요가 큼

class UserService {
    constructor() {
        this.userModel = new UserModel();
    }

    async findAll() {
        try{
            const userList = await this.userModel.SELECT_ALL();
            return userList;
        }catch(err){
            throw err;
        }
    }

    async findOne(user_id) {
        try {
            const user = await this.userModel.SELECT(user_id);
            return user;
        } catch (err) {
            throw err;
        }
    }

    async create(userDTO) {
        try {
            userDTO.password = await UserService.getHash(userDTO.password);
            const inserId = await this.userModel.INSERT(userDTO);
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

module.exports = UserService;