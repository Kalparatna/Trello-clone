import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Search, Bell, Users, Plus, X, Star, ChevronDown, Bookmark, Clock, Settings, CreditCard, Layers, Menu, Edit, MoreHorizontal } from "lucide-react";

// Sample data with expanded information
const TEMPLATES = [
  { id: 1, title: "Basic Board", color: "bg-blue-500", isImage: false, stars: 234, category: "Project Management" },
  { id: 2, title: "Kanban Template", color: "bg-gradient-to-r from-teal-400 to-blue-400", isImage: false, stars: 543, category: "Engineering" },
  { id: 3, title: "Daily Task Management", isImage: true, stars: 187, category: "Productivity" },
  { id: 4, title: "Remote Team Hub", isImage: true, stars: 321, category: "Team Management" },
  { id: 5, title: "Product Roadmap", color: "bg-purple-500", isImage: false, stars: 412, category: "Project Management" },
  { id: 6, title: "Marketing Campaign", color: "bg-pink-400", isImage: false, stars: 156, category: "Marketing" },
];

const BOARDS = [
  { id: 1, title: "My Trello board", color: "bg-pink-500", isImage: false, isStarred: true, lastViewed: "2 hours ago" },
  { id: 2, title: "Product Roadmap", isImage: true, isStarred: false, lastViewed: "Yesterday" },
  { id: 3, title: "Weekly Sprint", color: "bg-blue-400", isImage: false, isStarred: true, lastViewed: "3 days ago" },
  { id: 4, title: "Marketing Ideas", color: "bg-yellow-400", isImage: false, isStarred: false, lastViewed: "1 week ago" },
];

const CATEGORIES = [
  "Project Management", "Engineering", "Marketing", "Design", "Education", "Sales", "HR", "Customer Support", "Productivity", "Team Management"
];

export default function Home() {
  const [showTemplatesPopup, setShowTemplatesPopup] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [starredBoards, setStarredBoards] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [filteredTemplates, setFilteredTemplates] = useState(TEMPLATES);

  // Initialize starred boards
  useEffect(() => {
    setStarredBoards(BOARDS.filter(board => board.isStarred));
  }, []);

  // Handle search and category filtering
  useEffect(() => {
    let filtered = TEMPLATES;
    
    if (searchQuery) {
      filtered = filtered.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(template => 
        template.category === selectedCategory
      );
    }
    
    setFilteredTemplates(filtered);
  }, [searchQuery, selectedCategory]);

  // Toggle star on a board
  const toggleStar = (boardId) => {
    const updatedBoards = BOARDS.map(board => {
      if (board.id === boardId) {
        return { ...board, isStarred: !board.isStarred };
      }
      return board;
    });
    
    // Update the boards list
    for (let i = 0; i < BOARDS.length; i++) {
      if (BOARDS[i].id === boardId) {
        BOARDS[i].isStarred = !BOARDS[i].isStarred;
      }
    }
    
    // Update starred boards list
    setStarredBoards(updatedBoards.filter(board => board.isStarred));
  };

  // Create Board Modal Component
  const CreateBoardModal = () => {
    const [boardTitle, setBoardTitle] = useState("");
    const [boardBackground, setBoardBackground] = useState("bg-blue-600");
    
    const backgrounds = [
      "bg-blue-600", "bg-purple-600", "bg-green-600", "bg-red-600", 
      "bg-yellow-500", "bg-pink-600", "bg-indigo-600", "bg-teal-600"
    ];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-medium">Create board</h3>
            <button 
              onClick={() => setShowCreateBoardModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4">
            {/* Board preview */}
            <div className={`h-32 rounded-lg mb-4 ${boardBackground} flex items-start p-3`}>
              <input
                type="text"
                placeholder="Add board title"
                className="bg-transparent text-white placeholder-white placeholder-opacity-80 font-medium focus:outline-none border-b-2 border-white border-opacity-50 w-full"
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
              />
            </div>
            
            {/* Background options */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Background</h4>
              <div className="grid grid-cols-4 gap-2">
                {backgrounds.map((bg, index) => (
                  <button 
                    key={index}
                    className={`h-12 rounded ${bg} ${boardBackground === bg ? 'ring-2 ring-blue-400' : ''}`}
                    onClick={() => setBoardBackground(bg)}
                  />
                ))}
              </div>
            </div>
            
            <button 
              className={`w-full py-2 rounded font-medium ${boardTitle ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              disabled={!boardTitle}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Board card component for reusability
  const BoardCard = ({ board, showLastViewed = false }) => {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
        <div className="relative">
          <div 
            className={`h-24 ${board.isImage ? "bg-cover bg-center" : board.color}`}
            style={board.isImage ? { backgroundImage: "url('/api/placeholder/300/150')" } : {}}
          ></div>
          
          <button 
            className={`absolute top-2 right-2 text-white ${board.isStarred ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} hover:scale-110 transition-all`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleStar(board.id);
            }}
          >
            <Star size={16} fill={board.isStarred ? "#ffffff" : "none"} />
          </button>
        </div>
        <div className="p-3">
          <h3 className="font-medium">{board.title}</h3>
          {showLastViewed && (
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <Clock size={12} className="mr-1" />
              {board.lastViewed}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
  
      
      <div className="flex">
        {/* Sidebar - hidden on mobile unless toggled */}
        <div className={`${showMobileMenu ? 'block' : 'hidden'} md:block w-64 bg-white border-r border-gray-200 shadow-sm h-[calc(100vh-56px)] sticky top-14 overflow-y-auto`}>
          <div className="p-4">
            <div className="space-y-1">
              <Link to="/" className="flex items-center p-2 bg-blue-50 text-blue-700 rounded">
                <Bookmark className="w-5 h-5 mr-3" />
                <span className="font-medium">Boards</span>
              </Link>
              
              <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors">
                <Users className="w-5 h-5 mr-3" />
                <span>Members</span>
              </button>
              
              <button 
                className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                onClick={() => setShowTemplatesPopup(true)}
              >
                <Layers className="w-5 h-5 mr-3" />
                <span>Templates</span>
              </button>
              
              <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors">
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </button>
            </div>
            
            {/* Starred Boards */}
            {starredBoards.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs uppercase text-gray-500 font-medium tracking-wider px-2 mb-2">
                  Starred Boards
                </h3>
                
                <div className="space-y-1">
                  {starredBoards.map(board => (
                    <Link key={board.id} to={`/board/${board.id}`} className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                      <div className={`w-3 h-3 rounded-sm mr-3 ${board.color || 'bg-gray-400'}`}></div>
                      <span className="truncate">{board.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="text-xs uppercase text-gray-500 font-medium tracking-wider px-2 mb-2">
                Workspaces
              </h3>
              
              <div className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded group cursor-pointer transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-teal-500 text-white rounded mr-2">
                    T
                  </div>
                  <span>Trello Workspace</span>
                </div>
                <button className="text-gray-400 hidden group-hover:block hover:text-gray-600 focus:outline-none">
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <div className="pl-10 space-y-1">
                <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors">
                  <Bookmark size={16} className="mr-2" />
                  <span>Boards</span>
                </button>
                
                <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors">
                  <Users size={16} className="mr-2" />
                  <span>Members</span>
                  <Plus size={14} className="ml-2 text-gray-500" />
                </button>
                
                <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors">
                  <Settings size={16} className="mr-2" />
                  <span>Settings</span>
                </button>
                
                <button className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors">
                  <CreditCard size={16} className="mr-2" />
                  <span>Billing</span>
                </button>
              </div>
            </div>
            
            {/* Create Workspace Button */}
            <button className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md py-2 text-sm flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Plus size={16} className="mr-2" />
              Create Workspace
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Templates Popup */}
          {showTemplatesPopup && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg mb-8">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <Layers size={18} className="mr-2 text-gray-600" />
                  <h2 className="text-lg font-medium">Most popular templates</h2>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1" 
                  onClick={() => setShowTemplatesPopup(false)}
                  aria-label="Close templates popup"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex flex-wrap items-center mb-4 gap-2">
                  <p className="text-gray-600">Get going faster with a template from the Trello community or</p>
                  <div className="relative">
                    <select 
                      className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-1 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      aria-label="Template category"
                    >
                      <option value="">choose a category</option>
                      {CATEGORIES.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {searchQuery && filteredTemplates.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No templates found matching "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {filteredTemplates.map((template) => (
                      <div 
                        key={template.id}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div 
                          className={`h-24 relative ${template.isImage ? "bg-cover bg-center" : template.color}`}
                          style={template.isImage ? { backgroundImage: "url('/api/placeholder/300/150')" } : {}}
                        >
                          <span className="absolute top-2 right-2 bg-white bg-opacity-80 text-xs font-medium px-2 py-1 rounded">TEMPLATE</span>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm">{template.title}</h3>
                          <div className="flex items-center mt-2 text-gray-500 text-xs">
                            <Star size={12} className="mr-1" />
                            <span>{template.stars} stars</span>
                            <span className="mx-2">•</span>
                            <span>{template.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="text-center">
                  <a href="#" className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">Browse the full template gallery</a>
                </div>
              </div>
            </div>
          )}
          
          {/* Recently Viewed Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock size={18} className="mr-2 text-gray-600" />
                <h2 className="text-lg font-medium text-gray-700">Recently viewed</h2>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {BOARDS.map((board) => (
                <Link key={board.id} to={`/board/${board.id}`}>
                  <BoardCard board={board} showLastViewed={true} />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Your Workspaces Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-4">YOUR WORKSPACES</h2>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-teal-500 text-white rounded mr-2">
                    T
                  </div>
                  <h3 className="font-medium">Trello Workspace</h3>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex items-center px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Bookmark size={14} className="mr-1" />
                    <span>Boards</span>
                  </button>
                  
                  <button className="flex items-center px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Users size={14} className="mr-1" />
                    <span>Members</span>
                  </button>
                  
                  <button className="flex items-center px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Settings size={14} className="mr-1" />
                    <span>Settings</span>
                  </button>
                  
                  <button className="flex items-center px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Edit size={14} className="mr-1" />
                    <span>Upgrade</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Workspace boards */}
                {BOARDS.map((board) => (
                  <Link key={board.id} to={`/board/${board.id}`}>
                    <BoardCard board={board} />
                  </Link>
                ))}
                
                {/* Create New Board */}
                <button 
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-gray-50 flex items-center justify-center h-[8.5rem] cursor-pointer"
                  aria-label="Create new board"
                >
                  <div className="text-center text-gray-500 hover:text-gray-700 transition-colors p-4">
                    <Plus size={24} className="mx-auto mb-2" />
                    <p>Create new board</p>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <button className="text-gray-600 hover:text-gray-800 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                View all closed boards
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create Board Modal */}
      {showCreateBoardModal && <CreateBoardModal />}
    </div>
  );
}

