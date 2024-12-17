import React from "react";
import { Container } from "react-bootstrap";
import img from "../Full/all-bg.jpg";

const Contact = () => {
  return (
    <div
      style={{
        position: "relative", // For positioning the overlay
        backgroundImage: `url(${img})`, // Background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "350px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Overlay Div to add opacity */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <Container
        style={{
          position: "relative", // Ensures the content stays above the overlay
          zIndex: 1,
        }}
      >
        <h1
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          Contact
        </h1>
      </Container>
    </div>
  );
};

export default Contact;
