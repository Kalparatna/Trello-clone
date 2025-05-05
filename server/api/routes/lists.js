const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const auth = require('../middleware/auth');

// @route   GET /api/lists/board/:boardId
// @desc    Get all lists for a board
// @access  Private
router.get('/board/:boardId', auth, listController.getLists);

// @route   GET /api/lists/:id
// @desc    Get a single list with its cards
// @access  Private
router.get('/:id', auth, listController.getList);

// @route   POST /api/lists
// @desc    Create a new list
// @access  Private
router.post('/', auth, listController.createList);

// @route   PUT /api/lists/:id
// @desc    Update a list
// @access  Private
router.put('/:id', auth, listController.updateList);

// @route   DELETE /api/lists/:id
// @desc    Delete a list
// @access  Private
router.delete('/:id', auth, listController.deleteList);

// @route   PUT /api/lists/reorder
// @desc    Reorder lists (drag and drop functionality)
// @access  Private
router.put('/reorder', auth, listController.reorderLists);

module.exports = router;