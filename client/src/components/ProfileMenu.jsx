import { useState, useEffect, useRef } from 'react'; // Keep this line only
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (item) => {
    setMenuOpen(false);
    if (item === 'Settings') {
      navigate('/settings');
    }
    // You can add more conditions here for other items
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // If onLogout prop exists, call it (to update parent component state)
    if (onLogout) {
      onLogout();
    }
    
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center"
      >
        U
      </button>
      
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-700 rounded shadow-lg z-50 text-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <div className="font-semibold text-gray-800 dark:text-white">Kalparatna Mahajan</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">kalparatna223@gmail.com</div>
          </div>
          
          <div className="p-2">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200">Switch accounts</button>
            <a href="https://myaccount.google.com" target="_blank" rel="noreferrer" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600">Manage account ↗</a>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 px-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 px-4 pt-2">TRELLO</div>
            {["Profile and visibility", "Activity", "Cards", "Settings"].map((item) => (
              <button
                key={item}
                onClick={() => handleMenuClick(item)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
              >
                {item}
              </button>
            ))}
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200">
              Theme →
            </button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 p-2">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200">
              👥 Create Workspace
            </button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 p-2">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200">
              Help
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200">
              Shortcuts
            </button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 p-2">
            <button 
              onClick={handleLogout} 
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
