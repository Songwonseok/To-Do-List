const resObject = require('../resObject')
const BoardService = require('../../services/board.service');

class BoardController {
    constructor() {
        this.bService = new BoardService();

        this.findBoard = async (req, res, next) => {
            try {
                const board_id = req.params.boardId;
                const data = await this.bService.findOne(board_id);
                const response = resObject(200, true, '게시판 조회 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        };

        this.insertBoard = async (req, res, next) => {
            try {
                const boardDTO = {
                    name: req.body.name,
                    user_id: req.body.user_id
                }
                const data = await this.bService.create(boardDTO);
                const response = resObject(200, true, '게시판 추가 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }
        this.updateBoard = async (req, res, next) => {
            try {
                const boardDTO = {
                    id:req.body.id,
                    name: req.body.name,
                    head: req.body.head
                }
                const data = await this.bService.update(boardDTO);
                const response = resObject(200, true, '게시판 수정 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }

        this.deleteBoard = async (req, res, next) => {
            try {
                const board_id = req.params.boardId;
                const data = await this.bService.delete(board_id);
                const response = resObject(200, true, '게시판 삭제 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }
    }
}


module.exports = new BoardController();
