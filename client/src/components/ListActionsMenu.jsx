import { useState, useRef, useEffect } from 'react';
import { XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ListActionsMenu({ onClose, listId, listTitle }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [automationExpanded, setAutomationExpanded] = useState(false);
  const [colorSectionExpanded, setColorSectionExpanded] = useState(false);
  const menuRef = useRef(null);

  // Colors palette matching the image
  const colorOptions = [
    { id: 'green', color: '#4bce97' }, // Green
    { id: 'yellow', color: '#f5cd47' }, // Yellow
    { id: 'orange', color: '#f89c59' }, // Orange
    { id: 'red', color: '#f87168' }, // Red
    { id: 'purple', color: '#9f8fef' }, // Purple
    { id: 'blue', color: '#579dff' }, // Blue
    { id: 'teal', color: '#6cc3e0' }, // Teal
    { id: 'lime', color: '#94c748' }, // Lime
    { id: 'pink', color: '#e774bb' }, // Pink
    { id: 'gray', color: '#8590a2', border: true }, // Gray with border
  ];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
    // Here you would implement the actual color change functionality
    console.log(`Changed list color to ${colorId}`);
  };

  const handleRemoveColor = () => {
    setSelectedColor(null);
    console.log("Removed list color");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center" style={{ marginTop: '40px' }}>
      <div 
        ref={menuRef}
        className="bg-white rounded shadow-lg w-64 max-h-[90vh] overflow-y-auto"
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="text-sm font-medium">List actions</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* List actions */}
        <div className="py-1">
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
            Add card
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
            Copy list
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
            Move list
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
            Watch
          </button>

          <div className="border-t my-1"></div>

          {/* Change list color section */}
          <div className="px-4 py-2">
            <button 
              className="w-full flex items-center justify-between hover:bg-gray-100 text-sm"
              onClick={() => setColorSectionExpanded(!colorSectionExpanded)}
            >
              <div className="flex items-center">
                <span>Change list color</span>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">PREMIUM</span>
              </div>
              {colorSectionExpanded ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
            
            {colorSectionExpanded && (
              <div className="mt-2">
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map(({ id, color, border }) => (
                    <button
                      key={id}
                      className={`w-full h-8 rounded ${border ? 'border border-gray-300' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(id)}
                    />
                  ))}
                </div>
                <button 
                  onClick={handleRemoveColor}
                  className="w-full mt-2 flex items-center justify-center text-gray-500 hover:text-gray-700 text-sm py-1"
                >
                  <XMarkIcon className="w-4 h-4 mr-1" />
                  Remove color
                </button>
              </div>
            )}
          </div>

          <div className="border-t my-1"></div>

          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59z"/>
            </svg>
            Add list from Jira issues
          </button>

          <div className="border-t my-1"></div>

          {/* Automation section */}
          <div className="px-4 py-2">
            <button 
              className="w-full flex items-center justify-between hover:bg-gray-100 text-sm"
              onClick={() => setAutomationExpanded(!automationExpanded)}
            >
              <span>Automation</span>
              {automationExpanded ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
            
            {automationExpanded && (
              <div className="mt-2 space-y-2 text-sm">
                <p className="text-gray-600">When a card is added to the list...</p>
                <p className="text-gray-600">Every day, sort list by...</p>
                <p className="text-gray-600">Every Monday, sort list by...</p>
                <div className="flex items-center mt-2">
                  <a href="#" className="text-blue-600 hover:underline">Create a rule</a>
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3h-7z"/>
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="border-t my-1"></div>

          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
            Archive this list
          </button>
        </div>
      </div>
    </div>
  );
}