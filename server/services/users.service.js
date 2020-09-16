const UsersModel = require('../models/users.model')
const ColumnsModel = require('../models/columns.model')
const NoteModel = require('../models/note.model');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 값이 높을 수록 비용 소요가 큼

class UsersService {
    constructor() {
        this.usersModel = new UsersModel();
        this.columnsModel = new ColumnsModel();
        this.noteModel = new NoteModel();
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
    
    async getColumns(user_id) {
        try {
            const columns = await this.columnsModel.SELECT_ALL(user_id);
            
            for (let i = 0; i < columns.length;i++){
                const noteList = await this.noteModel.SELECT_ALL(columns[i].id);
                const list = UsersService.getOrderList(columns[i], noteList);
                columns[i].list = list;
            }
            return columns;
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

    static getOrderList(column, noteList) {
        const list = [];
        if (column.head) {
            let node = noteList.find(c => c.id == column.head);
            list.push(node);
            while (node.next_note) {
                node = noteList.find(c => c.id == node.next_note);
                list.push(node);
            }
        }
        return list;
    }
}

module.exports = UsersService;