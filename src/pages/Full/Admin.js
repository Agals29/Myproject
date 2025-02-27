import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";

const NewForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  // Reset form when component mounts
  useEffect(() => {
    setFormData({ username: "", password: "" });
    setErrors("");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      navigate("/dashboard");
    } catch (err) {
      setErrors(err.message);
    }
  };

  return (
    <Container fluid className="header-section">
      {/* 🔹 Top Navigation Bar */}
      <Row className="align-items-center py-3 bg-light border-bottom">
        <Col xs={12} md={6}>
          <h2 className="logo-admin-play ms-3 fw-bold">Administration</h2>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-end">
          <button className="settings-admin">
            <IoIosSettings className="settings-icon" />
          </button>
        </Col>
      </Row>

      {/* 🔹 Login Section */}
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col md={4} className="p-4">
          <div
            className="p-4"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <h3 className="text-center text-primary mb-3">Admin Login</h3>
            {errors && <Alert variant="danger">{errors}</Alert>}
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-person"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-lock"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </InputGroup>
              </Form.Group>
              <div className="text-center">
                <Button type="submit" variant="primary" className="w-100 mb-3">
                  Login
                </Button>
                <a href="/forgot-password" className="text-primary">
                  Forgot Password?
                </a>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewForm;
