import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Reviews from "../../Reviews";
import Email from "../../Email";
// Import custom CSS for the shake animation
import img from "../Full/all-bg.jpg"; // Path to the background image

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    person: "",
    name: "",
    email: "",
    number: "",
  });

  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check each field for validity
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key] = "This field is required";
        isValid = false;
      }
    }

    setErrors(newErrors);

    // If invalid, trigger the shake animation
    if (!isValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500); // Reset shake after animation
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with booking (you can handle actual booking here)
      console.log("Form submitted", formData);
    }
  };

  return (
    <Container className="mt-5">
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

      <p className="text-center text-muted">
        Lorem Ipsum is simply dummy text of the printing and typesetting
      </p>

      <Row className="mt-4">
        <Col md={6}>
          <h5 className="mb-3">Book a table</h5>
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={shake ? "shake" : ""}
          >
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                isInvalid={errors.date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.date}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTime">
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                isInvalid={errors.time}
              />
              <Form.Control.Feedback type="invalid">
                {errors.time}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPerson">
              <Form.Select
                name="person"
                value={formData.person}
                onChange={handleChange}
                isInvalid={errors.person}
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
          </Form>
        </Col>
        <Col md={6}>
          <h5 className="mb-3">Contact Details</h5>
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={shake ? "shake" : ""}
          >
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNumber">
              <Form.Control
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                isInvalid={errors.number}
              />
              <Form.Control.Feedback type="invalid">
                {errors.number}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <div className="text-center mt-3">
        <Button
          variant="outline-warning"
          className="px-4"
          type="submit"
          onClick={handleSubmit}
        >
          BOOK TABLE
        </Button>
        <Reviews />
        <Email />
      </div>
    </Container>
  );
};

export default ReservationForm;
