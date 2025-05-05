const Board = require('../models/Boardmodel');
const List = require('../models/Listmodel');
const Card = require('../models/Cardmodel');

// Get all boards for a user
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      $or: [
        { owner: req.user.id },
        { members: req.user.id },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching boards', error: err.message });
  }
};

// Get a single board with its lists and cards
exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate({
        path: 'lists',
        options: { sort: { position: 1 } },
        populate: {
          path: 'cards',
          options: { sort: { position: 1 } },
        },
      });

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Check if user has access to this board
    if (
      board.visibility === 'Private' &&
      board.owner.toString() !== req.user.id &&
      !board.members.includes(req.user.id)
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching board', error: err.message });
  }
};

// Create a new board
exports.createBoard = async (req, res) => {
  try {
    const { title, background, visibility } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newBoard = new Board({
      title,
      background,
      visibility: visibility || 'Workspace',
      owner: req.user.id,
      members: [],
    });

    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (err) {
    res.status(500).json({ message: 'Error creating board', error: err.message });
  }
};

// Update a board
exports.updateBoard = async (req, res) => {
  try {
    const { title, background, visibility } = req.body;
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Check if user has permission to update
    if (board.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    if (title) board.title = title;
    if (background) board.background = background;
    if (visibility) board.visibility = visibility;

    board.updatedAt = Date.now();
    await board.save();

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Error updating board', error: err.message });
  }
};

// Delete a board
exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Check if user has permission to delete
    if (board.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Delete associated lists and cards
    const lists = await List.find({ board: board._id });

    for (const list of lists) {
      await Card.deleteMany({ list: list._id });
      await list.remove();
    }

    await board.remove();

    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting board', error: err.message });
  }
};

// Add a member to board
exports.addBoardMember = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Check if user has permission to add members
    if (board.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Check if member already exists
    if (board.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a member of this board' });
    }

    board.members.push(userId);
    board.updatedAt = Date.now();
    await board.save();

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Error adding board member', error: err.message });
  }
};

// Remove a member from board
exports.removeBoardMember = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Check if user has permission to remove members
    if (board.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Filter out the member
    board.members = board.members.filter((member) => member.toString() !== userId);
    board.updatedAt = Date.now();
    await board.save();

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Error removing board member', error: err.message });
  }
};
