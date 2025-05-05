import React, { useState } from "react";

const CreateBoard = ({ isOpen, onClose, onCreateBoard }) => {
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("blue");
  const [visibility, setVisibility] = useState("Workspace");
  const [titleError, setTitleError] = useState(false);

  const backgroundOptions = [
    // Image backgrounds
    { id: "mountain1", type: "image", src: "/api/placeholder/100/70", label: "Mountain View" },
    { id: "mountain2", type: "image", src: "/api/placeholder/100/70", label: "Mountain Peak" },
    { id: "texture", type: "image", src: "/api/placeholder/100/70", label: "Texture" },
    { id: "lake", type: "image", src: "/api/placeholder/100/70", label: "Lake" },
    // Color backgrounds
    { id: "light-blue", type: "color", color: "#e3f2fd", label: "Light Blue" },
    { id: "blue", type: "color", color: "#2196f3", label: "Blue" },
    { id: "green", type: "color", color: "#4caf50", label: "Green" },
    { id: "purple", type: "color", color: "#9c27b0", label: "Purple" },
    { id: "pink", type: "color", color: "#ca5baa", label: "Pink" },
  ];

  const handleSubmit = () => {
    if (boardTitle.trim() === "") {
      setTitleError(true);
      return;
    }

    onCreateBoard({
      title: boardTitle,
      background: selectedBackground, // This will be either a color ID or image ID
      visibility,
    });

    // Reset form
    setBoardTitle("");
    setSelectedBackground("blue"); // Default to blue
    setTitleError(false);
    onClose();
  };

  // Preview the selected background at the top of the modal
  const renderBackgroundPreview = () => {
    const selectedBg = backgroundOptions.find(bg => bg.id === selectedBackground);
    
    if (!selectedBg) return null;
    
    if (selectedBg.type === "color") {
      return (
        <div 
          className="h-24 rounded-lg mb-4 flex items-center justify-center"
          style={{ backgroundColor: selectedBg.color }}
        >
          <input
            type="text"
            value={boardTitle || "Your board title"}
            onChange={(e) => setBoardTitle(e.target.value)}
            placeholder="Board Title"
            className="bg-white bg-opacity-30 text-white border-none outline-none text-xl p-2 rounded-md w-3/4 text-center placeholder-white"
          />
        </div>
      );
    } else {
      // For image backgrounds
      return (
        <div 
          className={`h-24 rounded-lg mb-4 flex items-center justify-center bg-cover bg-center`}
          style={{ backgroundImage: `url(${selectedBg.src})` }}
        >
          <input
            type="text"
            value={boardTitle || "Your board title"}
            onChange={(e) => setBoardTitle(e.target.value)}
            placeholder="Board Title"
            className="bg-white bg-opacity-30 text-white border-none outline-none text-xl p-2 rounded-md w-3/4 text-center placeholder-white"
          />
        </div>
      );
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-screen overflow-y-auto">
            <h2 className="text-2xl mb-4">Create New Board</h2>
            
            {/* Background preview with title input */}
            {renderBackgroundPreview()}
            
            {/* Only show text input if not shown in preview */}
            {!renderBackgroundPreview() && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Board Title
                </label>
                <input
                  type="text"
                  value={boardTitle}
                  onChange={(e) => {
                    setBoardTitle(e.target.value);
                    if (e.target.value.trim() !== "") setTitleError(false);
                  }}
                  placeholder="Board Title"
                  className="w-full p-2 border rounded-md"
                />
                {titleError && (
                  <span className="text-red-500 text-sm">Title is required!</span>
                )}
              </div>
            )}

            {/* Background selection */}
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-gray-700">Select a Background</p>
              
              {/* Background options */}
              <div className="grid grid-cols-3 gap-2">
                {backgroundOptions.map((bg) => (
                  <div
                    key={bg.id}
                    onClick={() => setSelectedBackground(bg.id)}
                    className={`cursor-pointer rounded-md h-16 overflow-hidden ${
                      selectedBackground === bg.id
                        ? "ring-2 ring-blue-500 ring-offset-1"
                        : "hover:opacity-80"
                    }`}
                    title={bg.label}
                  >
                    {bg.type === "image" ? (
                      <img
                        src={bg.src}
                        alt={bg.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundColor: bg.color,
                        }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Visibility selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visibility
              </label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="border p-2 rounded-md w-full"
              >
                <option value="Workspace">Workspace</option>
                <option value="Private">Private</option>
              </select>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={boardTitle.trim() === ""}
              >
                Create Board
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBoard;