// src/components/EmptyBoardMessage.jsx
import React from 'react';
import CreateBoard from './CreateBoard';

export default function EmptyBoardMessage({ openModal, isCreateBoardModalOpen, onCloseModal, onCreateBoard }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Welcome to Your Board Manager</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          No board is currently selected. Create a new board to get started.
        </p>
      </div>
      
      <button
        onClick={openModal}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        ➕ Create Your First Board
      </button>
      
      <CreateBoard
        isOpen={isCreateBoardModalOpen}
        onClose={onCloseModal}
        onCreateBoard={onCreateBoard}
      />
    </div>
  );
}
