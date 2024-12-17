import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sec from "../../Sectiontwo";
import img from "../Full/all-bg.jpg"; // Path to the background image

function App() {
  return (
    <Container fluid>
      {/* Section with Background Image */}
      <Row
        style={{
          backgroundImage: `url(${img})`, // Background Image
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px", // Set a height for the background area
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col>
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
            <p>
              This is a simple design with a background color inside the content
              area.
            </p>
          </div>
        </Col>
      </Row>

      {/* Section Component */}
      <Row>
        <Col>
          <Sec />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
