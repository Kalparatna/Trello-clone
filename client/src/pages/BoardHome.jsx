import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBoard } from '../context/BoardContext';
import { generateId } from '../utils/helpers';

const backgrounds = [
  { type: 'image', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80' },
  { type: 'color', color: '#60A5FA' }, // Blue
  { type: 'color', color: '#F472B6' }, // Pink
  { type: 'color', color: '#34D399' }, // Green
];

export default function BoardHome() {
  const { state, dispatch, actions } = useBoard();
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0]);
  const [visibility, setVisibility] = useState('Workspace');

  const handleCreateBoard = () => {
    if (!newBoardTitle.trim()) return;

    const newBoard = {
      id: generateId(),
      title: newBoardTitle.trim(),
      background: selectedBackground,
      visibility,
      lists: [],
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: actions.ADD_BOARD, payload: newBoard });
    setNewBoardTitle('');
    setIsCreating(false);
    setSelectedBackground(backgrounds[0]);
    setVisibility('Workspace');
  };

  return (
    <div className="p-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Boards</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Create Board
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden w-96">
            {/* Background Preview */}
            <div className="h-32 w-full" style={{
              background: selectedBackground.type === 'image'
                ? `url(${selectedBackground.src}) center/cover`
                : selectedBackground.color
            }} />

            {/* Create Board Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create Board</h2>

              {/* Background Selection */}
              <div className="flex flex-wrap gap-2 mb-4">
                {backgrounds.map((bg, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBackground(bg)}
                    className="w-12 h-8 rounded overflow-hidden border-2 border-transparent hover:border-blue-500"
                    style={{
                      background: bg.type === 'image'
                        ? `url(${bg.src}) center/cover`
                        : bg.color
                    }}
                  />
                ))}
              </div>

              {/* Board Title Input */}
              <input
                type="text"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                placeholder="Board title"
                className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                autoFocus
              />

              {/* Visibility Dropdown */}
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="Workspace">Workspace</option>
                <option value="Private">Private</option>
              </select>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCreateBoard}
                  disabled={!newBoardTitle.trim()}
                  className={`w-full px-4 py-2 rounded-lg ${newBoardTitle.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                >
                  Create
                </button>

                <button
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
                >
                  Start with a Template
                </button>

                <button
                  onClick={() => setIsCreating(false)}
                  className="w-full px-4 py-2 text-gray-500 hover:text-gray-700 mt-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Boards List */}
      {state.boards.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            You don't have any boards yet. Click the button above to create one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.boards.map((board) => (
            <Link
              key={board.id}
              to={`/board/${board.id}`}
              className="block p-6 rounded-lg shadow hover:shadow-lg transition relative"
              style={{
                background: board.background?.type === 'image'
                  ? `url(${board.background.src}) center/cover`
                  : board.background?.color || 'white'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg" />
              <div className="relative z-10">
                <h2 className="text-xl font-semibold text-white mb-2">{board.title}</h2>
                <p className="text-sm text-gray-200">
                  {board.lists.length} {board.lists.length === 1 ? 'list' : 'lists'} • Created on{' '}
                  {new Date(board.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
