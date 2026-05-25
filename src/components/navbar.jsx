import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from '../images/logo.png';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
     logout();
    navigate('/');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <Link className="nav-logo" to="/">
          <img src={logo} alt="SolHydra Logo" className="nav-logo-image" />
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu */}
        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li><a href="/#home" onClick={closeMenu}>Home</a></li>
            <li><Link to="/shop#ingredients" onClick={closeMenu}>
              Ingredients
            </Link></li>
            <li><Link to="/about" onClick={closeMenu}>
              About
            </Link></li>
            <li><Link to="/shop" onClick={closeMenu}>
              Shop
            </Link></li>
            <li><Link to="/cart" onClick={closeMenu}>
              Cart
            </Link></li>
          </ul>

          <div className="nav-actions">
            {user ? (
              <button className="btn-login" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link className="login-link" to="/login" onClick={closeMenu}>
                Login
              </Link>
            )} 
            <Link className="btn-quote" to="/hydrationcalculator" onClick={closeMenu}>
              Find Your Match
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
