const mysql = require('mysql2');
const DBconfig = require('../config/DBconfig');
const connection = mysql.createConnection(DBconfig);

class BoardModel {
    constructor() { }

    SELECT_ALL(user_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Board where user_id = ?";
            connection.query(query, user_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }

    SELECT(board_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Board where id = ?";
            connection.query(query, board_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows[0]);
            })
        })
    }

    INSERT(boardDTO) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO Board(name, user_id) VALUES(?,?)";
            const params = [boardDTO.name, boardDTO.user_id];
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const insertId = rows.insertId;
                resolve(insertId);
            })
        })
    }

    UPDATE(boardDTO) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE Board SET name=?, head=? WHERE id = ?";
            const params = [boardDTO.name, boardDTO.head, boardDTO.id];
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const changedRows = rows.changedRows;
                resolve(changedRows);
            })
        })
    }

    DELETE(board_id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM Board WHERE id = ?";
            connection.query(query, board_id, (err, rows, fields) => {
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


