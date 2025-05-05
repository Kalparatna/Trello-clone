import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BoardProvider } from './context/BoardContext';
import Home from './pages/Home';
import BoardHome from './pages/BoardHome';
import Homepage from './pages/Home';
import BoardPage from './pages/BoardPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { generateId } from './utils/helpers';
import SettingsPage from './pages/SettingsPage';
import CreateBoard from './components/CreateBoard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Layout component
function AppLayout({ children, isLoggedIn, darkMode, toggleDarkMode, toggleSidebar, sidebarOpen, handleCreateBoard, setIsLoggedIn }) {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="flex">
      {isLoggedIn && !isAuthPage && (
        <>
          {sidebarOpen && <Sidebar />}
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            toggleSidebar={toggleSidebar}
            handleCreateBoard={handleCreateBoard}
            setIsLoggedIn={setIsLoggedIn}
          />
        </>
      )}
      <div className="transition-all duration-300 ease-in-out flex-1">
        <main className={`px-4 py-8 ${isLoggedIn && !isAuthPage ? 'mt-16' : 'mt-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Session-based auth check
    const checkSessionAuth = async () => {
      try {
        const response = await fetch('/api/check-auth', {
          method: 'GET',
          credentials: 'include', // Important: sends the session cookie
        });

        if (response.ok) {
          const data = await response.json();
          if (data.isAuthenticated) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      } finally {
        setIsInitialized(true);
      }
    };

    checkSessionAuth();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreateBoard = (title) => {
    const newBoard = {
      id: generateId(),
      title,
      lists: [],
    };
    console.log("Board Created:", newBoard);
  };

  if (!isInitialized) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <BoardProvider>
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
          <AppLayout
            isLoggedIn={isLoggedIn}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            handleCreateBoard={handleCreateBoard}
            setIsLoggedIn={setIsLoggedIn}
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={
                isLoggedIn ? <Navigate to="/home" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />
              } />
              <Route path="/register" element={
                isLoggedIn ? <Navigate to="/home" replace /> : <Register setIsLoggedIn={setIsLoggedIn} />
              } />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/boardhome" element={<BoardHome />} />
                <Route path="/board/:boardId" element={<BoardPage />} />
                <Route path="/create-board" element={<CreateBoard />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Catch-All */}
              <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} />
            </Routes>
          </AppLayout>
        </div>
      </Router>
    </BoardProvider>
  );
}

export default App;
