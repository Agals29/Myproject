import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orders from "../../Orders";
// Include your custom styles if needed

function App() {
  return (
    <Container fluid>
      <Row className="justify-content-center text-center my-5">
        <Col xs={12} md={8}>
          
        </Col>
      </Row>
      <Row>
        <Col>
          <Orders />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
