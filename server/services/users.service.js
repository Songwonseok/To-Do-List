const UsersModel = require('../models/users.model')
const BoardModel = require('../models/board.model')
const CardModel = require('../models/card.model');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 값이 높을 수록 비용 소요가 큼

class UsersService {
    constructor() {
        this.usersModel = new UsersModel();
        this.boardModel = new BoardModel();
        this.cardModel = new CardModel();
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
            
            for (let i = 0; i < boards.length;i++){
                const cardList = await this.cardModel.SELECT_ALL(boards[i].id);
                const list = UsersService.getOrderList(boards[i], cardList);
                boards[i].list = list;
            }
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

    static getOrderList(board, cardList) {
        const list = [];
        if (board.head) {
            let node = cardList.find(c => c.id == board.head);
            list.push(node);
            while (node.next_card) {
                node = cardList.find(c => c.id == node.next_card);
                list.push(node);
            }
        }
        return list;
    }
}

module.exports = UsersService;