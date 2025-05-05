const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const auth = require('../middleware/auth');

router.get('/', auth, boardController.getBoards);

router.get('/:id', auth, boardController.getBoard);

router.post('/', auth, boardController.createBoard);

router.put('/:id', auth, boardController.updateBoard);


router.delete('/:id', auth, boardController.deleteBoard);

router.post('/:id/members', auth, boardController.addBoardMember);

router.delete('/:id/members/:userId', auth, boardController.removeBoardMember);

module.exports = router;