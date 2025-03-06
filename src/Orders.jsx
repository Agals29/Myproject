import React, { useState, useEffect } from "react";
import "./App.css";
import "./Styles/Cart.css";

const OrdersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Filter products based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.mainCategory === selectedCategory);

  // Add an item to the cart
  const addToCart = (item) => {
    if (item.status === "Out of Stock") {
      alert("This item is out of stock!");
      return;
    }
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
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
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem._id !== item._id));
    }
  };

  // Handle order confirmation
  const handleConfirmOrder = async () => {
    try {
      const total = cart
        .reduce(
          (sum, item) =>
            sum + parseFloat(item.price.replace("$", "")) * item.quantity,
          0
        )
        .toFixed(2);

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, total }),
      });

      if (response.ok) {
        alert("Order confirmed! Thank you for your purchase.");
        setCart([]); // Clear the cart
        setShowOrderConfirmation(false); // Hide the order confirmation section
        setShowCart(false); // Close the cart modal
      } else {
        alert("Failed to confirm order. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("An error occurred. Please try again.");
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
            <>
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <p>{item.mainCategory}</p>
                  <span>${item.price}</span>
                  <span>Qty: {item.quantity}</span>
                  <div className="quantity-buttons">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="cart-btn"
                    >
                      -
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="cart-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <strong>Total:</strong> $
                {cart
                  .reduce(
                    (sum, item) => sum + parseFloat(item.price) * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </div>

              {/* Proceed Button */}
             
            </>
          )}
        </div>
      )}

      {/* Order Confirmation Section */}
      {showOrderConfirmation && (
        <div className="order-confirmation-modal">
          <h3>Confirm Your Order</h3>
          {cart.map((item) => (
            <div key={item._id} className="order-item">
              <p>Product: {item.mainCategory}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <div className="order-total">
            <strong>Total:</strong> $
            {cart
              .reduce(
                (sum, item) => sum + parseFloat(item.price) * item.quantity,
                0
              )
              .toFixed(2)}
          </div>
          <button onClick={handleConfirmOrder} className="confirm-order-btn">
            Confirm Order
          </button>
          <button
            onClick={() => setShowOrderConfirmation(false)}
            className="cancel-order-btn"
          >
            Cancel
          </button>
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
              <div className="menu-item" key={item._id}>
                <img
                  src={`http://localhost:5000/${item.image}`}
                  alt={item.mainCategory}
                  className="menu-image"
                />
                <div className="menu-details-overlay">
                  <h3>{item.mainCategory}</h3>
                  {item.subCategory && <p>{item.subCategory}</p>}
                  <span className="price">${item.price}</span>
                  <p
                    className={`status ${
                      item.status === "Available" ? "available" : "out-of-stock"
                    }`}
                  >
                    {item.status}
                  </p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(item)}
                    disabled={item.status === "Out of Stock"}
                  >
                    {item.status === "Out of Stock"
                      ? "Out of Stock"
                      : "Add to Cart"}
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

export default OrdersPage;
