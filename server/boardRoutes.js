const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/boardController');

// Boards
router.get('/boards', ctrl.getBoards);
router.post('/boards', ctrl.createBoard);
router.put('/boards/:id', ctrl.updateBoard);
router.delete('/boards/:id', ctrl.deleteBoard);

// Lists
router.post('/boards/:boardId/lists', ctrl.addList);
router.put('/boards/:boardId/lists/:listId', ctrl.updateList);
router.delete('/boards/:boardId/lists/:listId', ctrl.deleteList);

// Cards
router.post('/boards/:boardId/lists/:listId/cards', ctrl.addCard);
router.put('/boards/:boardId/lists/:listId/cards/:cardId', ctrl.updateCard);
router.delete('/boards/:boardId/lists/:listId/cards/:cardId', ctrl.deleteCard);

// Move operations
router.put('/boards/:boardId/move-card', ctrl.moveCard);
router.put('/boards/:boardId/move-list', ctrl.moveList);

module.exports = router;
