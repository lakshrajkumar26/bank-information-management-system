import React from 'react';
import { Link } from 'react-router-dom';
import {
  Security,
  ArrowBack,
  Home,
  Dashboard
} from '@mui/icons-material';
import './Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-container">
        <div className="unauthorized-content">
          <div className="unauthorized-icon">
            <Security />
          </div>
          
          <h1>Access Denied</h1>
          <p>You don't have permission to access this page.</p>
          
          <div className="unauthorized-actions">
            <Link to="/dashboard" className="unauthorized-btn unauthorized-btn-primary">
              <Dashboard />
              Go to Dashboard
            </Link>
            
            <Link to="/" className="unauthorized-btn unauthorized-btn-secondary">
              <Home />
              Go to Home
            </Link>
          </div>
          
          <div className="unauthorized-info">
            <h3>Why am I seeing this?</h3>
            <ul>
              <li>You may not have the required role permissions</li>
              <li>Your session may have expired</li>
              <li>You may need to log in again</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
