const BoardModel = require('../models/board.model')

class BoardService {
    constructor() {
        this.boardModel = new BoardModel();
    }

    async findOne(board_id) {
        try {
            const board = await this.boardModel.SELECT(board_id);
            return board;
        } catch (err) {
            throw err;
        }
    }

    async create(boardDTO) {
        try {
                const inserId = await this.boardModel.INSERT(boardDTO);
                return inserId;
        } catch (err) {
            throw err;
        }
    }

    async update(boardDTO) {
        try {
            const changedRows = await this.boardModel.UPDATE(boardDTO);
            return changedRows;
        } catch (err) {
            throw err;
        }
    }

    async delete(board_id) {
        try {
            const affectedRows = await this.boardModel.DELETE(board_id);
            return affectedRows;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = BoardService;