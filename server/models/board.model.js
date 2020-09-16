const mysql = require('mysql2');
const DBconfig = require('../config/DBconfig');
const connection = mysql.createConnection(DBconfig);

class BoardModel {
    constructor() { }

    SELECT_ALL(user_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM list where user_id = ?";
            connection.query(query, user_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }

    SELECT(list_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM list where id = ?";
            connection.query(query, list_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows[0]);
            })
        })
    }

    SELECT_LAST(user_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM list where id = ? AND right_list = null";
            connection.query(query, list_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows[0]);
            })
        })
    }


    INSERT(listDTO) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO list(name, user_id, left_list,right_list) VALUES(?,?,?,?)";
            const params = [listDTO.name, listDTO.user_id, listDTO.left_list, listDTO.right_list];
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const insertId = rows.insertId;
                resolve(insertId);
            })
        })
    }


    UPDATE(listDTO) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE list SET name=?, left_list=?, right_list=? WHERE id = ?";
            const params = [listDTO.name, listDTO.left_list, listDTO.right_list, listDTO.id];
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const changedRows = rows.changedRows;
                resolve(changedRows);
            })
        })
    }

    DELETE(list_id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM list WHERE id = ?";
            connection.execute(query, list_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const affectedRows = rows.affectedRows;
                resolve(affectedRows);
            })
        })
    }
}

module.exports = BoardModel;


