const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const auth = require('../middleware/auth');

// @route   GET /api/boards
// @desc    Get all boards for a user
// @access  Private
router.get('/', auth, boardController.getBoards);

// @route   GET /api/boards/:id
// @desc    Get a single board with its lists and cards
// @access  Private
router.get('/:id', auth, boardController.getBoard);

// @route   POST /api/boards
// @desc    Create a new board
// @access  Private
router.post('/', auth, boardController.createBoard);

// @route   PUT /api/boards/:id
// @desc    Update a board
// @access  Private
router.put('/:id', auth, boardController.updateBoard);

// @route   DELETE /api/boards/:id
// @desc    Delete a board
// @access  Private
router.delete('/:id', auth, boardController.deleteBoard);

// @route   POST /api/boards/:id/members
// @desc    Add a member to board
// @access  Private
router.post('/:id/members', auth, boardController.addBoardMember);

// @route   DELETE /api/boards/:id/members/:userId
// @desc    Remove a member from board
// @access  Private
router.delete('/:id/members/:userId', auth, boardController.removeBoardMember);

module.exports = router;