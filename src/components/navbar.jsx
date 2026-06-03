import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
            <li>
              <NavLink
                to="/#home"
                className={({ isActive }) => isActive ? 'nav-links-a active' : 'nav-links-a'}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop#ingredients"
                className={({ isActive }) => isActive ? 'nav-links-a active' : 'nav-links-a'}
                onClick={closeMenu}
              >
                Ingredients
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? 'nav-links-a active' : 'nav-links-a'}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) => isActive ? 'nav-links-a active' : 'nav-links-a'}
                onClick={closeMenu}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) => isActive ? 'nav-links-a active' : 'nav-links-a'}
                onClick={closeMenu}
              >
                Cart
              </NavLink>
            </li>
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
