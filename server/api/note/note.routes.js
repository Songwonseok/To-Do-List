const express = require('express');
const router = express.Router();
const noteController = require('./note.controller')
const logController = require('../log/log.controller')

router.get('/:noteId', noteController.findNote);
router.post('/', noteController.insertNote, logController.insertNoteLog); // 로그
router.put('/update', noteController.updateNote, logController.editNoteLog); //로그
router.put('/move', noteController.moveNote, logController.moveNoteLog); // 로그
router.delete('/:noteId', noteController.deleteNote, logController.removeNoteLog); // 로그

module.exports = router;
