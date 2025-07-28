import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Home as HomeIcon,
  AdminPanelSettings,
  Dashboard as DashboardIcon,
  Logout,
  Menu,
  Close
} from '@mui/icons-material';

// Import components
import Home from './components/Home';
import Login from './features/auth/login';
import Register from './features/auth/register';
import Dashboard from './features/user/Dashboard';
import AdminPanel from './features/admin/AdminPanel';
import ProtectedRoute from './components/protectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Unauthorized from './components/Unauthorized';
import PageNotFound from './components/PageNotFound';

// Import CSS
import './App.css';

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAuthenticated = !!localStorage.getItem('token');
  
  // Safe parsing of user data from localStorage
  let user = {};
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    // Clear invalid user data
    localStorage.removeItem('user');
    user = {};
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          <span className="nav-logo">🏦</span>
          <span className="nav-title">Banking Platform</span>
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <HomeIcon />
            Home
          </Link>
          
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <DashboardIcon />
            Dashboard
          </Link>
          
          <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            <AdminPanelSettings />
            Admin Panel
          </Link>
          
          <button onClick={handleLogout} className="nav-link logout-btn">
            <Logout />
            Logout
          </button>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <Close /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

// App Component
function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <RoleProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </RoleProtectedRoute>
            } />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-custom"
        toastClassName="toast-custom"
        progressClassName="toast-progress"
      />
    </Router>
  );
}

export default App;
