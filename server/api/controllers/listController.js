const List = require('../models/List');
const Board = require('../models/Board');
const Card = require('../models/Card');

// Get all lists for a board
exports.getLists = async (req, res) => {
  try {
    const { boardId } = req.params;
    
    // Check if user has access to this board
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    if (board.visibility === 'Private' && 
        board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const lists = await List.find({ board: boardId })
      .sort({ position: 1 })
      .populate({
        path: 'cards',
        options: { sort: { position: 1 } }
      });
    
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lists', error: err.message });
  }
};

// Get a single list with its cards
exports.getList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id)
      .populate({
        path: 'cards',
        options: { sort: { position: 1 } }
      });
    
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    
    // Check if user has access to the board this list belongs to
    const board = await Board.findById(list.board);
    
    if (board.visibility === 'Private' && 
        board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching list', error: err.message });
  }
};

// Create a new list
exports.createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;
    
    if (!title || !boardId) {
      return res.status(400).json({ message: 'Title and boardId are required' });
    }
    
    // Check if user has access to the board
    const board = await Board.findById(boardId);
    
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    if (board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    // Find the highest position to add the new list at the end
    const maxPositionList = await List.findOne({ board: boardId })
      .sort({ position: -1 });
    
    const position = maxPositionList ? maxPositionList.position + 1 : 0;
    
    const newList = new List({
      title,
      board: boardId,
      position
    });
    
    await newList.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ message: 'Error creating list', error: err.message });
  }
};

// Update a list
exports.updateList = async (req, res) => {
  try {
    const { title, position } = req.body;
    const list = await List.findById(req.params.id);
    
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    
    // Check if user has permission to update
    const board = await Board.findById(list.board);
    
    if (board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    if (title) list.title = title;
    if (position !== undefined) list.position = position;
    
    list.updatedAt = Date.now();
    await list.save();
    
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error updating list', error: err.message });
  }
};

// Delete a list
exports.deleteList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    
    // Check if user has permission to delete
    const board = await Board.findById(list.board);
    
    if (board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    // Delete all cards in this list
    await Card.deleteMany({ list: list._id });
    
    await list.remove();
    
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting list', error: err.message });
  }
};

// Reorder lists (drag and drop functionality)
exports.reorderLists = async (req, res) => {
  try {
    const { boardId, lists } = req.body;
    
    if (!boardId || !lists || !Array.isArray(lists)) {
      return res.status(400).json({ message: 'BoardId and lists array are required' });
    }
    
    // Check if user has permission
    const board = await Board.findById(boardId);
    
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    if (board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    // Update positions for all lists
    const updatePromises = lists.map((item, index) => {
      return List.findByIdAndUpdate(item.id, { position: index });
    });
    
    await Promise.all(updatePromises);
    
    const updatedLists = await List.find({ board: boardId }).sort({ position: 1 });
    
    res.status(200).json(updatedLists);
  } catch (err) {
    res.status(500).json({ message: 'Error reordering lists', error: err.message });
  }
};