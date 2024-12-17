import React, { useState } from "react";
import "./App.css";
import "./Styles/Cart.css";
import img1 from "./img/images/img-01.jpg";
import drink2 from "./img/images/img-02.jpg";
import burger from "./img/images/img-03.jpg";
import salad from "./img/images/img-04.jpg";
import fish from "./img/images/img-05.jpg";
import steak from "./img/images/img-06.jpg";
import pasta from "./img/images/img-07.jpg";
import chicken from "./img/images/img-08.jpg";
import drink3 from "./img/images/img-09.jpg";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const menuItems = [
    {
      id: 1,
      category: "Drinks",
      title: "Special Drinks 1",
      description: "Sed id magna vitae eros sagittis euismod.",
      price: "$7.79",
      image: img1,
    },
    {
      id: 2,
      category: "Drinks",
      title: "Special Drinks 2",
      description: "Sed id magna vitae eros sagittis euismod.",
      price: "$5.99",
      image: drink2,
    },
    {
      id: 3,
      category: "Lunch",
      title: "Burger",
      price: "$9.99",
      description: "Sed id magna vitae eros sagittis euismod.",
      image: burger,
    },
    {
      id: 4,
      category: "Lunch",
      title: "Salad",
      description: "Sed id magna vitae eros sagittis euismod.",
      price: "$6.50",
      image: salad,
    },
    {
      id: 5,
      category: "Dinner",
      title: "Fish",
      description: "Sed id magna vitae eros sagittis euismod.",
      price: "$12.99",
      image: fish,
    },
    {
      id: 6,
      category: "Lunch",
      title: "Steak",
      description: "Sed id magna vitae eros sagittis euismod.",
      price: "$15.99",
      image: steak,
    },
    {
      id: 7,
      category: "Dinner",
      title: "Pasta",
      description: "Sed id magna vitae eros sagittis euismod.",
      price: "$11.50",
      image: pasta,
    },
    {
      id: 8,
      category: "Dinner",
      title: "Chicken",
      description: "Sed id magna vitae eros sagittis euismod.",
      price: "$10.50",
      image: chicken,
    },
    {
      id: 9,
      category: "Drinks",
      title: "Special Drinks 3",
      description: "Sed id magna vitae eros sagittis euismod.",
      price: "$8.00",
      image: drink3,
    },
  ];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // Add an item to the cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove an item from the cart
  const removeFromCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    }
  };

  return (
    <div className="container-fluid">
      {/* Cart Icon */}
      <div
        className="cart-icon"
        onClick={() => setShowCart(!showCart)}
        style={{
          cursor: "pointer",
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        <span>🛒</span>
        <span className="cart-count">
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="cart-modal">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <p>{item.title}</p>
                <span>{item.price}</span>
                <span>Qty: {item.quantity}</span>
                <div>
                  <button onClick={() => removeFromCart(item)}>-</button>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sidebar and Content */}
      <div className="app">
        <div className="sidebar">
          <button
            className={`category-btn ${
              selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          <button
            className={`category-btn ${
              selectedCategory === "Drinks" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Drinks")}
          >
            Drinks
          </button>
          <button
            className={`category-btn ${
              selectedCategory === "Lunch" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Lunch")}
          >
            Lunch
          </button>
          <button
            className={`category-btn ${
              selectedCategory === "Dinner" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Dinner")}
          >
            Dinner
          </button>
        </div>

        <div className="contents">
          <h1 className="headings">Special Menu</h1>
          <p className="descriptions">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div className="menu-item" key={item.id}>
                <img src={item.image} alt={item.title} className="menu-image" />
                <div className="menu-details-overlay">
                  <h3>{item.title}</h3>
                  {item.description && <p>{item.description}</p>}
                  <span className="price">{item.price}</span>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
