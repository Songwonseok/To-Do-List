const resObject = require('../resObject')
const NoteService = require('../../services/note.service');

class NoteController {
    constructor() {
        this.nService = new NoteService();

        this.findNote = async (req, res, next) => {
            try {
                const note_id = req.params.noteId;
                const data = await this.nService.findOne(note_id);
                const response = resObject(200, true, '노트 조회 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        };

        this.insertNote = async (req, res, next) => {
            try {
                const noteDTO = {
                    columns_id: req.body.columns_id,
                    content: req.body.content,
                    addedBy: req.body.addedBy,
                }
                const data = await this.nService.create(noteDTO);
                const response = resObject(200, true, '노트 추가 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }
        this.updateNote = async (req, res, next) => {
            try {
                const noteDTO = {
                    id: req.body.id,
                    content: req.body.name
                }
                const data = await this.nService.update(noteDTO);
                const response = resObject(200, true, '노트 수정 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }

        this.moveNote = async (req, res, next) => {
            try {
                const noteDTO = {
                    id: req.body.id,
                    columns_id: req.body.columns_id,
                    next_note: req.body.next_note
                }
                const data = await this.nService.move(noteDTO);
                const response = resObject(200, true, '노트 이동 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }

        this.deleteNote = async (req, res, next) => {
            try {
                const note_id = req.params.noteId;
                const data = await this.nService.delete(note_id);
                const response = resObject(200, true, '노트 삭제 성공', data);
                res.send(response);
            } catch (err) {
                const response = resObject(400, false, err.sqlMessage, null);
                res.send(response);
            }
        }
    }
}


module.exports = new NoteController();
