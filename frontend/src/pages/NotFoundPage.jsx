import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <button 
          onClick={handleBackToHome} 
          className="back-to-home-btn"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
