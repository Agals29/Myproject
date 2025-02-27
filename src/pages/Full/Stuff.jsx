import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orders from "../../Orders"; // Orders Component
import img from "../Full/all-bg.jpg"; // Path to the background image

const App = () => {
  return (
    <Container fluid>
      {/* Section with Background Image */}
      <Row
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Overlay Div for Opacity */}
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
        <Col style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            Welcome to My Website
          </h1>
        </Col>
      </Row>

      {/* Content Section */}
      <Row className="justify-content-center text-center my-5">
        <Col xs={12} md={8}>
          <div className="content-area p-4 rounded">
            <p></p>
          </div>
        </Col>
      </Row>
      
            {/* Orders Section */}
            
              <Row style={{ marginTop: "100px" }}>
      
              {" "}
              {/* Add margin-top class for spacing */}
      {/* Orders Section */}
      
        <Col>
          <Orders />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
