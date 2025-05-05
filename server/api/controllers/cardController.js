const Card = require('../models/Card');
const List = require('../models/List');
const Board = require('../models/Board');

// Get all cards for a list
exports.getCards = async (req, res) => {
  try {
    const { listId } = req.params;
    
    // Check if the list exists
    const list = await List.findById(listId);
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
    
    const cards = await Card.find({ list: listId }).sort({ position: 1 });
    
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cards', error: err.message });
  }
};

// Get a single card
exports.getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    // Check if user has access to the board this card belongs to
    const board = await Board.findById(card.board);
    
    if (board.visibility === 'Private' && 
        board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching card', error: err.message });
  }
};

// Create a new card
exports.createCard = async (req, res) => {
  try {
    const { title, listId, description } = req.body;
    
    if (!title || !listId) {
      return res.status(400).json({ message: 'Title and listId are required' });
    }
    
    // Check if the list exists
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    
    // Check if user has access to the board
    const board = await Board.findById(list.board);
    
    if (board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    // Find the highest position to add the new card at the end
    const maxPositionCard = await Card.findOne({ list: listId })
      .sort({ position: -1 });
    
    const position = maxPositionCard ? maxPositionCard.position + 1 : 0;
    
    const newCard = new Card({
      title,
      description: description || '',
      list: listId,
      board: list.board,
      position,
      createdBy: req.user.id
    });
    
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ message: 'Error creating card', error: err.message });
  }
};

// Update a card
exports.updateCard = async (req, res) => {
  try {
    const { title, description, position, listId, dueDate, labels, cover, members } = req.body;
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    // Check if user has permission to update
    const board = await Board.findById(card.board);
    
    if (board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    // Update card fields
    if (title) card.title = title;
    if (description !== undefined) card.description = description;
    if (position !== undefined) card.position = position;
    if (dueDate !== undefined) card.dueDate = dueDate;
    if (labels) card.labels = labels;
    if (cover) card.cover = cover;
    if (members) card.members = members;
    
    // If list is changing, update the list reference
    if (listId && listId !== card.list.toString()) {
      // Check if the new list exists and belongs to the same board
      const newList = await List.findById(listId);
      if (!newList) {
        return res.status(404).json({ message: 'List not found' });
      }
      
      if (newList.board.toString() !== card.board.toString()) {
        return res.status(400).json({ message: 'Cannot move card to a list on a different board' });
      }
      
      card.list = listId;
    }
    
    card.updatedAt = Date.now();
    await card.save();
    
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Error updating card', error: err.message });
  }
};

// Delete a card
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    // Check if user has permission to delete
    const board = await Board.findById(card.board);
    
    if (board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    await card.remove();
    
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting card', error: err.message });
  }
};

// Add an attachment to a card
exports.addAttachment = async (req, res) => {
  try {
    const { name, url } = req.body;
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    // Check if user has permission
    const board = await Board.findById(card.board);
    
    if (board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    const attachment = {
      name,
      url,
      added: Date.now()
    };
    
    card.attachments.push(attachment);
    card.updatedAt = Date.now();
    await card.save();
    
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Error adding attachment', error: err.message });
  }
};

// Remove an attachment from a card
exports.removeAttachment = async (req, res) => {
  try {
    const { attachmentId } = req.params;
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    // Check if user has permission
    const board = await Board.findById(card.board);
    
    if (board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    // Find and remove the attachment
    card.attachments = card.attachments.filter(
      attachment => attachment._id.toString() !== attachmentId
    );
    
    card.updatedAt = Date.now();
    await card.save();
    
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Error removing attachment', error: err.message });
  }
};

// Move a card to another list
exports.moveCard = async (req, res) => {
  try {
    const { cardId, sourceListId, destinationListId, position } = req.body;
    
    if (!cardId || !sourceListId || !destinationListId || position === undefined) {
      return res.status(400).json({ 
        message: 'cardId, sourceListId, destinationListId, and position are required' 
      });
    }
    
    const card = await Card.findById(cardId);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    // Check if user has permission
    const board = await Board.findById(card.board);
    
    if (board.owner.toString() !== req.user.id && 
        !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    
    // If moving to a different list
    if (sourceListId !== destinationListId) {
      // Check if the destination list exists and belongs to the same board
      const destList = await List.findById(destinationListId);
      
      if (!destList) {
        return res.status(404).json({ message: 'Destination list not found' });
      }
      
      if (destList.board.toString() !== card.board.toString()) {
        return res.status(400).json({ message: 'Cannot move card to a list on a different board' });
      }
      
      card.list = destinationListId;
    }
    
    card.position = position;
    card.updatedAt = Date.now();
    await card.save();
    
    // Reorder other cards in the destination list
    const cardsToUpdate = await Card.find({ 
      list: destinationListId, 
      _id: { $ne: cardId },
      position: { $gte: position }
    });
    
    const updatePromises = cardsToUpdate.map(cardToUpdate => {
      cardToUpdate.position = cardToUpdate.position + 1;
      return cardToUpdate.save();
    });
    
    await Promise.all(updatePromises);
    
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Error moving card', error: err.message });
  }
};