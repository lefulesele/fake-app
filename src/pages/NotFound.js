import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Go to Dashboard
          </button>
          <button onClick={() => navigate(-1)} className="btn-secondary">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;