const BoardModel = require('../models/board.model')

class BoardService {
    constructor() {
        this.boardModel = new BoardModel();
    }

    async findAll(user_id) {
        try {
            const lists = await this.boardModel.SELECT_ALL(user_id);
            return lists;
        } catch (err) {
            throw err;
        }
    }

    async findOne(list_id) {
        try {
            const list = await this.boardModel.SELECT(list_id);
            return list;
        } catch (err) {
            throw err;
        }
    }

    async create(listDTO) {
        SELECT_LAST
        try {
            const prevList = await this.boardModel.SELECT_LAST(listDTO.user_id);
            if (prevList){
                listDTO.left_list = prevList.id;
                const inserId = await this.boardModel.INSERT(listDTO);

                prevList.right_list = inserId;
                await this.boardModel.UPDATE(prevList);
                return inserId;
            }else{
                listDTO.left_list = null;
                const inserId = await this.boardModel.INSERT(listDTO);
                return inserId;
            }
        } catch (err) {
            throw err;
        }
    }

    async update(listDTO) {
        try {
            listDTO.left_list = (listDTO.left_list) ? listDTO.left_list: null;
            listDTO.right_list = (listDTO.right_list) ? listDTO.right_list : null;
            const changedRows = await this.boardModel.UPDATE(listDTO);
            return changedRows;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = BoardService;