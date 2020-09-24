const mysql = require('mysql2');
const DBconfig = require('../config/DBconfig');
const connection = mysql.createConnection(DBconfig);
class ColumnsModel {
    constructor() { }

    SELECT_ALL(user_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Columns where user_id = ?";
            connection.query(query, user_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }

    SELECT(columns_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Columns where id = ?";
            connection.query(query, columns_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows[0]);
            })
        })
    }

    INSERT(columnsDTO) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO Columns(name, user_id) VALUES(?,?)";
            const params = [columnsDTO.name, columnsDTO.user_id];
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const insertId = rows.insertId;
                resolve(insertId);
            })
        })
    }


    RENAME(columnsDTO) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE Columns SET name=? WHERE id = ?";
            const params = [columnsDTO.name, columnsDTO.id];
            console.log(params);
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const changedRows = rows.changedRows;
                resolve(changedRows);
            })
        })
    }

    UPDATE(columnsDTO) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE Columns SET head=? WHERE id = ?";
            const params = [columnsDTO.head, columnsDTO.id];
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const changedRows = rows.changedRows;
                resolve(changedRows);
            })
        })
    }

    DELETE(columns_id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM Columns WHERE id = ?";
            connection.query(query, columns_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const affectedRows = rows.affectedRows;
                resolve(affectedRows);
            })
        })
    }
}

module.exports = ColumnsModel;


