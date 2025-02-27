import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Your existing components
import Navbar from "./Homes";
import FrontPage from "./FrontPage";
// Additional page components for routing
import About from "./pages/Full/About";
import Blog from "./pages/Full/Blog";
import BlogSingle from "./pages/Full/BlogSingle";
import Contact from "./pages/Full/Contact";
import Gallery from "./pages/Full/Gallery";
import Menu from "./pages/Full/Menu";
import Reservation from "./pages/Full/Reservation";
import Stuff from "./pages/Full/Stuff";
import Admin from "./pages/Full/Admin"; // Admin route
import { Dashboard } from "./pages/Full/Dashboard";
import { Categories } from "./pages/Full/categories";
import { Products } from "./pages/Full/products";


function App() {
  const location = useLocation();

  // Hide Navbar for /admin, /dashboard, /categories, and /products
  const hideNavbarRoutes = ["/admin", "/dashboard", "/categories", "/products"];

  return (
    <div className="app-container">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Routes for pages */}
        <Route path="/" element={<FrontPage />} />
        <Route path="/home" element={<FrontPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/stuff" element={<Stuff />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-single" element={<BlogSingle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        {/* Dashboard, Categories, and Products pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
       
      </Routes>
    </div>
  );
}

export default App;
