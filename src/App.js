import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Your existing components
import Navbar from "./Homes";
import FrontPage from "./FrontPage";
// Additional page components for routing
// import Home from "./pages/Full/Home";
import About from "./pages/Full/About";
import Blog from "./pages/Full/Blog";
import BlogSingle from "./pages/Full/BlogSingle";
import Contact from "./pages/Full/Contact";
import Gallery from "./pages/Full/Gallery";
import Menu from "./pages/Full/Menu";
import Reservation from "./pages/Full/Reservation";
import Stuff from "./pages/Full/Stuff";

function App() {
  return (
    <div className="app-container">
      {/* Custom class name for outer div */}

      <Navbar />

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
      </Routes>
 
    </div>
  );
}

export default App;
