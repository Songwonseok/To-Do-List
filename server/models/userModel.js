const mysql = require('mysql2');
const DBconfig = require('../config/DBconfig');
const connection = mysql.createConnection(DBconfig);

class UserModel {
    constructor(){}

    SELECT_ALL() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM user";
            connection.query(query, (err, rows, fields) => {
                if(err){
                    reject(err);
                }
                resolve(rows)
            })
        })
    }

    SELECT(user_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM user where user_id = ?";
            connection.query(query, user_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows[0]);
            })
        })
    }

    INSERT(userDTO) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO user(email, password, name) VALUES(?,?,?)";
            const params = [userDTO.email, userDTO.password, userDTO.name];
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const insertId = rows.insertId;
                resolve(insertId);
            })
        })
    }
}

module.exports = UserModel;


