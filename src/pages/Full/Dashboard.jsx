import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosLogOut, IoIosSettings } from "react-icons/io";
import {
  FaBars,
  FaAngleRight,
  FaAngleDown,
  FaShoppingCart,
  FaRegCreditCard,
  FaUser,
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { PiUsersThreeFill } from "react-icons/pi";
import { TiWorld } from "react-icons/ti";
import { LiaAngleRightSolid } from "react-icons/lia";

import "../Full/dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar Dropdown State
  const [visibleSections, setVisibleSections] = useState({
    catalog: false,
    user: false,
    orders: false,
  });

  // Toggle Sidebar Section Visibility (Smooth Animation)
  const toggleVisibility = (key) => {
    setVisibleSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Handle Logout
  const handleLogout = () => {
    navigate("/login");
  };

  // Sidebar Item Component with Smooth Transition
  const SidebarItem = ({ label, icon, sectionKey, links }) => (
    <>
      <li
        className="drop-down-value"
        onClick={() => toggleVisibility(sectionKey)}
      >
        {icon} {label}{" "}
        {visibleSections[sectionKey] ? (
          <FaAngleDown className="icon-right" />
        ) : (
          <FaAngleRight className="icon-right" />
        )}
      </li>
      {visibleSections[sectionKey] && (
        <ul className="sub-menu show">
          {links.map(({ path, name }, index) => (
            <li
              key={index}
              className="dropdown-link"
              onClick={() => navigate(path)}
            >
              <FaAngleRight className="sub-menu-icon" /> {name}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <Container fluid className="header-section">
      {/* 🔹 Top Navigation Bar */}
      <Row className="align-items-center py-3 bg-light border-bottom">
        <Col xs={12} md={6}>
          <h2 className="logo-admin-play ms-3 fw-bold">Administration</h2>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-end">
          <span className="logout me-3" onClick={handleLogout}>
            <IoIosLogOut className="logout-icon" /> Logout
          </span>
          <button className="settings-admin">
            <IoIosSettings className="settings-icon" />
          </button>
        </Col>
      </Row>

      {/* 🔹 Sidebar & Dashboard Content */}
      <Row>
        {/* Sidebar */}
        <Col md={2} className="column-left d-none d-md-block">
          <div className="col-for-menu">
            <div className="navigation-title">
              <FaBars /> NAVIGATION
            </div>
            <ul className="navigation-menu">
              <li
                className="drop-down-value"
                onClick={() => navigate("/dashboard")}
              >
                <AiFillDashboard /> Dashboard
              </li>

              {/* Sidebar Sections with Dropdown */}
              <SidebarItem
                label="Catalog"
                icon={<FaAngleRight />}
                sectionKey="catalog"
                links={[
                  { path: "/categories", name: "Categories" },
                  { path: "/product", name: "Product" },
                ]}
              />
            </ul>
          </div>
        </Col>

        {/* Main Dashboard Content */}
        <Col className="market-data">
          <Container fluid>
            <div className="dashboard-value">
              <div className="dashvalue-2">
                <h4 className="dashboard-data">Dashboard</h4>
                <div className="home-to-dashboard">
                  <p className="dash-main-p ms-2">Home</p>
                  <LiaAngleRightSolid className="dash-main-icon ms-2" />
                  <p className="dash-main-p2 ms-2">Dashboard</p>
                </div>
              </div>
              <div className="text-end btn-for-button">
                <button className="settings-admin">
                  <IoIosSettings className="settings-icon" />
                </button>
              </div>
            </div>
          </Container>

          {/* Dashboard Summary Cards */}
          <Row>
            {[
              { title: "TOTAL ORDERS", icon: <FaShoppingCart />, count: "757" },
              {
                title: "TOTAL SALES",
                icon: <FaRegCreditCard />,
                count: "146.9k",
              },
              { title: "TOTAL CUSTOMERS", icon: <FaUser />, count: "900" },
              {
                title: "PEOPLE ONLINE",
                icon: <PiUsersThreeFill />,
                count: "7",
              },
            ].map((item, index) => (
              <Col key={index} className="mt-3">
                <div className={`main-cart-${index + 1}`}>
                  <div className="cart-1">
                    {item.title} <span className="span-number">0%</span>
                  </div>
                  <div className="cart-2">
                    {item.icon}
                    <h2 className="h2-numbers">{item.count}</h2>
                  </div>
                  <div className="cart-3">
                    <p className="ms-2">View more...</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* World Map Section */}
          <Row className="mt-4">
            <Col>
              <div className="map-main">
                <div className="admin-map">
                  <TiWorld className="icon-world ms-3" />
                  <h6 className="admin-map-h5 ms-2">World Map</h6>
                </div>
              </div>
              <div className="world-map-world"></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
