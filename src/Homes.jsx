import React, { useState } from "react";
import img from "./img/images/logo.png";
import "./Styles/Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [blogDropdown, setBlogDropdown] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const toggleBlogDropdown = () => {
    setBlogDropdown((prev) => !prev);
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-brand">
          <a href="/home">
            <img src={img} alt="Logo" className="brand-logo" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          <li>
            <a href="/home">HOME</a>
          </li>
          <li>
            <a href="/menu">MENU</a>
          </li>
          <li>
            <a href="/about">ABOUT</a>
          </li>

          {/* Pages Dropdown */}
          <li className="dropdown">
            <span className="dropdown-toggle" onClick={toggleDropdown}>
              PAGES
            </span>
            <ul className={`dropdown-menu ${dropdown ? "open" : ""}`}>
              <li>
                <a href="/reservation">RESERVATION</a>
              </li>
              <li>
                <a href="/stuff">STUFF</a>
              </li>
              <li>
                <a href="/gallery">GALLERY</a>
              </li>
            </ul>
          </li>

          {/* Blog Dropdown */}
          <li className="dropdown">
            <span className="dropdown-toggle" onClick={toggleBlogDropdown}>
              BLOG
            </span>
            <ul className={`dropdown-menu ${blogDropdown ? "open" : ""}`}>
              <li>
                <a href="/blog">BLOG</a>
              </li>
              <li>
                <a href="/blog-single">BLOG SINGLE</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="/contact">CONTACT</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
