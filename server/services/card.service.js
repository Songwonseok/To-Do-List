const CardModel = require('../models/card.model')
const BoardModel = require('../models/board.model')

class CardService {
    constructor() {
        this.cardModel = new CardModel();
        this.boardModel = new BoardModel();
    }

    async findOne(card_id) {
        try {
            const card = await this.cardModel.SELECT(card_id);
            return card;
        } catch (err) {
            throw err;
        }
    }

    async create(cardDTO) {
        try {
            const board = await this.boardModel.SELECT(cardDTO.board_id);
            const inserId = await this.cardModel.INSERT(cardDTO);
            
            if(board.head == null){
                board.head = inserId;
                await this.boardModel.UPDATE(board);
            }else {
                const last = await this.cardModel.SELECT_LAST(board.id);
                last.next_card = inserId;
                await this.cardModel.UPDATE_NODE(last);
            }
            return inserId;
        } catch (err) {
            throw err;
        }
    }

    async update(cardDTO) {
        try {
            const changedRows = await this.cardModel.UPDATE(cardDTO);
            return changedRows;
        } catch (err) {
            throw err;
        }
    }

    // board_id: 내가 옮긴 board의 id
    async move(cardDTO) {
        try {
            const currBoard = await this.boardModel.SELECT(cardDTO.board_id);
            const origin = await this.cardModel.SELECT(cardDTO.id);
            // 1. next_card가 있을 때
            if(cardDTO.next_card){
                const next = await this.cardModel.SELECT(cardDTO.next_card);
                // card의 위치가 top인지 확인
                if (currBoard.head == next.id) {
                    currBoard.head = cardDTO.id;
                    const prev = await this.cardModel.SELECT_PREV(cardDTO.id);
                    prev.next_card = origin.next_card;
                    await this.boardModel.UPDATE(currBoard);
                    await this.cardModel.UPDATE_NODE(prev);
                } else {
                    const next_prev = await this.cardModel.SELECT_PREV(next.id);
                    const prev = await this.cardModel.SELECT_PREV(cardDTO.id);

                    if (next_prev.id != cardDTO.id){
                        if(prev){
                            prev.next_card = origin.next_card;
                            await this.cardModel.UPDATE_NODE(prev);
                        }else {
                            currBoard.head = origin.next_card;
                            await this.boardModel.UPDATE(currBoard);
                        }
                        next_prev.next_card = cardDTO.id;
                        await this.cardModel.UPDATE_NODE(next_prev);
                    }
                }
            }
            // 2. next_card가 없을 때
            else {
                // 현재 board의 가장 마지막 card를 가져옴
                const last = await this.cardModel.SELECT_LAST(currBoard.id);
                
                // prev가 존재하면 bottom, 없으면 top
                if (last) {
                    const prev = await this.cardModel.SELECT_PREV(cardDTO.id);
                    last.next_card = cardDTO.id;
                    prev.next_card = cardDTO.next_card;

                    await this.cardModel.UPDATE_NODE(last);
                    await this.cardModel.UPDATE_NODE(prev);
                }else {
                    currBoard.head = cardDTO.id;
                    await this.boardModel.UPDATE(currBoard);
                }
            }
            await this.cardModel.UPDATE_NODE(cardDTO);
        } catch (err) {
            throw err;
        }
    }

    async delete(card_id) {
        try {
            const card = await this.cardModel.SELECT(card_id);
            const board = await this.boardModel.SELECT(card.board_id);
            
            if (board.head == card_id) {
                board.head = card.next_card;
                await this.boardModel.UPDATE(board);
            } else {
                const prev = await this.cardModel.SELECT_PREV(card_id);
                prev.next_card = card.next_card;
                await this.cardModel.UPDATE_NODE(prev);
            }
            const affectedRows = await this.cardModel.DELETE(card_id);
            return affectedRows;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = CardService;