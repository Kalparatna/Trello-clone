import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBoard } from '../context/BoardContext';
import { generateId, getBackgroundStyle } from '../utils/helpers';
import List from '../components/List';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import CreateBoard from '../components/CreateBoard';

export default function BoardPage() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, actions } = useBoard();
  const [newListTitle, setNewListTitle] = useState('');
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [isCreateBoardModalOpen, setCreateBoardModalOpen] = useState(false);
  
  const board = state.boards.find((b) => b.id === boardId);

  useEffect(() => {
    if (!board) navigate('/');
  }, [board, navigate]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = board.lists.findIndex((list) => list.id === active.id);
    const newIndex = board.lists.findIndex((list) => list.id === over.id);

    dispatch({
      type: actions.MOVE_LIST,
      payload: { boardId, sourceIndex: oldIndex, destIndex: newIndex },
    });
  };

  const handleCreateList = () => {
    if (!newListTitle.trim()) return;

    const newList = {
      id: generateId(),
      title: newListTitle.trim(),
      cards: [],
    };

    dispatch({
      type: actions.ADD_LIST,
      payload: { boardId, list: newList },
    });

    setNewListTitle('');
    setIsCreatingList(false);
  };

  const handleCreateBoard = (newBoard) => {
    const boardWithId = {
      ...newBoard,
      id: generateId(),
      lists: [],
    };

    dispatch({
      type: actions.ADD_BOARD,
      payload: boardWithId,
    });

    navigate(`/board/${boardWithId.id}`);
  };

  // If board doesn't exist, show a minimal UI
  if (!board) return (
    <div className="p-4 mt-16"> {/* Added top margin */}
      <button
        onClick={() => setCreateBoardModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Create Board
      </button>
      
      <CreateBoard
        isOpen={isCreateBoardModalOpen}
        onClose={() => setCreateBoardModalOpen(false)}
        onCreateBoard={handleCreateBoard}
      />
    </div>
  );

  // Get background style based on board.background using our helper function
  const { style: bgStyle, className: bgClass } = getBackgroundStyle(board.background);

  return (
    <div 
      className={`min-h-screen pt-16 ${bgClass}`} /* Added top padding to create space below navbar */
      style={bgStyle}
    >
      {/* Header with board title and actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white mr-4">{board.title}</h1>
          <button className="bg-white bg-opacity-30 hover:bg-opacity-40 text-white px-3 py-1 rounded text-sm">
            <span className="mr-1">⚙️</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-white bg-opacity-30 hover:bg-opacity-40 text-white px-3 py-1 rounded flex items-center text-sm">
            <span className="mr-1">👤</span> Share
          </button>
          <button className="bg-white bg-opacity-30 hover:bg-opacity-40 text-white px-2 py-1 rounded text-sm">
            •••
          </button>
        </div>
      </div>

      {/* Board content with lists */}
      <div className="px-4 pb-8">
        <div className="flex space-x-3 overflow-x-auto">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={board.lists.map((list) => list.id)} strategy={horizontalListSortingStrategy}>
              {board.lists.map((list) => (
                <List key={list.id} list={list} boardId={boardId} />
              ))}
            </SortableContext>
          </DndContext>

          {/* Add another list button - style matches the board background */}
          <div className="min-w-72 bg-white bg-opacity-30 hover:bg-opacity-40 rounded-lg p-2 h-fit">
            <button
              onClick={() => setIsCreatingList(true)}
              className="flex items-center text-white w-full px-2 py-2 text-left rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <span className="mr-2">+</span> Add another list
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Create List */}
      {isCreatingList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Create New List
            </h2>
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="List title"
              className="w-full px-4 py-2 border rounded-lg mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsCreatingList(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateList}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Board Modal */}
      <CreateBoard
        isOpen={isCreateBoardModalOpen}
        onClose={() => setCreateBoardModalOpen(false)}
        onCreateBoard={handleCreateBoard}
      />
    </div>
  );
}