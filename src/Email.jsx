import React from "react";
import "./Styles/Email.css";
import {
  FaPhoneVolume,
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaGooglePlusSquare,
} from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="top-section">
        <div className="contact-item">
          <span className="icon">
            <FaPhoneVolume />
          </span>
          <p>Phone</p>
          <p>+01 123-456-4590</p>
        </div>
        <div className="contact-item">
          <span className="icon">
            <MdEmail />
          </span>
          <p>Email</p>
          <p>yourmail@gmail.com</p>
        </div>
        <div className="contact-item">
          <span className="icon">
            <MdLocationPin />
          </span>
          <p>Location</p>
          <p>800, Lorem Street, US</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="about">
          <h3>ABOUT US</h3>
          <p>
            Integer cursus scelerisque ipsum id efficitur. Donec a dui
            fringilla, gravida lorem ac, semper magna. Aenean rhoncus ac lectus
            a interdum. Vivamus semper posuere dui.
          </p>
        </div>
        <div className="subscribe">
          <h3>SUBSCRIBE</h3>
          <input type="email" placeholder="Email Address..." />
          <button>SUBSCRIBE</button>
          <div className="social-icons">
            <span>
              <FaFacebookSquare />
            </span>
            <span>
              <FaTwitterSquare />
            </span>
            <span>
              <FaLinkedin />
            </span>
            <span>
              <FaGooglePlusSquare />
            </span>
            <span>
              <FaSquareInstagram />
            </span>
          </div>
        </div>
        <div className="contact-info">
          <h3>CONTACT INFORMATION</h3>
          <p>Ipsum Street, Lorem Tower, MO, Columbia, 508000</p>
          <p>+01 2000 800 9999</p>
          <p>info@admin.com</p>
        </div>
        <div className="opening-hours">
          <h3>OPENING HOURS</h3>
          <p>Monday: Closed</p>
          <p>Tue-Wed: 9AM - 10PM</p>
          <p>Thu-Fri: 9AM - 10PM</p>
          <p>Sat-Sun: 5PM - 10PM</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="copyright">
        <p>
          All Rights Reserved. © 2024 Live Dinner Restaurant Design By: full stack web
          developer
        </p>
      </div>
    </footer>
  );
};

export default Footer;
