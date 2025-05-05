import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';  // Example pages
import { useLocation } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Logic to check if the user is authenticated (e.g., check localStorage, JWT token, etc.)
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true'; // Example check
    setIsAuthenticated(authStatus);
  }, []);

  const location = useLocation();

  return (
    <Router>
      <div>
        {/* Only show the Navbar and Sidebar on authenticated routes */}
        {isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register' && (
          <>
            <Navbar darkMode={false} toggleDarkMode={() => {}} toggleSidebar={() => {}} />
            <Sidebar />
          </>
        )}
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          {/* Other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
