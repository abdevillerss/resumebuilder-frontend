import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Basic inline styles for the navbar to make it functional without needing a separate CSS file.
const navbarStyles = {
  backgroundColor: '#ffffff',
  color: '#1f2937',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid #e5e7eb'
};

const linkStyles = {
  color: '#1f2937',
  textDecoration: 'none',
  margin: '0 1rem',
  fontWeight: '600',
};

const buttonStyles = {
    ...linkStyles,
    background: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem'
};

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear user session from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Navigate to the login page
    navigate('/login');
  };

  const token = localStorage.getItem('token');

  return (
    <nav style={navbarStyles}>
      <div>
        <Link to="/" style={linkStyles}>Resume Builder</Link>
      </div>
      <div>
        {token ? (
          <button onClick={handleLogout} style={buttonStyles}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={linkStyles}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;