const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const auth = require('../middleware/auth');

// @route   GET /api/cards/list/:listId
// @desc    Get all cards for a list
// @access  Private
router.get('/list/:listId', auth, cardController.getCards);

// @route   GET /api/cards/:id
// @desc    Get a single card
// @access  Private
router.get('/:id', auth, cardController.getCard);

// @route   POST /api/cards
// @desc    Create a new card
// @access  Private
router.post('/', auth, cardController.createCard);

// @route   PUT /api/cards/:id
// @desc    Update a card
// @access  Private
router.put('/:id', auth, cardController.updateCard);

// @route   DELETE /api/cards/:id
// @desc    Delete a card
// @access  Private
router.delete('/:id', auth, cardController.deleteCard);

// @route   POST /api/cards/:id/attachments
// @desc    Add an attachment to a card
// @access  Private
router.post('/:id/attachments', auth, cardController.addAttachment);

// @route   DELETE /api/cards/:id/attachments/:attachmentId
// @desc    Remove an attachment from a card
// @access  Private
router.delete('/:id/attachments/:attachmentId', auth, cardController.removeAttachment);

// @route   PUT /api/cards/move
// @desc    Move a card to another list
// @access  Private
router.put('/move', auth, cardController.moveCard);

module.exports = router;