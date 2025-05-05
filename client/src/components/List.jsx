import React, { useState } from 'react';
import { useBoard } from '../context/BoardContext';
import { generateId } from '../utils/helpers';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function List({ list, boardId }) {
  const { dispatch, actions } = useBoard();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: list.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;

    const newCard = {
      id: generateId(),
      title: newCardTitle.trim(),
      description: '',
    };

    dispatch({
      type: actions.ADD_CARD,
      payload: { boardId, listId: list.id, card: newCard },
    });

    setNewCardTitle('');
    setIsAddingCard(false);
  };

  const handleUpdateTitle = () => {
    if (!editedTitle.trim()) return;

    dispatch({
      type: actions.UPDATE_LIST,
      payload: {
        boardId,
        listId: list.id,
        updates: { title: editedTitle.trim() },
      },
    });

    setIsEditingTitle(false);
  };

  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      dispatch({
        type: actions.DELETE_LIST,
        payload: { boardId, listId: list.id },
      });
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-white rounded-lg shadow min-w-72 max-w-72 flex flex-col"
    >
      {/* List Header */}
      <div
        className="p-2 font-semibold flex items-center justify-between cursor-grab"
        {...listeners}
      >
        {isEditingTitle ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleUpdateTitle}
            onKeyPress={(e) => e.key === 'Enter' && handleUpdateTitle()}
            className="bg-white border border-blue-500 rounded px-2 py-1 w-full"
            autoFocus
          />
        ) : (
          <div
            className="px-2 py-1 w-full"
            onClick={() => setIsEditingTitle(true)}
          >
            {list.title}
          </div>
        )}
        <button
          onClick={handleDeleteList}
          className="text-gray-500 hover:text-gray-700"
        >
          •••
        </button>
      </div>

      {/* Card List */}
      <div className="overflow-y-auto flex-grow px-2 py-1">
        {list.cards.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-gray-200 rounded-md p-2 mb-2 shadow-sm hover:bg-gray-50 cursor-pointer"
          >
            {card.title}
          </div>
        ))}
      </div>

      {/* Add Card Section */}
      <div className="p-2">
        {isAddingCard ? (
          <div className="mb-2">
            <textarea
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Enter a title for this card..."
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              rows="3"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddCard}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Add Card
              </button>
              <button
                onClick={() => setIsAddingCard(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingCard(true)}
            className="flex items-center text-gray-600 w-full px-2 py-1 hover:bg-gray-100 rounded-md"
          >
            <span className="mr-1">+</span> Add a card
          </button>
        )}
      </div>
    </div>
  );
}

export default List;