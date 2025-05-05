import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProfileMenu from './ProfileMenu'; // adjust path if needed
import { FaBell } from 'react-icons/fa'; // Import Bell icon from react-icons


export default function Navbar({ darkMode, toggleDarkMode, toggleSidebar, handleCreateBoard, setIsLoggedIn }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);  // Toggle search input on mobile
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();

  const menus = [
    { name: "Workspaces", items: ["Team 1", "Team 2", "Create Workspace"] },
    { name: "Recent", items: ["Project A", "Project B"] }, 
    { name: "Starred", items: ["Favorite 1", "Favorite 2"] },
    { name: "Templates", items: ["Kanban", "Scrum"] },
    { name: "Create", items: ["Board", "Template"] },
    
  ];

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleItemClick = (menuName, itemName) => {
    if (menuName === 'Create' && itemName === 'Board') {
      navigate('/boardhome'); // Navigate to board page
      setOpenDropdown(null);
    }
  };

  const handleLogout = () => {
    // Remove auth token
    localStorage.removeItem('token');
    
    // Update app state
    setIsLoggedIn(false);
    
    // Navigate to login page
    navigate('/login');
    
    console.log("User logged out");
  };
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center space-x-3">
          <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:inline-block">
            <svg className="h-6 w-6 text-gray-600 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Trello
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 relative">
          {menus.map((menu) => (
            <div key={menu.name} className="relative group">
              <button
                onClick={() => toggleDropdown(menu.name)}
                className={`font-medium px-3 py-1 rounded 
                  ${menu.name === 'Create' 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                {menu.name}
              </button>
              {openDropdown === menu.name && (
                <div className="absolute left-0 mt-2 bg-white dark:bg-gray-700 shadow-lg rounded w-48 z-50">
                  {menu.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleItemClick(menu.name, item)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>


        {/* Right Side (Search, Dark Mode Toggle, Profile) */}
        <div className="flex items-center space-x-4">
          {/* Search Icon (Mobile) */}
          <div className="md:hidden flex items-center">
            <svg
              className="h-6 w-6 text-gray-600 dark:text-gray-200 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 20 20"
              onClick={() => setShowSearchInput(!showSearchInput)}
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM10 16a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>

           {/* Notification */}
           <div className="relative">
              <button 
                className="text-gray-600 hover:bg-gray-100 p-2 rounded-full relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell size={18} /> {/* Use the imported Bell icon */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && <NotificationsPanel />}
            </div>



          {/* Search Bar */}
          <div className={`relative ${showSearchInput ? 'block' : 'hidden'} md:block w-25 md:w-80`}>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM10 16a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
 
          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="text-xl">
            {darkMode ? '🌙' : '☀️'}
          </button>

          {/* Profile Button and Menu */}
          <ProfileMenu onLogout={handleLogout} />
        </div>
          
        

        {/* Mobile View Dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={() => setShowMobileDropdown(!showMobileDropdown)}
            className="px-10 py-2 dark:text-gray-300 font-medium rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Menu 
          </button>
          {showMobileDropdown && (
            <div className="absolute left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded w-31 z-10">
              {menus.map((menu) => (
                <div key={menu.name} className="border-b dark:border-gray-700">
                  <button aria-haspopup="true" aria-expanded={openDropdown === menu.name}
                    onClick={() => toggleDropdown(menu.name)}
                    className="w-full text-left px-4 py-2 font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {menu.name}
                  </button>
                  {openDropdown === menu.name && (
                    <div className="pl-4 space-y-1 pb-2">
                      {menu.items.map((item, i) => (
                        <button aria-haspopup="true" aria-expanded={openDropdown === menu.name}
                          key={i}
                          onClick={() => handleItemClick(menu.name, item)}
                          className="block text-left w-full text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
const NotificationsPanel = () => {
  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="font-medium">Notifications</h3>
        <button className="text-blue-600 text-sm hover:underline">Mark all as read</button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
          <div className="flex items-start">
            <span className="bg-blue-100 text-blue-600 p-2 rounded mr-3">
            <FaBell />

            </span>
            <div>
              <p className="text-sm"><span className="font-medium">Alex Johnson</span> added you to the card <span className="font-medium">Update API documentation</span></p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>
        <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
          <div className="flex items-start">
            <span className="bg-green-100 text-green-600 p-2 rounded mr-3">
            <FaBell />

            </span>
            <div>
              <p className="text-sm"><span className="font-medium">Jane Smith</span> completed the task <span className="font-medium">Fix bug in the login form</span></p>
              <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 text-center border-t">
        <button className="text-blue-600 hover:underline text-sm">View all notifications</button>
      </div>
    </div>
  );
};
