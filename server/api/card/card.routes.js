const express = require('express');
const router = express.Router();
const cardController = require('./card.controller')


router.get('/:cardId', cardController.findCard);
router.post('/', cardController.insertCard);
router.put('/update', cardController.updateCard);
router.put('/move', cardController.moveCard);
router.delete('/:cardId', cardController.deleteCard);

module.exports = router;
