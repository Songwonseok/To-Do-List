const mysql = require('mysql2');
const DBconfig = require('../config/DBconfig');
const connection = mysql.createConnection(DBconfig);

class UserModel {
    constructor(){}

    SELECT_ALL() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Users";
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
            const query = "SELECT * FROM Users where id = ?";
            connection.query(query, user_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows[0]);
            })
        })
    }

    INSERT(usersDTO) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO Users(email, password, name, phone) VALUES(?,?,?,?)";
            const params = [usersDTO.email, usersDTO.password, usersDTO.name, usersDTO.phone];
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


