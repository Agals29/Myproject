import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Reviews from "../../Reviews";
import Email from "../../Email";
import axios from "axios";
import img from "../Full/all-bg.jpg";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    person: "",
    tableNumber: "",
    name: "",
    email: "",
    number: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [shake, setShake] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key] = "This field is required.";
        isValid = false;
      }
    }

    // Validate tableNumber (limit between 1 and 10)
    if (
      formData.tableNumber &&
      (formData.tableNumber < 1 || formData.tableNumber > 10)
    ) {
      newErrors.tableNumber = "Table number must be between 1 and 10.";
      isValid = false;
    }

    // Additional validations
    if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = "Enter a valid 10-digit phone number.";
      isValid = false;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate form inputs
    if (validateForm()) {
      try {
        // Make a POST request to the server with the form data
        const response = await axios.post(
          "http://localhost:5000/api/reservation",
          formData
        );

        // Check the server's response for success
        if (response.status === 200) {
          setSuccessMessage("Table booked successfully!"); // Show success message
          setFormData({
            date: "",
            time: "",
            person: "",
            tableNumber: "",
            name: "",
            email: "",
            number: "",
          }); // Reset form
          setErrors({}); // Clear any errors
        } else {
          // If the response isn't 200, handle it as an error
          setErrors({
            server: "Failed to book the table. Please try again later.",
          });
        }
      } catch (error) {
        console.error("Error submitting reservation:", error);

        // Handle client-side or server-side errors
        setErrors({
          server:
            error.response?.data?.message ||
            "Something went wrong. Please try again later.",
        });
      }
    }
  };

  // Section styles
  const sectionStyle = {
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#f7f7ff",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgb(216, 212, 210)",
    margin: "0 auto",
    width: "90%",
    height: "100%",
  };

  return (
    <Container fluid className="p-0">
      {/* Background Section */}
      <Row
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 0,
          }}
        />
        <Col style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            Reservation
          </h2>
        </Col>
      </Row>

      {/* Main Content */}
      <h2 className="text-center mt-5 fw-bold">Reservation</h2>
      <p className="text-center text-muted">
        Fill out the form to book your table at our restaurant.
      </p>

      <Row className="mt-5">
        {/* Book a Table */}
        <Col md={6}>
          <div style={sectionStyle}>
            <h5 className="text-secondary fw-bold mb-4">Book a Table</h5>
            <Form
              noValidate
              onSubmit={handleSubmit}
              className={shake ? "shake" : ""}
            >
              <Form.Group className="mb-3">
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  isInvalid={!!errors.date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  isInvalid={!!errors.time}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.time}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select
                  name="person"
                  value={formData.person}
                  onChange={handleChange}
                  isInvalid={!!errors.person}
                >
                  <option value="">Select Person*</option>
                  <option>1 Person</option>
                  <option>2 Persons</option>
                  <option>3 Persons</option>
                  <option>4 Persons</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.person}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  name="tableNumber"
                  value={formData.tableNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.tableNumber}
                  placeholder="Enter table number (1-10)"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tableNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
        </Col>

        {/* Contact Details */}
        <Col md={6}>
          <div style={sectionStyle}>
            <h5 className="text-secondary fw-bold mb-4">Contact Details</h5>
            <Form noValidate>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  placeholder="Enter your name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  placeholder="Enter your email"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  isInvalid={!!errors.number}
                  placeholder="Enter your phone number"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.number}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>

      <div className="text-center mt-4">
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errors.server && <Alert variant="danger">{errors.server}</Alert>}
        <Button
          variant="warning"
          onClick={handleSubmit}
          className="px-5 py-2 fw-bold"
        >
          Book Table
        </Button>
        <Reviews />
        <Email />
      </div>
    </Container>
  );
};

export default ReservationForm;
