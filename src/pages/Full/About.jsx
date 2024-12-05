import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sec from "../../Sectiontwo";
// Include your custom styles if needed

function App() {
  return (
    <Container fluid>
      <Row className="justify-content-center text-center my-5">
        <Col xs={12} md={8}>
          <div className="content-area p-4 rounded">
            <h1>Welcome to My Website</h1>
            <p>
              This is a simple design with a background color inside the content
              area.
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Sec />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
