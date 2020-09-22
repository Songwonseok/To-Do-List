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
                const list = getOrderList(columns[i], noteList);
                columns[i].list = list;
            }
            return columns;
        } catch (err) {
            throw err;
        }
    }

    async create(usersDTO) {
        try {
            usersDTO.password = await getHash(usersDTO.password);
            const insertId = await this.usersModel.INSERT(usersDTO);
            const basicColumns = [ "해야할 일", "하는 중", "완료"];
            basicColumns.forEach(async (b) =>{
                console.log(insertId);
                const columnDTO = {
                    user_id: insertId,
                    name: b
                }
                await this.columnsModel.INSERT(columnDTO);
            })
            return insertId;
        } catch (err) {
            throw err;
        }
    }

    async checkValid(loginForm) {
        try {   
            const user = await this.usersModel.SELECT_BY_EMAIL(loginForm.email);
            // 1. ID 체크
            if (!user) {
                throw new Error('존재하지 않는 email입니다.')
            } else {
                // 2. Password 체크
                bcrypt.compare(loginForm.password, user.password, (err, isMatch) => {
                    if (!isMatch)
                        throw new Error('비밀번호가 틀렸습니다.')
                });
                // 3. ID와 Password가 맞다면 세션에 추가하고 Cookie 생성
                return { isLogin: true, id: user.id, userName: user.name}
            }

        } catch (err) {
            throw err;
        }
    }
}

const getHash = (password) => {
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

const getOrderList = (column, noteList) => {
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

module.exports = UsersService;