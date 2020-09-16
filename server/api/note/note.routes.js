const express = require('express');
const router = express.Router();
const noteController = require('./note.controller')


router.get('/:noteId', noteController.findNote);
router.post('/', noteController.insertNote);
router.put('/update', noteController.updateNote);
router.put('/move', noteController.moveNote);
router.delete('/:noteId', noteController.deleteNote);

module.exports = router;
