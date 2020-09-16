const mysql = require('mysql2');
const DBconfig = require('../config/DBconfig');
const connection = mysql.createConnection(DBconfig);

class CardModel {
    constructor() { }

    SELECT_ALL(board_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT c.id, c.board_id, c.content, c.next_card, u.name AS addedBy FROM Card c JOIN Users u ON c.addedBy = u.id WHERE c.board_id = ?";
            connection.query(query, board_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }

    SELECT(card_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT c.id, c.board_id, c.content, c.next_card, u.name AS addedBy FROM Card c JOIN Users u ON c.addedBy = u.id WHERE c.id = ?";
            connection.query(query, card_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows[0]);
            })
        })
    }

    SELECT_PREV(card_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Card WHERE next_card = ?";
            connection.query(query, card_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows[0]);
            })
        })
    }

    SELECT_LAST(board_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Card WHERE next_card IS NULL AND board_id = ?";
            connection.query(query, board_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows[0]);
            })
        })
    }

    INSERT(cardDTO) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO Card(board_id, content, addedBy) VALUES(?,?,?)";
            const params = [cardDTO.board_id, cardDTO.content, cardDTO.addedBy];
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const insertId = rows.insertId;
                resolve(insertId);
            })
        })
    }


    UPDATE(cardDTO) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE Card SET content=? WHERE id = ?";
            const params = [cardDTO.content,cardDTO.id];
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const changedRows = rows.changedRows;
                resolve(changedRows);
            })
        })
    }

    UPDATE_NODE(cardDTO) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE Card SET board_id=?, next_card=? WHERE id = ?";
            const params = [cardDTO.board_id, cardDTO.next_card, cardDTO.id];
            connection.execute(query, params, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const changedRows = rows.changedRows;
                resolve(changedRows);
            })
        })
    }

    DELETE(card_id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM Card WHERE id = ?";
            connection.query(query, card_id, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                const affectedRows = rows.affectedRows;
                resolve(affectedRows);
            })
        })
    }
}

module.exports = CardModel;


