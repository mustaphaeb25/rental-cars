import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdAccountCircle,
  MdDirectionsCar,
  MdOutlineInfo,
  MdOutlineQuestionAnswer,
  MdOutlineContactPhone,
  MdHome,
  MdMenu,
  MdClose
} from 'react-icons/md';

import { FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';
import { BsCalendarCheck } from 'react-icons/bs';

import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [accountOpen, setAccountOpen] = React.useState(false);

  const dropdownRef = React.useRef(null);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    navigate('/auth');
  };

  // ✅ Fixed: Close account dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    if (accountOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountOpen]);

  const navLinks = [
    { to: '/', text: 'Home', icon: <MdHome /> },
    { to: '/cars', text: 'Our Fleet', icon: <MdDirectionsCar /> },
    { to: '/about', text: 'About', icon: <MdOutlineInfo /> },
    { to: '/faqs', text: 'FAQs', icon: <MdOutlineQuestionAnswer /> },
    { to: '/contact', text: 'Contact', icon: <MdOutlineContactPhone /> },
  ];

  return (
    <header className={`new-navbar ${darkMode ? 'dark' : 'light'}`}>
      <div className="navbar-container">

        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <MdDirectionsCar className="brand-icon" />
          <h1>LuxDrive</h1>
        </Link>

        {/* Nav links */}
        <nav className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon}
              <span>{link.text}</span>
            </Link>
          ))}

          {/* Mobile Auth Buttons (Visible only inside menu on mobile) */}
          <div className="mobile-auth-buttons">
            {!isAuthenticated && (
              <>
                <Link
                  to="/auth?mode=login"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiLogIn />
                  <span>Login</span>
                </Link>
                <Link
                  to="/auth?mode=register"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUserPlus />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Actions */}
        <div className="navbar-actions">

          {/* Theme */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>

          {/* Auth */}
          {isAuthenticated ? (
            <div
              className="user-menu"
              ref={dropdownRef}
            >
              <button
                className="custom-dropdown-toggle"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAccountOpen(prev => !prev);
                }}
              >
                <MdAccountCircle />
                <span>{user?.nom || user?.name || 'Account'}</span>
              </button>

              <div className={`custom-dropdown-menu ${accountOpen ? 'open' : ''}`}>

                <Link
                  to="/my-reservations"
                  className="custom-dropdown-item"
                  onClick={() => setAccountOpen(false)}
                >
                  <BsCalendarCheck /> My Reservations
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="custom-dropdown-item"
                    onClick={() => setAccountOpen(false)}
                  >
                    <RiAdminLine /> Admin Panel
                  </Link>
                )}

                <div className="custom-dropdown-divider" />

                <button
                  className="custom-dropdown-item"
                  onClick={handleLogout}
                >
                  <FiLogOut /> Logout
                </button>

              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/auth?mode=login" className="btn btn-secondary">
                <FiLogIn />
                <span>Login</span>
              </Link>
              <Link to="/auth?mode=register" className="btn btn-primary">
                <FiUserPlus />
                <span>Register</span>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          {/* Mobile menu toggle */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <MdClose /> : <MdMenu />}
          </button>


        </div>
      </div>
    </header>
  );
};

export default Navbar;