import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBoard } from '../context/BoardContext';
import { formatDate, isOverdue, mockUsers, labelColors } from '../utils/helpers';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Card({ card, listId, boardId }) {
  const { dispatch, actions } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardData, setCardData] = useState(card);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleUpdateCard = () => {
    dispatch({
      type: actions.UPDATE_CARD,
      payload: {
        boardId,
        listId,
        cardId: card.id,
        updates: cardData,
      },
    });
    setIsEditing(false);
  };

  const handleDeleteCard = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      dispatch({
        type: actions.DELETE_CARD,
        payload: {
          boardId,
          listId,
          cardId: card.id,
        },
      });
    }
  };

  const handleAddLabel = (labelId) => {
    const label = labelColors.find((l) => l.id === labelId);
    if (!label) return;

    setCardData({
      ...cardData,
      labels: cardData.labels.some((l) => l.id === labelId)
        ? cardData.labels.filter((l) => l.id !== labelId)
        : [...cardData.labels, label],
    });
  };

  const handleAddMember = (memberId) => {
    const member = mockUsers.find((m) => m.id === memberId);
    if (!member) return;

    setCardData({
      ...cardData,
      members: cardData.members.some((m) => m.id === memberId)
        ? cardData.members.filter((m) => m.id !== memberId)
        : [...cardData.members, member],
    });
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsModalOpen(true)}
      >
        {cardData.labels.length > 0 && (
          <div className="flex gap-1 mb-2">
            {cardData.labels.map((label) => (
              <div
                key={label.id}
                className="h-2 w-12 rounded-full"
                style={{ backgroundColor: label.color }}
              />
            ))}
          </div>
        )}

        <h4 className="text-gray-900 dark:text-white font-medium mb-2">{cardData.title}</h4>

        {cardData.dueDate && (
          <div
            className={`text-sm ${
              isOverdue(cardData.dueDate)
                ? 'text-red-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Due: {formatDate(cardData.dueDate)}
          </div>
        )}

        {cardData.members.length > 0 && (
          <div className="flex -space-x-2 mt-2">
            {cardData.members.map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700"
                title={member.name}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={cardData.title}
                    onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
                    className="text-xl font-semibold w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    autoFocus
                  />
                ) : (
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {cardData.title}
                  </h3>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleDeleteCard}
                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </h4>
                  {isEditing ? (
                    <textarea
                      value={cardData.description}
                      onChange={(e) =>
                        setCardData({ ...cardData, description: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      {cardData.description || 'No description'}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Date
                  </h4>
                  <DatePicker
                    selected={cardData.dueDate ? new Date(cardData.dueDate) : null}
                    onChange={(date) =>
                      setCardData({ ...cardData, dueDate: date?.toISOString() })
                    }
                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholderText="No due date"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Labels
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {labelColors.map((label) => (
                      <button
                        key={label.id}
                        onClick={() => handleAddLabel(label.id)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          cardData.labels.some((l) => l.id === label.id)
                            ? 'text-white'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                        style={{
                          backgroundColor: cardData.labels.some((l) => l.id === label.id)
                            ? label.color
                            : 'transparent',
                          border: `1px solid ${label.color}`,
                        }}
                      >
                        {label.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Members
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mockUsers.map((member) => (
                      <button
                        key={member.id}
                        onClick={() => handleAddMember(member.id)}
                        className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                          cardData.members.some((m) => m.id === member.id)
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{member.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setCardData(card);
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateCard}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 