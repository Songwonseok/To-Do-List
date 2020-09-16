const resObject = require('../resObject')
const CardService = require('../../services/card.service');

class CardController {
    constructor() {
        this.cService = new CardService();

        this.findCard = async (req, res, next) => {
            try {
                const card_id = req.params.cardId;
                const data = await this.cService.findOne(card_id);
                const response = resObject(200, true, '카드 조회 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        };

        this.insertCard = async (req, res, next) => {
            try {
                const cardDTO = {
                    board_id: req.body.boad_id,
                    content: req.body.content,
                    addedBy: req.body.addedBy,
                }
                const data = await this.cService.create(cardDTO);
                const response = resObject(200, true, '카드 추가 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }
        this.updateCard = async (req, res, next) => {
            try {
                const cardDTO = {
                    id: req.body.id,
                    content: req.body.name
                }
                const data = await this.cService.update(cardDTO);
                const response = resObject(200, true, '카드 수정 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }

        this.moveCard = async (req, res, next) => {
            try {
                const cardDTO = {
                    id: req.body.id,
                    board_id: req.body.board_id,
                    next_card: req.body.next_card
                }
                const data = await this.cService.move(cardDTO);
                const response = resObject(200, true, '카드 이동 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }

        this.deleteCard = async (req, res, next) => {
            try {
                const card_id = req.params.cardId;
                const data = await this.cService.delete(card_id);
                const response = resObject(200, true, '카드 삭제 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }
    }
}


module.exports = new CardController();
