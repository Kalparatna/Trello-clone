// src/components/BoardHeader.jsx
export default function BoardHeader({ title, onAddBoard, onAddList }) {
    return (
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <div className="flex space-x-2">
          <button
            onClick={onAddBoard}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            ➕ Create Board
          </button>
          <button
            onClick={onAddList}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ➕ Add List
          </button>
        </div>
      </div>
    );
  }
  