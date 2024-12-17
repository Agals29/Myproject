import React, { useState } from "react";
import img from "./img/images/logo.png";
import "./Styles/Navbar.css";

const Navbar = ({ cartItems }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/home">
            <img src={img} alt="Logo" className="brand-logo" />
          </a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/home">HOME</a>
          </li>
          <li>
            <a href="/menu">MENU</a>
          </li>
          <li>
            <a href="/about">ABOUT</a>
          </li>
          <li>
            <a href="/contact">CONTACT</a>
          </li>
          <li className="cart-icon" onClick={toggleCart}>
            🛒 ({cartItems.length})
          </li>
        </ul>
      </nav>

      {/* Cart Dropdown */}
      {isCartOpen && (
        <div className="cart-dropdown">
          <h3>Cart Items</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.title} - {item.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
